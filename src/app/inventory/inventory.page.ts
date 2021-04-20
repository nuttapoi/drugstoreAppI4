import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/models/supplier';
import { ReportService } from '../services/report.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  suppliers: Supplier[] = [];
  pageID: any;
  constructor(
    private changeRef: ChangeDetectorRef,
    private reportService: ReportService,
  ) {
  }

  ngOnInit() {
      this.reportService.getInvSupplier()
      .subscribe(res => {
            this.suppliers = res;
            // this.changeRef.markForCheck();
      });
  }

}
