import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { PresentToast } from '../services/present-toast';
import { ItemBarcode } from '../models/item-barcode';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.page.html',
  styleUrls: ['./item-info.page.scss'],
})
export class ItemInfoPage implements OnInit {
    isValidFormat = true;
    toast: any;
    itemsDetail: ItemBarcode[] = [];
    productID: string;

    constructor(
      private actRoute: ActivatedRoute,
      private reportService: ReportService,
      private toastContrl: PresentToast,
      ) {
        this.productID = this.actRoute.snapshot.params.pid;
      }

      ngOnInit() {
        this.reportService.getBarcodeByID(this.productID)
          .subscribe(res => {this.itemsDetail = res;
          });

      }
    
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

}
