import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { Supplier } from 'src/app/models/supplier';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-reorder',
  templateUrl: './reorder.page.html',
  styleUrls: ['./reorder.page.scss'],
})
export class ReorderPage implements OnInit {
  suppliers: Supplier[] = [];
  pageID: any;
  constructor(
    private changeRef: ChangeDetectorRef,
    private reportService: ReportService
  ) {
  }

  ngOnInit() {
      this.reportService.getMinSupplier()
      .subscribe(res => {
          this.suppliers = res;
          this.changeRef.markForCheck();
      });
    }
}
