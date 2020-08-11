import { Component, OnInit } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Stock } from 'src/app/models/stock';
import { ReportService } from '../services/report.service';
import { PresentToast } from '../services/present-toast';
// import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-stock-checker',
  templateUrl: './stock-checker.page.html',
  styleUrls: ['./stock-checker.page.scss'],
})
export class StockCheckerPage {
/*     blnEditLot = false;
    toast: any;
    stocks$: Observable<Stock[]>;
    stockDetail: Stock = null;
    textSearch: string;
    private searchTerms = new Subject<string>();
    constructor(
      private barcodeScanner: BarcodeScanner,
      private reportService: ReportService,
      private toastContrl: PresentToast,
      private router: Router

      ) {  }

    search(term: string): void {
      this.searchTerms.next(term);
    }

    ngOnInit(): void {
      this.stocks$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
        debounceTime(300),

        // ignore new term if same as previous term
        distinctUntilChanged(),

        // switch to new search observable each time the term changes
        switchMap((term: string) => this.reportService.searchProduct(term)),
      );
    }

    scan() {
      this.barcodeScanner.scan().then(barcodeData => {
        this.reportService.barcodeItemAdjust(barcodeData.text).subscribe(
          result => {
            if (result  && result.length > 0 ) {
            this.stockDetail = result[0];
            }
          }
        );
      }).catch(err => {
        this.toastContrl.show('barcode not found');
      });
    }

    onSelect(select: Stock): void {
      this.stockDetail = select;
      this.textSearch = '';
      this.searchTerms.next('ดpเH');
    }

    navEditLot() {
      if (this.blnEditLot) {
        this.router.navigateByUrl('/stock-checker/edit-lot');
      } else {
        this.router.navigateByUrl('/stock-checker/edit-qty');
      }
    } */
}
