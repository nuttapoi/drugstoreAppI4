import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PresentToast {
     constructor(
          private toastCtrl: ToastController
    ) {}

    async show(tmessage) {
        const toast = await this.toastCtrl.create({
        message: tmessage,
        duration: 2000
        });
        toast.present();
    }
}
