import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  serverName: any;
  serverHQ: any;

  constructor(
    private reportService: ReportService,
    private iab: InAppBrowser
  ) {
  }
  ngOnInit() {
      this.reportService.GetUrl().then((data: any) => {
        this.serverName = data;
      });
      this.reportService.GetUrlHQ().then((data: any) => {
        this.serverHQ = data;
      });
  }

  saved() {
    this.reportService.SaveUrl(this.serverName || 'http://localhost:3001');
    this.reportService.SaveUrlHQ(this.serverHQ || 'http://localhost:3001');
  }

  openWebpage() {
    const browser = this.iab.create(
      // tslint:disable-next-line:max-line-length
      'https://medium.com/@admin_4788/%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%97%E0%B8%B3-portforward-%E0%B9%80%E0%B8%9E%E0%B8%B7%E0%B9%88%E0%B8%AD%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%87%E0%B8%B2%E0%B8%99-drugstorerx4-0-app-c43bbc1af90f', '_system');
  }

}
