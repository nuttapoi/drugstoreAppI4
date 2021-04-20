import { Injectable, OnInit, Directive } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
// import { Plugins } from '@capacitor/core';
import { BillHeader} from '../models/bill-header';
import { PresentToast } from '../services/present-toast';
import { get, set } from './storage.service';
import { ItemBuy } from '../models/item-buy';
import { ItemImage } from '../models/item-image';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class YeepuaService {
  items$: Observable<ItemBuy[]>;
  items: ItemBuy[] = [];
  cart: ItemBuy[] = [];
  private billHeader = new BillHeader();
  private cartItemCount = new BehaviorSubject(0);
  public baseUrl = 'http://localhost:3001';
  private data: any;

  constructor(
      private http: HttpClient,
      public toastCtrl: PresentToast,
      ) {
        this.GetUrlHQ().then((data: any) =>  {
          this.baseUrl = data;
        });
  }
  // ngOnInit(): void {
  //   // this.items$ = this.getBuyItemByName('t');
  //   this.getBuyItemByName('t').subscribe( res => this.items = res );
  //   console.log(this.items + 'init service');
  // }

  private async GetUrlHQ() {
    return await get('serverHQ') || 'http://localhost:3001';
  }

// Handle API errors
  handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    }

    searchProduct(term) {
      // this.getBuyItemByName(term).subscribe( res => this.items = res );
      this.items$ = this.getBuyItemByName(term);
      return this.items$;
    }

    getUrl() {
      return this.baseUrl;
    }

    getCart() {
      return this.cart;
    }

    getItems() {
      return this.items;
    }

    getCartItemCount() {
      return this.cartItemCount;
    }

    addProduct(select: ItemBuy): void {
      if (select) {
        // find item in array
        const foundItem: ItemBuy = this.findById(this.cart, select.productID);
        if (foundItem) {
          foundItem.itemValue = ++foundItem.itemQTY * foundItem.salePrice;
        } else {
          // this.getImage(select.productID).subscribe((result) => {
          //   this.data = result;
          //   select.imageBase64 = 'data:image/jpeg;base64,' + this.data.imageBase64;
          // });
          this.cart.push(select);
          this.cartItemCount.next(this.cart.length);
          // this.cartItemCount.next(this.cartItemCount.value + 1);
          this.billHeader.totalPrice  = this.calculateBill(this.cart);
        }
      }
    }

    increaseCartItem(item: ItemBuy ): void {
        item.itemValue = ++item.itemQTY * item.salePrice;
        this.billHeader.totalPrice = this.calculateBill(this.cart);
    }

    decreaseCartItem(item: ItemBuy): void {
       (item.itemQTY === 1) ? item.itemQTY = 1 : --item.itemQTY;
       item.itemValue = item.itemQTY * item.salePrice;
       this.billHeader.totalPrice = this.calculateBill(this.cart);
    }

    removeCartItem(item: ItemBuy): void {
      for (let i = this.cart.length - 1; i >= 0; i--) {
          if (item.productID === this.cart[i].productID) {
              this.cart.splice(i, 1);
          }
      }
      this.cartItemCount.next(this.cart.length);
      this.billHeader.totalPrice = this.calculateBill(this.cart);
    }

    reCalculate(item: ItemBuy) {
      if (item.itemQTY) {
        if (item.itemQTY <= 0) {
          item.itemQTY = 1;
        }
        item.itemValue = item.itemQTY * item.salePrice;
        this.billHeader.totalPrice = this.calculateBill(this.cart);
     }
    }

    calculateBill(source: ItemBuy[]): number {
      let sum = 0;
      if (source) {
          for (let i = 0; i <= source.length - 1; i++) {
            sum += source[i].itemValue;
            source[i].ItemNO = i + 1;
          }
      }
      return sum;
    }

    findById(source: ItemBuy[], id) {
      for (const val of source) {
        if (val.productID === id) {
          return val;
        }
      }
      return undefined;
    }

    getBuyItemByName(term: string): Observable<ItemBuy[]> {
      // console.log(term + ':yeepuaservice');
      if (!term.trim()) {
        return of([]);
      }
      return this.http
          .get<ItemBuy[]>(`${this.baseUrl}/api/yeepua?name=${term}`, httpOptions)
          .pipe(
            retry(2),
            catchError(this.handleError)
          );
    }

    addProductByBarcode(barcode: string) {
      this.barcodeItemBuy(barcode).subscribe(data => {
          const foundItem: ItemBuy = this.findById(this.cart, data[0].productID);
          if (foundItem) {
            foundItem.itemValue = ++foundItem.itemQTY * foundItem.salePrice;
            this.billHeader.totalPrice  = this.calculateBill(this.cart);
          } else {
            this.cart.push(data[0]);
            this.billHeader.totalPrice  = this.calculateBill(this.cart);
          }
        }
      );
    }

    barcodeItemBuy(barcode: string): Observable<ItemBuy[]> {
        const url = `${this.baseUrl}/api/yeepua/${barcode}/barcode`;
        return this.http
            .get<ItemBuy[]>(url, httpOptions)
            .pipe(
              retry(1),
              catchError(this.handleError)
            );
    }

    checkOut() {
      const url = `${this.baseUrl}/api/yeepua`;
      const options = {
        headers: new HttpHeaders({
        'Content-Type': 'application/json'}).append('bill-header', JSON.stringify(this.billHeader))
        // params: new HttpParams().append('key', 'value')
      };
      // httpOptions.headers.append('bill-header', JSON.stringify(this.billHeader));
      return this.http
        .post<void>(url, JSON.stringify(this.cart), options)
        .pipe(
          catchError(this.handleError)
        );
    }

    emptyCart() {
      this.cart = [];
      this.cartItemCount.next(this.cart.length);
      this.billHeader.totalPrice = 0;
    }

    // getImage(productID: string): Observable<ItemImage> {
    //     const url = `${this.baseUrl}/api/yeepua/${productID}/image`;
    //     return this.http
    //         .get<ItemImage>(url, httpOptions)
    //         .pipe(
    //           retry(1),
    //           catchError(this.handleError)
    //         );
    // }

  //   getImage(productID: string) {
  //     return new Promise((resolve, reject) => {
  //         this.http.get(`${this.baseUrl}/api/yeepua/${productID}/image`, httpOptions)
  //           .subscribe((res: Response) => {
  //           resolve(res);
  //           }, (err) => {
  //             reject(err);
  //           });
  //     });
  // }
}
