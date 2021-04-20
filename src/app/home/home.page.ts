import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { ReportService } from '../services/report.service';
import { SaleSummary } from '../models/sale-summary';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { NgZone } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  chartData: ChartDataSets[] = [
    { data: [], label: 'ยอดขาย'},
    { data: [], label: 'กำไร'},
    { data: [], label: '%มาจิ้น', type: 'line'}
  ];
  chartLabels: Label[];
  fromDate;
  toDate;
  rows: SaleSummary[] = [];
  loadingIndicator = true;
  reorderable = true;
  blnEmployee = false;
  // Options
  chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'ยอดขาย1สัปดาห์'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };
  chartColors: Color[] = [
    {
      borderColor: '#000000',
      backgroundColor: '#ff00ff'
    }
  ];
  chartType = 'bar';
  showLegend = false;

  constructor(
    private reportService: ReportService,
    private zone: NgZone
   ) {
      this.blnEmployee = false;
      this.fromDate = moment().add(-7, 'd');
      this.toDate = moment();
      // const today: Date = new Date();
      // const today7 = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      // this.fromDate = today7.toISOString().slice(0, 19).replace('T', ' ');
      // this.toDate = today.toISOString().slice(0, 19).replace('T', ' ');
  }

  ngOnInit() {
    // console.log('onInit');
    this.chartLabels = [];
    this.chartData[0].data = [];
    this.reportService.getProfitReport(moment(this.fromDate).format('YYYY-MM-DD'), moment(this.toDate).format('YYYY-MM-DD'))
      .subscribe(
        res =>  {
          this.zone.run(() => {
            if (res && res.length > 0) {
              this.rows = res;
              for (const entry of res) {
                this.chartLabels.push(formatDate(entry.period, 'dd/MM', 'en-US'));
                this.chartData[0].data.push(entry.sale);
                this.chartData[1].data.push(entry.profit);
              }
            }
          });
        }
      );
  }

  getReport() {
    if (!this.blnEmployee) {
    this.reportService.getProfitReport(moment(this.fromDate).format('YYYY-MM-DD')
      , moment(this.toDate).format('YYYY-MM-DD'))
      .subscribe(res => this.rows = res);
    } else {
      this.reportService.getProfitByUser(moment(this.fromDate.format('YYYY-MM-DD'))
      , moment(this.toDate).format('YYYY-MM-DD'))
        .subscribe(res => this.rows = res);
    }
  }

}
