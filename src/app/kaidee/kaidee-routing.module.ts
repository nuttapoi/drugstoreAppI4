import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KaideePage } from './kaidee.page';

const routes: Routes = [
  {
    path: '',
    component: KaideePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KaideePageRoutingModule {}
