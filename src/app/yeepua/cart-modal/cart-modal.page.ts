import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ItemBuy } from '../../models/item-buy';
import { YeepuaService } from '../../services/yeepua.service';
import { PresentToast } from '../../services/present-toast';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {

  cart: ItemBuy[] = [];
  constructor(
    private yeepuaService: YeepuaService,
    private modalCtrl: ModalController,
    private toastContrl: PresentToast,
    private alertCtrl: AlertController) { }

    ngOnInit() {
    this.cart = this.yeepuaService.getCart();
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

  close() {
    this.modalCtrl.dismiss();
  }

  getTotal() {
      return this.yeepuaService.calculateBill(this.cart);
  }

  checkout() {
    // Perfom PayPal or Stripe checkout process
    this.yeepuaService.checkOut().subscribe(async () => {
        this.yeepuaService.emptyCart();
        await this.showAlert();
      },
      error => {
        this.toastContrl.show('เกิดข้อผิดผลาด');
      },
    );
  }

  async showAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'We will deliver your food as soon as possible',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }
}
