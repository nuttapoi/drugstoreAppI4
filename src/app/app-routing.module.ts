import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'kaidee',
    loadChildren: () => import('./kaidee/kaidee.module').then( m => m.KaideePageModule)
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module').then( m => m.InventoryPageModule)
  },
  {
    path: 'stock-checker',
    loadChildren: () => import('./stock-checker/stock-checker.module').then( m => m.StockCheckerPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module').then( m => m.InventoryPageModule)
  },
  {
    path: 'kaidee',
    loadChildren: () => import('./kaidee/kaidee.module').then( m => m.KaideePageModule)
  },
  {
    path: 'reorder',
    loadChildren: () => import('./reorder/reorder.module').then( m => m.ReorderPageModule)
  },
  {
    path: 'inventory/:pid/:sid',
    loadChildren: () => import('./stock-detail/stock-detail.module').then( m => m.StockDetailPageModule)
  },
  {
    path: 'reorder/:pid/:sid',
    loadChildren: () => import('./stock-detail/stock-detail.module').then( m => m.StockDetailPageModule)
  },
  {
    path: 'item-info',
    loadChildren: () => import('./item-info/item-info.module').then( m => m.ItemInfoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}