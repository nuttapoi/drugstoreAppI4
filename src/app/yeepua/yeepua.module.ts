
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YeepuaPageRoutingModule } from './yeepua-routing.module';

import { YeepuaPage } from './yeepua.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YeepuaPageRoutingModule
  ],
  declarations: [YeepuaPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class YeepuaPageModule {}
