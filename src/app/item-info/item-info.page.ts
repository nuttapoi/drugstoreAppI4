import { Component, OnInit } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import * as moment from 'moment';
import { Router } from '@angular/router';

import { Stock } from 'src/app/models/stock';
import { ReportService } from '../services/report.service';
import { PresentToast } from '../services/present-toast';
import { ItemBarcode } from '../models/item-barcode';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.page.html',
  styleUrls: ['./item-info.page.scss'],
})
export class ItemInfoPage implements OnInit {
    isValidFormat = true;
    toast: any;
    // stocks$: Observable<Stock[]>;
    // textSearch: string;
    itemsDetail: ItemBarcode[] = [];
    // itemsHeader: any;
    productID: string;
    // private searchTerms = new Subject<string>();

    constructor(
      // private barcodeScanner: BarcodeScanner,
      private actRoute: ActivatedRoute,
      private reportService: ReportService,
      private toastContrl: PresentToast,
      // private camera: Camera,
      // private router: Router
      ) {
        this.productID = this.actRoute.snapshot.params.pid;
      }

      ngOnInit() {
        this.reportService.getBarcodeByID(this.productID)
          .subscribe(res => {this.itemsDetail = res;
          });

      }
    // Push a search term into the observable stream.
    // search(term: string): void {
/*     search(term): void {
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

    onSelect(select: Stock): void {
      if (select) {
        this.reportService.getBarcodeByID(select.productID)
          .subscribe(res => {
            this.itemsDetail = res;
            const img = 'data:image/jpeg;base64,' + this.itemsDetail[0].imageBase64;
            this.itemsHeader = {productID: select.productID, imageBase64: img,
              businessName: this.itemsDetail[0].businessName };
          });
        this.textSearch = '';
        this.searchTerms.next('ดpเH');
      }
    } */

    saveEditBarcode() {
      this.isValidFormat = true;
      if (this.itemsDetail) {
        this.itemsDetail.forEach( (element) => {
          const saleBarcode = element.saleBarcode.trim();
          if (saleBarcode) {
            const regexp = new RegExp('^\\d+$');
            this.isValidFormat = regexp.test(saleBarcode) && this.isValidFormat;
          }
        });

        if (this.isValidFormat) {
          this.reportService.saveEditBarcode(this.itemsDetail)
          .subscribe();
        } else {
          this.toastContrl.show('บาร์โค๊ดเป็นตัวเลขได้เท่านั้น');
        }
      }
    }

/*     updatePhoto() {
      if (this.itemsHeader.productID) {
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

      const oldImageBase64 = this.itemsHeader.imageBase64;
      this.camera.getPicture(options).then((imageData) => {
        // this.camera.DestinationType.FILE_URI gives file URI saved in local
        // this.camera.DestinationType.DATA_URL gives base64 URI
        const base64Image = 'data:image/jpeg;base64,' + imageData;
        this.itemsHeader.imageBase64 = base64Image;
        const upDateImage = { productID : this.itemsHeader.productID,
        imageBase64 : base64Image};
        this.reportService.UpdateImage(upDateImage)
          .subscribe(res => res,
            err => this.itemsHeader.imageBase64 = oldImageBase64);
        }, (err) => {
          this.itemsHeader.imageBase64 = oldImageBase64;
          console.log(err);
        // Handle error
      });
    }
  } */
}
