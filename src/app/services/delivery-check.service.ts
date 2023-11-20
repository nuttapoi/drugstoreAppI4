import { Injectable, OnInit, Directive } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject, from } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import * as clone from 'clone';
// import { Plugins } from '@capacitor/core';
import { PresentToast } from '../services/present-toast';
import { get, set } from './storage.service';
import { ItemCheck } from '../models/item-check';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DeliveryCheckService {
  resultItem: ItemCheck[] = [];
  requireItem: ItemCheck[] = [];
  requireItemCount = new BehaviorSubject(0);
  resultItemCount = new BehaviorSubject(0);
  // [
  //   { returnID: '19710312', productID: '003777', businessName: 'tiffy', unitNameA: 'กล่อง', returnQty: 5, resultQty: 4, diffQty: -1 },
  //   { returnID: '19710312', productID: '00001', businessName: 'decolgen', unitNameA: 'แผง', returnQty: 5, resultQty: 5, diffQty: 0 },
  //   { returnID: '19710312', productID: '00002', businessName: 'tylenol', unitNameA: 'แผง', returnQty: 5, resultQty: 4, diffQty: 0 },
  //   { returnID: '19710312', productID: '00003', businessName: 'nasotapp', unitNameA: 'แผง', returnQty: 4, resultQty: 5, diffQty: 1 },
  //   { returnID: '19710312', productID: '00004', businessName: 'zyrtec', unitNameA: 'แผง', returnQty: 5, resultQty: 5, diffQty: 0 },
  //   { returnID: '19710312', productID: '00005', businessName: 'concor2.5', unitNameA: 'แผง', returnQty: 5, resultQty: 3, diffQty: -2 },
  // ];
  requireInput: ItemCheck =  { returnID: '', productID: '000000', businessName: '-', unitNameA: '-',
   unitNameX: 1, returnQty: 0, resultQty: 0, diffQty: 0 };
  public baseUrl = 'http://localhost:3001';
  private returnID = '';

  constructor(
      private http: HttpClient,
      public toastCtrl: PresentToast,
      ) {
        this.GetUrlHQ().then((data: any) =>  {
          this.baseUrl = data;
        });
  }

  private async GetUrlHQ() {
    return await get('server') || 'http://localhost:3001';
  }

  deepClone<T>(value): T {
    return clone<T>(value);
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

    initRequireInput(): ItemCheck {
      return { returnID: '', productID: '000000', businessName: '-', unitNameA: '-',
        unitNameX: 1, returnQty: 0, resultQty: 0, diffQty: 0 };
    }

    getResultItems() {
      return this.resultItem;
    }
    clearResultItems() {
      this.resultItemCount.next(this.resultItem.length);
      return this.resultItem = [];
    }
    getReturnID() {
      return this.returnID;
    }

    getRequireItems() {
      return this.requireItem;
    }

    getRequireItemCount() {
      return this.requireItemCount;
    }

    getResultItemCount() {
      return this.resultItemCount;
    }

    addCheck(select: ItemCheck): void {
      if (select) {
        const foundItem: ItemCheck = this.findById(this.resultItem, select.productID);
        if (!foundItem && select.resultQty !== 0 ) {
          // รายการใหม่
          select.diffQty = select.resultQty - select.returnQty;
          this.resultItem.push(select);
        } else {
          foundItem.diffQty = select.resultQty;
        }
        this.resultItemCount.next(this.resultItem.length);
      }
    }

    removeResultItem(item: ItemCheck): void {
      for (let i = this.resultItem.length - 1; i >= 0; i--) {
          if (item.productID === this.resultItem[i].productID) {
              this.resultItem.splice(i, 1);
          }
      }
      this.resultItemCount.next(this.resultItem.length);
    }

    calculateDiff(): ItemCheck[] {
      // find item in array requir
      const diffItems: ItemCheck[] = this.resultItem.slice();
      for (const val of this.requireItem) {
        const found: ItemCheck = this.findById(diffItems, val.productID);
        if (found) {
          found.diffQty = found.resultQty * found.unitNameX - val.returnQty;
          found.returnID = this.returnID;
        } else {
          // รายการใหม่
          const notFound: ItemCheck = this.deepClone(val);
          notFound.diffQty = notFound.resultQty - notFound.returnQty;
          notFound.returnID = this.returnID;
          diffItems.push(notFound);
        }
      }
      return diffItems;
    }

    findById(source: ItemCheck[], id) {
      for (const val of source) {
        if (val.productID === id) {
          return val;
        }
      }
      return undefined;
    }

    updateRequireInput(userIn: ItemCheck, qty): ItemCheck {
          return { returnID: this.returnID, productID: userIn.productID,
            businessName: userIn.businessName,
            unitNameA: userIn.unitNameA, unitNameX: userIn.unitNameX,
            returnQty: 0, resultQty: qty, diffQty: 0 };
        // }
    }

    getCheckItems(returnID: string): ItemCheck[] {
      this.httpGetCheckItems(returnID).subscribe(
        result => {
          if (result  && result.length > 0 ) {
            this.requireItem = result;
            this.returnID = returnID;
          } else {
            this.returnID = '';
            this.requireItem = [];
          }
          this.requireItemCount.next(this.requireItem.length);
        },
        err => {
            this.toastCtrl.show('something error Ughhhh');
        }
      );
      return this.requireItem;
    }

    httpGetCheckItems(returnID: string): Observable<ItemCheck[]> {
        const url = `${this.baseUrl}/api/delivery_check/${returnID}/return`;
        return this.http
            .get<ItemCheck[]>(url, httpOptions)
            .pipe(
              retry(1),
              catchError(this.handleError)
            );
    }

    barcodeItemCheck(barcode: string): Observable<ItemCheck[]> {
        const url = `${this.baseUrl}/api/delivery_check/${barcode}/barcode`;
        return this.http
            .get<ItemCheck[]>(url, httpOptions)
            .pipe(
              retry(1),
              catchError(this.handleError)
            );
    }

}
