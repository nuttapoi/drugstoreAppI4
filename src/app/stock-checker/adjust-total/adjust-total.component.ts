import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Stock } from 'src/app/models/stock';
import { ReportService } from '../../services/report.service';
import { PresentToast } from '../../services/present-toast';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-adjust-total',
  templateUrl: './adjust-total.component.html',
  styleUrls: ['./adjust-total.component.scss'],
})


export class AdjustTotalComponent implements OnInit {
    // window: any;
    // showFooter = true;
    blnEditLot = false;
    toast: any;
    stocks$: Observable<Stock[]>;
    stockDetail: Stock = null;
    textSearch: string;
    private searchTerms = new Subject<string>();
    constructor(
      private reportService: ReportService,
      private toastContrl: PresentToast,
      private barcodeScanner: BarcodeScanner,
      private router: Router,
      private camera: Camera

      ) {
      }
    // Push a search term into the observable stream.
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
      this.blnEditLot = false;
    }

    onSelect(select: Stock): void {
      if (select) {
        this.stockDetail = select;
        this.stockDetail.qtyActual = 0;
        this.reportService.GetImage(select.productID).then((result: {imageBase64: 'string'}) => {
          this.stockDetail.imageBase64 = 'data:image/jpeg;base64,' + result.imageBase64;
        }, (err) => {
          console.log(err);
        });
        this.textSearch = '';
        this.searchTerms.next('ดpเH');
      }
    }

    saveQty(): void {
      if (this.stockDetail) {
        if (this.stockDetail.qtyActual !== this.stockDetail.qtyNowAll) {
          this.reportService.updateStock(this.stockDetail).subscribe(
            result => {
              // this.stocks = Observable.of<Stock[]>([]);
              // this.searchTerms.next('ดpเH');
              this.stockDetail = null;
              // this.search(this.textSearch);
              this.toastContrl.show('บันทึกเรียบร้อย');
            },
            error => {
              this.toastContrl.show('เกิดข้อผิดผลาด');
            },
          );
        }
      }
    }
    /*  scan() {
        Debug purpose
        this.reportService.barcodeItemAdjust('8858862599871').subscribe(
          result => {
            if (result && result.length > 0) {
            this.stockDetail = result[0];
            console.log(result[0]);
            }
          }
        );
    } */

    scan() {
      this.barcodeScanner.scan().then(barcodeData => {
        this.reportService.barcodeItemAdjust(barcodeData.text).subscribe(
          result => {
            if (result  && result.length > 0 ) {
            this.stockDetail = result[0];
            this.stockDetail.qtyActual = 0;
            }
          }
        );
      }).catch(err => {
        this.toastContrl.show('barcode not found');
      });
    }

    navEditLot() {
      if (this.blnEditLot) {
        // this.router.navigateByUrl('/stock-checker/edit-lot');
      }
    }

    updatePhoto() {
      const options: CameraOptions = {
        quality: 90,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        allowEdit: true,
        targetWidth: 144,
        targetHeight: 144,
      };

      if (this.stockDetail) {
        const oldImageBase64 = this.stockDetail.imageBase64;
        this.camera.getPicture(options).then((imageData) => {
          // this.camera.DestinationType.FILE_URI gives file URI saved in local
          // this.camera.DestinationType.DATA_URL gives base64 URI
          const base64Image = 'data:image/jpeg;base64,' + imageData;
          this.stockDetail.imageBase64 = base64Image;
          const upDateImage = { productID : this.stockDetail.productID,
          imageBase64 : base64Image};
          this.reportService.UpdateImage(upDateImage)
            .subscribe(res => res,
            err => this.stockDetail.imageBase64 = oldImageBase64);
          }, (err) => {
            this.stockDetail.imageBase64 = oldImageBase64;
            console.log(err);
          // Handle error
        });
      }
    }
}
