import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InventoryPage } from './inventory.page';

const routes: Routes = [
  { path: '', component: InventoryPage,
/*         children: [
          {
            path: ':id',
            loadChildren: () => import('../stock-detail/stock-detail.module').then( m => m.StockDetailPageModule)
          }
        ] */
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryPageRoutingModule {}
