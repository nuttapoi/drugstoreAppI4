import { Injectable, OnInit, Directive } from '@angular/core';
// import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
// import 'rxjs/add/operator/toPromise';
import { Supplier } from '../models/supplier';
import { MinStock } from '../models/min-stock';
import { SaleSummary } from '../models/sale-summary';
import { Stock } from '../models/stock';
import { SaleByItem } from '../models/sale-by-item';
import { ItemBarcode } from '../models/item-barcode';
import { ItemImage } from '../models/item-image';
import { PresentToast } from './present-toast';
import { get, set } from './storage.service';

// import { StorageService } from './storage.service';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Access-Control-Request-Headers': '*'})
// };
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ReportService {
    public baseUrl = 'http://localhost:3001';
    constructor(
        private http: HttpClient,
        public presentToast: PresentToast,
        ) {
          this.GetUrl().then((data: any) =>  {
            this.baseUrl = data;
          });
    }

  async GetUrl() {
    return await get('server') || 'http://localhost:3001';
  }

  SaveUrl(val) {
    set('server', this.baseUrl = val || 'http://localhost:3001');
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

    // SaveUrl(val): Promise<any> {
    //   this.baseUrl = val || 'http://localhost:3001';
    //   return this.storage.set('server', this.baseUrl);
    // }
    // GetUrl(): Promise<any> {
    //   return this.storage.get('server');
    // }


    // httpClient require CORs on server side
    getProfitReport(fromDate, toDate): Observable<SaleSummary[]> {
        // this.GetUrl().then(data => { this.baseUrl = data || 'http://localhost:3001'; });
        console.log(`getProfit: ${this.baseUrl}`);
        const endPoint: string = '/rpt_profit?fromDate=' + fromDate + '&toDate=' + toDate;
        // this.presentToast.show(`${this.baseUrl}${endPoint}`);
        return this.http
              .get<SaleSummary[]>(`${this.baseUrl}/api${endPoint}`, httpOptions)
              .pipe(
                retry(2),
                catchError(this.handleError)
              );
    }

    getProfitByUser(fromDate, toDate): Observable<SaleSummary[]> {
        const endPoint: string = '/rpt_profitByUser?fromDate=' + fromDate + '&toDate=' + toDate;
        return this.http
              .get<SaleSummary[]>(`${this.baseUrl}/api${endPoint}`, httpOptions)
              .pipe(
                retry(2),
                catchError(this.handleError)
              );
    }

    getProfitByItem(fromDate, toDate): Observable<SaleByItem[]> {
        const endPoint: string = '/rpt_profitByItem?fromDate=' + fromDate + '&toDate=' + toDate;
        return this.http
              .get<SaleByItem[]>(`${this.baseUrl}/api${endPoint}`, httpOptions)
              .pipe(
                retry(2),
                catchError(this.handleError)
              );
    }

    getMinSupplier(): Observable<Supplier[]> {
        return this.http
              .get<Supplier[]>(`${this.baseUrl}/api/rpt_minSupplier`, httpOptions)
              .pipe(
                retry(2),
                catchError(this.handleError)
              );
    }

    getMinStock(supID: string): Observable<MinStock[]> {
        const url = `${this.baseUrl}/api/rpt_minStock/${supID}`;
        return this.http
            .get<MinStock[]>(url, httpOptions)
            .pipe(
              retry(2),
              catchError(this.handleError)
            );
    }

    getInvSupplier(): Observable<Supplier[]> {
        return this.http
            .get<Supplier[]>(`${this.baseUrl}/api/rpt_invSupplier`, httpOptions)
            .pipe(
              retry(2),
              catchError(this.handleError)
            );
    }

    getInvStock(supID: string): Observable<MinStock[]> {
        const url = `${this.baseUrl}/api/rpt_invStock/${supID}`;
        return this.http
            .get<MinStock[]>(url, httpOptions)
            .pipe(
              retry(2),
              catchError(this.handleError)
            );
    }

    getLotDetailByID(productID: string): Observable<Stock[]> {
        const url = `${this.baseUrl}/api/rpt_getLotDetail/${productID}`;
        return this.http
            .get<Stock[]>(url, httpOptions)
            .pipe(
              retry(2),
              catchError(this.handleError)
            );
    }

    // getItemDetailByID(productID: string): Observable<ItemBarcode[]> {
    //     const url = `${this.baseUrl}/api/getItemDetail/${productID}`;
    //     return this.http
    //         .get<ItemBarcode[]>(url, httpOptions)
    //         .pipe(
    //           retry(2),
    //           catchError(this.handleError)
    //         );
    // }

    searchProduct(term: string): Observable<Stock[]> {
      if (!term.trim()) {
        return of([]);
      }
      return this.http
          .get<Stock[]>(`${this.baseUrl}/api/datacollector?name=${term}`, httpOptions)
          .pipe(
            retry(2),
            catchError(this.handleError)
          );
  }

    updateStock(stockDetail: Stock) {
        const url = `${this.baseUrl}/api/datacollector/${stockDetail.productID}`;
        return this.http
            .put<void>(url, JSON.stringify(stockDetail), httpOptions)
            .pipe(
              retry(2),
              catchError(this.handleError)
            );
     }

    barcodeItemAdjust(barcode: string): Observable<Stock[]> {
        const url = `${this.baseUrl}/api/datacollector/${barcode}`;
        return this.http
            .get<Stock[]>(url, httpOptions)
            .pipe(
              retry(1),
              catchError(this.handleError)
            );
    }

    barcodeEditLots(barcode: string): Observable<Stock[]> {
        const url = `${this.baseUrl}/api/rpt_getLotDetail/${barcode}/barcode`;
        return this.http
            .get<Stock[]>(url, httpOptions)
            .pipe(
              retry(1),
              catchError(this.handleError)
            );
    }

    saveEditLots(lotDetails: Stock[]) {
      const url = `${this.baseUrl}/api/rpt_getLotDetail`;
      return this.http
        .put<void>(url, JSON.stringify(lotDetails), httpOptions)
        .pipe(
          catchError(this.handleError)
        );
     }


    // HttpClient API put() method => Update employee
    UpdateImage(updateImage: ItemImage): Observable<ItemImage[]> {
      const url = `${this.baseUrl}/api/product/${updateImage.productID}/image`;
      return this.http
      .put<ItemImage[]>(url, JSON.stringify(updateImage), httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    }

    GetImage(productID: string) {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.baseUrl}/api/product/${productID}/image`, httpOptions)
              .subscribe((res: Response) => {
              resolve(res);
              }, (err) => {
                reject(err);
              });
        });
    }

    // edit barcode&images
    getBarcodeByID(productID: string): Observable<ItemBarcode[]> {
        const url = `${this.baseUrl}/api/product/${productID}/barcode`;
        return this.http
            .get<ItemBarcode[]>(url, httpOptions)
            .pipe(
              retry(1),
              catchError(this.handleError)
            );
    }

    saveEditBarcode(barcodesDetail: ItemBarcode[]) {
      const url = `${this.baseUrl}/api/product/${barcodesDetail[0].productID}/barcode`;
      return this.http
        .put<void>(url, JSON.stringify(barcodesDetail), httpOptions)
        .pipe(
          catchError(this.handleError)
        );
     }
}
