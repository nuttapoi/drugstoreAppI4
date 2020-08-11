import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IonicModule } from '@ionic/angular';

import { KaideePageRoutingModule } from './kaidee-routing.module';

import { KaideePage } from './kaidee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    KaideePageRoutingModule
  ],
  declarations: [KaideePage]
})
export class KaideePageModule {}
