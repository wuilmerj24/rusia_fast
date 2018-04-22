import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GatosTourPage } from './gatos-tour';

@NgModule({
  declarations: [
    GatosTourPage,
  ],
  imports: [
    IonicPageModule.forChild(GatosTourPage),
  ],
})
export class GatosTourPageModule {}
