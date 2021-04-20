import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YeepuaPage } from './yeepua.page';

const routes: Routes = [
  {
    path: '',
    component: YeepuaPage
  },
  {
    path: 'cart-modal',
    loadChildren: () => import('./cart-modal/cart-modal.module').then( m => m.CartModalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YeepuaPageRoutingModule {}
