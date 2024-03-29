import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { ReportService } from './services/report.service';
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  public appPages = [
    {
      title: 'ยอดขาย',
      url: '/home',
      icon: 'bar-chart-outline'
    },
    {
      title: 'ขายอะไรไป',
      url: '/kaidee',
      icon: 'cart'
    },
    {
      title: 'คลังทั้งหมด',
      url: '/inventory',
      icon: 'home'
    },
    {
      title: 'ต้องสั่งอะไรบ้าง',
      url: '/reorder',
      icon: 'alarm'
    },
    {
      title: 'ปรับจำนวน',
      url: '/stock-checker',
      icon: 'barcode'
    },
    // {
    //   title: 'สั่งยา',
    //   url: '/yeepua',
    //   icon: 'alarm'
    // },
    // lookin
    // {
    //   title: 'ส่งของ',
    //   url: '/delivery-check',
    //   icon: 'checkmark-circle-outline'
    // },
    {
      title: 'ตั้งค่า',
      url: '/setting',
      icon: 'options'
    }
  ];

  constructor(
    private reportService: ReportService,
    private platform: Platform,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.reportService.GetUrl().then((data: any) => { console.log(data); });
      this.router.navigateByUrl('stock-checker');
      this.statusBar.styleDefault();
      SplashScreen.hide();
    });
  }
}
