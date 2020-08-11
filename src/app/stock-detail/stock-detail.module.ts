import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockDetailPageRoutingModule } from './stock-detail-routing.module';

import { StockDetailPage } from './stock-detail.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    StockDetailPageRoutingModule
  ],
  declarations: [StockDetailPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockDetailPageModule {}
