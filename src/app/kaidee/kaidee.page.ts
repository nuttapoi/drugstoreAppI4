import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { SaleByItem } from 'src/app/models/sale-by-item';
import * as moment from 'moment';

@Component({
  selector: 'app-kaidee',
  templateUrl: './kaidee.page.html',
  styleUrls: ['./kaidee.page.scss'],
})
export class KaideePage implements OnInit {


  rows: SaleByItem[] = [];
  loadingIndicator = true;
  reorderable = true;
  fromDate;
  toDate;

  constructor(
    private reportService: ReportService
  ) {
    this.fromDate = moment().format('YYYY-MM-DD');
    this.toDate = moment().format('YYYY-MM-DD');
  }

  ngOnInit() {
    this.reportService.getProfitByItem(moment(this.fromDate).format('YYYY-MM-DD'),
    moment(this.toDate).format('YYYY-MM-DD'))
      .subscribe(res => this.rows = res);
  }

  getReport() {
    this.reportService.getProfitByItem(moment(this.fromDate).format('YYYY-MM-DD'),
    moment(this.toDate).format('YYYY-MM-DD'))
      .subscribe(res => this.rows = res);
  }
}
