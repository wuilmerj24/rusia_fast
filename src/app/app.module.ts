import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { CalendarioPage } from '../pages/calendario/calendario';
import { ChoferPage } from '../pages/chofer/chofer';
import { ConfiPage } from '../pages/confi/confi';
import { GuiaPage } from '../pages/guia/guia';
import { GananciasPage } from '../pages/ganancias/ganancias';
import { ReservasPage } from '../pages/reservas/reservas';
import { AcercaPage } from '../pages/acerca/acerca';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgCalendarModule } from 'ionic2-calendar';
import { GetDatosProvider } from '../providers/get-datos/get-datos';
import { SQLite } from '@ionic-native/sqlite';

@NgModule({
  declarations: [
    MyApp,
    CalendarioPage,
    ChoferPage,
    ConfiPage,
    GuiaPage,
    GananciasPage,
    ReservasPage,
    AcercaPage
  ],
  imports: [
    BrowserModule,
    NgCalendarModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CalendarioPage,
    ChoferPage,
    ConfiPage,
    GuiaPage,
    GananciasPage,
    ReservasPage,
    AcercaPage
  ],
  providers: [
    SQLite,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GetDatosProvider
  ]
})
export class AppModule {}
