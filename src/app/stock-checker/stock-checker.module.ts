import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockCheckerPageRoutingModule } from './stock-checker-routing.module';

import { StockCheckerPage } from './stock-checker.page';
import { AdjustTotalComponent } from './adjust-total/adjust-total.component';
import { EditLotComponent } from './edit-lot/edit-lot.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockCheckerPageRoutingModule
  ],
  declarations: [StockCheckerPage, AdjustTotalComponent, EditLotComponent ]
})
export class StockCheckerPageModule {}
