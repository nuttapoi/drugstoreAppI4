import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/models/supplier';
import { ReportService } from '../services/report.service';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {
  suppliers: Supplier[] = [];
  pageID: any;
  constructor(
    private reportService: ReportService,
    private zone: NgZone
  ) {
  }

  ngOnInit() {
      this.reportService.getInvSupplier()
      .subscribe(res => {
          this.zone.run(() => {
            this.suppliers = res;
          });
      });
  }

}
