import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleplanPageRoutingModule } from './detalleplan-routing.module';

import { DetalleplanPage } from './detalleplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleplanPageRoutingModule
  ],
  declarations: [DetalleplanPage]
})
export class DetalleplanPageModule {}
