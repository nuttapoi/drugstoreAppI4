import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockCheckerPage } from './stock-checker.page';
import { AdjustTotalComponent } from './adjust-total/adjust-total.component';
import { EditLotComponent } from './edit-lot/edit-lot.component';

const routes: Routes = [
  {
    path: '',
    component: StockCheckerPage,
        children: [
          {path: 'edit-qty', component: AdjustTotalComponent },
          {path: 'edit-lot', component: EditLotComponent },
          {path: '**', redirectTo: 'edit-qty', pathMatch: 'full'},
        ]
  },
  // {
  //   path: '',
  //   redirectTo: 'edit-qty',
  //   pathMatch: 'full'
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockCheckerPageRoutingModule {}
