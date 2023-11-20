import { Component, OnInit } from '@angular/core';
import { MinStock } from '../models/min-stock';
import { ActivatedRoute } from '@angular/router';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.page.html',
  styleUrls: ['./stock-detail.page.scss'],
})
export class StockDetailPage implements OnInit {
  supID: string;
  pageID: string;
  rows: MinStock[] = [];
  loadingIndicator = true;
  reorderable = true;
  title = 'สินค้าในคลัง';
  constructor(
    private actRoute: ActivatedRoute,
    private reportService: ReportService
    ) {
      // first medthod
      this.supID = this.actRoute.snapshot.params.sid;
      this.pageID = this.actRoute.snapshot.params.pid;
     }

  ngOnInit() {
    if (this.pageID === '2') {
      this.reportService.getMinStock(this.supID)
      .subscribe(res => this.rows = res);
      this.title = 'สินค้าถึงจุดสั่งซื้อ';
    } else {
      this.reportService.getInvStock(this.supID)
      .subscribe(res => this.rows = res);
    }
  }
}
