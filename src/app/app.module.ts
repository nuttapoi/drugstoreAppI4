import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ChartsModule } from 'ng2-charts';
import { NativeHttpInterceptor } from './services/native-http.interceptor';
import { Camera } from '@ionic-native/camera/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { ReportService } from './services/report.service';
import { YeepuaService } from './services/yeepua.service';
import { CartModalPageModule } from './yeepua/cart-modal/cart-modal.module';
import { DeliveryCheckService } from './services/delivery-check.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    CartModalPageModule,
    BrowserModule,
    HttpClientModule,
    ChartsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    HTTP,
    Camera,
    StatusBar,
    BarcodeScanner,
    ChartsModule,
    InAppBrowser,
    ReportService,
    YeepuaService,
    DeliveryCheckService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: NativeHttpInterceptor,  multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
