import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject, throwError } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { PresentToast } from '../services/present-toast';

import { DeliveryCheckService } from '../services/delivery-check.service';
import { ReportService } from '../services/report.service';
import { ItemCheck } from '../models/item-check';
import { Stock } from 'src/app/models/stock';

@Component({
  selector: 'app-delivery-check',
  templateUrl: './delivery-check.page.html',
  styleUrls: ['./delivery-check.page.scss'],
})
export class DeliveryCheckPage implements OnInit {

  itemsResult: ItemCheck[];
  requireItems: ItemCheck[];
  requireInput: ItemCheck;
  barcode = '';
  finalCheck = false;
  returnID = '';
  docText = 'รายการที่นับได้จริง';
  initQty = 1;
  resultCount: BehaviorSubject<number>;
  requireCount: BehaviorSubject<number>;
  scanMode = true;

  stocks$: Observable<Stock[]>;
  stockDetail: Stock = null;
  textSearch: string;
  private searchTerms = new Subject<string>();

  // @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  // @ViewChild('user', {static: true}) user: ElementRef;
  constructor(
    public deliveryService: DeliveryCheckService,
    private reportService: ReportService,
    public toastCtrl: PresentToast,
    // private cd: ChangeDetectorRef,

  ) { }

  ngOnInit() {
      this.itemsResult = this.deliveryService.getResultItems();
      this.requireItems = this.deliveryService.getRequireItems();
      this.requireInput = this.deliveryService.initRequireInput();
      this.returnID = this.deliveryService.getReturnID();
      this.requireCount = this.deliveryService.getRequireItemCount();
      this.resultCount = this.deliveryService.getResultItemCount();
      this.stocks$ = this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.reportService.searchProduct(term)),
      );
  }

  search(term): void {
    if (term.length > 1 || term.length === 0 ) {
      this.searchTerms.next(term);
    }
  }

  onSelect(select: Stock): void {
    if (select) {
      const userIn: ItemCheck = this.deliveryService.initRequireInput();
      userIn.productID = select.productID;
      userIn.businessName = select.businessName;
      userIn.unitNameA = select.unitNameA;
      this.updateRequireInput(userIn, this.initQty);
      this.addCheck();
      this.textSearch = '';
      this.searchTerms.next('ดpเH');
      } else {
        this.initRequireInput();
      }
  }

  moveNext(mn) {
    mn.setFocus();
  }

  getCheckItems(event: any) {
    if ( event && event.key === 'Enter') {
      if (this.returnID.trim().length === 10) {
        this.deliveryService.getCheckItems(event.target.value);
      } else {
        this.toastCtrl.show('รหัสใบเบิกสินค้า10หลัก');
      }
    }
  }
/*   getCheckItems(event: any) {
    if ( event && event.key === 'Enter') {
      if (this.returnID.trim().length === 10) {
        this.deliveryService.httpGetCheckItems(event.target.value).subscribe(
          result => {
            if (result  && result.length > 0 ) {
              this.requireItems = result;
              this.requireCount.next(this.requireItems.length);
            } else {
              this.returnID = '';
              this.requireItems = [];
              this.requireCount.next(this.requireItems.length);
            }
          },
          err => {
              this.toastCtrl.show('something error Ughhhh');
          }
        );
      } else {
        this.toastCtrl.show('รหัสใบเบิกสินค้า10หลัก');
      }
    }
  } */

  barcodescan(event: any): void {
    if ( event && event.key === 'Enter') {
      const scanIn = event.target.value;
      if (scanIn.length > 0 && scanIn.charAt(0) === '+') {
        const x = scanIn.substring(1, scanIn.length);
        if (this.isNumeric(x)) {
          this.initQty = x;
        } else {
          this.initQty = 1;
        }
      } else {
        this.deliveryService.barcodeItemCheck(event.target.value).subscribe(
          result => {
            if (result  && result.length > 0 ) {
              // this.toastCtrl.show(result[0]);
              // console.log('scan', result[0]);
              this.updateRequireInput(result[0], this.initQty);
              this.addCheck();
            } else {
              this.initRequireInput();
            }
          }
        );
      }
      this.barcode = '';
    }
  }

  isNumeric(value) {
        return /^\d+$/.test(value);
  }

/*   addCheckPress(event, movehere) {
    if ( event && event.key === 'Enter') {
      if (this.requireInput.productID !== '000000') {
        this.deliveryService.addCheck(this.requireInput);
        this.barcode = '';
        movehere.setFocus();
      }
    }
  } */

  addCheck() {
    if (this.requireInput.productID !== '000000') {
      this.deliveryService.addCheck(this.requireInput);
      // this.barcode = '';
      // movehere.setFocus();
      // this.user.nativeElement.focus();
    }
  }

  updateRequireInput(id: ItemCheck, qty) {
    this.requireInput = this.deliveryService.updateRequireInput(id, qty);
  }

  initRequireInput() {
    this.requireInput = this.deliveryService.initRequireInput();
  }

  remove(rm: ItemCheck) {
    this.deliveryService.removeResultItem(rm);
  }

  clear() {
    if (!this.finalCheck) {
      this.itemsResult = this.deliveryService.clearResultItems();
    }
  }

  checkDiff() {
    // this.deliveryService.requireItem = this.requireItems;
    if (this.finalCheck) {
      this.docText = 'ผลต่างกับใบเบิก';
      this.itemsResult = this.deliveryService.calculateDiff();
    } else {
      this.docText = 'รายการที่นับได้จริง';
      this.itemsResult = this.deliveryService.getResultItems();
    }
    // this.itemsResult = this.deliveryService.getRequireItems();
    // this.cd.markForCheck();
  }

}
