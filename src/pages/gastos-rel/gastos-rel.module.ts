import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GastosRelPage } from './gastos-rel';

@NgModule({
  declarations: [
    GastosRelPage,
  ],
  imports: [
    IonicPageModule.forChild(GastosRelPage),
  ],
})
export class GastosRelPageModule {}
