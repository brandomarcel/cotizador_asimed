import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleplanPage } from './detalleplan.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleplanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleplanPageRoutingModule {}
