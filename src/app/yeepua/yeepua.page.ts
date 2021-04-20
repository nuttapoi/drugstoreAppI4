import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Observable, Subject, BehaviorSubject, throwError } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import { App, NavController, ToastController, LoadingController } from 'ionic-angular';

import { ItemBuy } from '../models/item-buy';
import { YeepuaService } from '../services/yeepua.service';
import { PresentToast } from '../services/present-toast';
import { CartModalPage } from './cart-modal/cart-modal.page';

@Component({
  selector: 'app-yeepua',
  templateUrl: 'yeepua.page.html',
  styleUrls: ['yeepua.page.scss'],
})

export class YeepuaPage implements OnInit {
    itemsBuy$: Observable<ItemBuy[]>;
    itemsBuy: ItemBuy[] = [];
    cartx: ItemBuy[] = [];
    cartItemCount: BehaviorSubject<number>;
    textSearch: string;
    convertedImage: any;
    private searchTerms = new Subject<string>();
    url: string;

    @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
    constructor(
    public yeepuaService: YeepuaService,
    public barcodeScanner: BarcodeScanner,
    private toastCtrl: PresentToast,
    private modalCtrl: ModalController,
    ) { }

    search(event: any): void {
      // this.textSearch  = key.target.value;
      // this.searchTerms.next(key.target.value);
      if ( event && event.key === 'Enter') {
      console.log(event.target.value);
      this.itemsBuy$ = this.yeepuaService.searchProduct(event.target.value);
      // this.itemsBuy = this.yeepuaService.searchProduct(event.target.value);
      // this.itemsBuy$ = this.yeepuaService.getBuyItemByName(event.target.value);
      // this.yeepuaService.getBuyItemByName(event.target.value)
      //   .subscribe( res => this.itemsBuy = res );
      }
    }
    // ionViewWillEnter() {
    //   this.itemsBuy = this.yeepuaService.searchProduct('t');
    //   console.log('willenter' + this.itemsBuy);
    // }
    ngOnInit(): void {
      this.url = this.yeepuaService.getUrl();
      this.cartx = this.yeepuaService.getCart();
      this.cartItemCount = this.yeepuaService.getCartItemCount();
      this.itemsBuy$ = this.yeepuaService.searchProduct('t');
/*         this.itemsBuy$ = this.searchTerms.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((term: string) => this.yeepuaService.getBuyItemByName(term)),
        // switchMap((term: string) => this.reportService.searchProduct(term)),
        ); */
      }

      animateCSS(animationName, keepAnimated = false) {
          const node = this.fab.nativeElement;
          node.classList.add('animated', animationName);
          // https://github.com/daneden/animate.css
          function handleAnimationEnd() {
            if (!keepAnimated) {
              node.classList.remove('animated', animationName);
            }
            node.removeEventListener('animationend', handleAnimationEnd);
          }
          node.addEventListener('animationend', handleAnimationEnd);
      }

      addToCart(product: ItemBuy): void {
          this.yeepuaService.addProduct(product);
          this.animateCSS('tada');
          this.searchTerms.next('ดpเH');
      }

      async openCart() {
        this.animateCSS('bounceOutLeft', true);
        const modal = await this.modalCtrl.create({
          component: CartModalPage,
          cssClass: 'cart-modal'
        });
        modal.onWillDismiss().then(() => {
          this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
          this.animateCSS('bounceInLeft');
        });
        modal.present();
      }

      decreaseCartItem(product) {
          this.yeepuaService.decreaseCartItem(product);
      }

      increaseCartItem(product) {
        this.yeepuaService.increaseCartItem(product);
      }

      removeCartItem(product) {
        this.yeepuaService.removeCartItem(product);
      }

      barcodeScan() {
        this.barcodeScanner.scan().then((barcodeData) => {
        this.yeepuaService.addProductByBarcode(barcodeData.text);
        }, (err) => {
          this.toastCtrl.show(err);
        });
      }


/*     clearCart() {
      this.itemsIn.length = 0;
    } */

/*     viewCart(){
      this.navCtrl.push( ViewcartPage,
        {cartItem: this.itemsIn,
          cartHeader: this.billHeader,
          callback: this.myCallbackFunction});
    }

    myCallbackFunction = ( params ) => {
      return new Promise((resolve, reject) => {
        this.itemsIn = params; // set return value to the newName parameter
        resolve();
      });
  } */

/*   logout() {
    this.showLogout();
    this.authService.logout().then((result) => {
      //localStorage.clear();
      this.loading.dismiss();
      let nav = this.app.getRootNav();
      nav.setRoot(LoginPage);
    }, (err) => {
      this.loading.dismiss();
      this.presentToast(err);
    });
  } */

/*   showLogout() {
    this.loading = this.loadingCtrl.create({
        content: 'Loging...out'
    });

    this.loading.present();
  } */

/*   presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

} */


}
