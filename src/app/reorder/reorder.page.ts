import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { Supplier } from 'src/app/models/supplier';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-reorder',
  templateUrl: './reorder.page.html',
  styleUrls: ['./reorder.page.scss'],
})
export class ReorderPage implements OnInit {
 suppliers: Supplier[] = [];
  pageID: any;
  constructor(
    private reportService: ReportService,
    private zone: NgZone
  ) {
  }

  ngOnInit() {
      this.reportService.getMinSupplier()
      .subscribe(res => {
          this.zone.run(() => {
            this.suppliers = res;
          });
      });
    }
}
