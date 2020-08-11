import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from '../services/report.service';
import { SaleByItem } from 'src/app/models/sale-by-item';
import * as moment from 'moment';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-kaidee',
  templateUrl: './kaidee.page.html',
  styleUrls: ['./kaidee.page.scss'],
})
export class KaideePage implements OnInit {

  // @ViewChild('DatatableComponent', {static: false}) ngxDatatable: DatatableComponent;

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
    // this.toDate = moment().toISOString().slice(0, 19).replace('T', ' ');
    // this.fromDate = '2017-04-06'
    // this.toDate = '2017-04-06'
  }

  ngOnInit() {
    this.reportService.getProfitByItem(moment(this.fromDate).format('YYYY-MM-DD'),
    moment(this.toDate).format('YYYY-MM-DD'))
      .subscribe(res => this.rows = res);
    // this.reportService.getProfitByItem(moment(this.fromDate).toISOString().slice(0, 19).replace('T', ' '),
    // moment(this.toDate).toISOString().slice(0, 19).replace('T', ' '))
    //   .subscribe(res => this.rows = res);
  }

  getReport() {
    this.reportService.getProfitByItem(moment(this.fromDate).format('YYYY-MM-DD'),
    moment(this.toDate).format('YYYY-MM-DD'))
      .subscribe(res => this.rows = res);
  }
}
