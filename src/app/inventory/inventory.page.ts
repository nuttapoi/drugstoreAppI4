import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/models/supplier';
import { ReportService } from '../services/report.service';

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
  ) {
  }

  ngOnInit() {
      this.reportService.getInvSupplier()
      .subscribe(res => {
            this.suppliers = res;
      });
  }

}
