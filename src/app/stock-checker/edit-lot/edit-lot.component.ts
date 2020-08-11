import { Component, OnInit } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Stock } from 'src/app/models/stock';
import { ReportService } from '../../services/report.service';
import { PresentToast } from '../../services/present-toast';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-edit-lot',
  templateUrl: './edit-lot.component.html',
  styleUrls: ['./edit-lot.component.scss'],
})
export class EditLotComponent implements OnInit {
    toast: any;
    stocks$: Observable<Stock[]>;
    textSearch: string;
    lotsDetail: Stock[] = [];
    blnEditQty = true;
    private searchTerms = new Subject<string>();

    constructor(
      private barcodeScanner: BarcodeScanner,
      private reportService: ReportService,
      private toastContrl: PresentToast,
      private router: Router
      ) {}
    // Push a search term into the observable stream.
    // search(term: string): void {
    search(term): void {
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

    ionViewWillEnter() {
      this.blnEditQty = true;
    }

    onSelect(select: Stock): void {
      this.reportService.getLotDetailByID(select.productID)
        .subscribe(res => this.lotsDetail = res);
      this.textSearch = '';
      this.searchTerms.next('ดpเH');
    }

    scan() {
      this.barcodeScanner.scan().then(barcodeData => {
        this.reportService.barcodeEditLots(barcodeData.text).subscribe(
          result => {
            if (result && result.length) {
              this.lotsDetail = result;
            }
          }
        );
      }).catch(err => {
        this.toastContrl.show('barcode not found');
      });
    }

    saveEditLots() {
      if (this.lotsDetail) {
        let isValidFormat = true;
        this.lotsDetail.forEach( (element) => {
          if (element.dateExpire != null) {
            const expMoment = moment(element.dateExpire, 'MM/DD/YYYY').format('MM/DD/YYYY');
            isValidFormat = moment(expMoment, 'MM/DD/YYYY', true).isValid() && isValidFormat;
          }
        });
        if (isValidFormat) {
        this.reportService.saveEditLots(this.lotsDetail)
        .subscribe();
        } else {
          this.toastContrl.show('พบรูปแบบวันหมดอายุไม่ใช่ MM/dd/yyyy เช่น 02/28/2020');
        }
      }
    }

    navEditQty() {
      if (!this.blnEditQty) {
        this.router.navigateByUrl('/stock-checker/edit-qty');
      }
    }

}
