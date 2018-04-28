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
import { DetallesReservaPage } from '../pages/detalles-reserva//detalles-reserva';
import { LoginPage } from '../pages/login/login';
import { EventoPage } from '../pages/evento/evento';
import { GatosTourPage } from '../pages/gatos-tour/gatos-tour';
import { PanelPage } from '../pages/panel/panel';
import { PerfilPage } from '../pages/perfil/perfil';

import { GastosRelPage } from '../pages/gastos-rel/gastos-rel';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';

import { NgCalendarModule } from 'ionic2-calendar';
import { GetDatosProvider } from '../providers/get-datos/get-datos';
import { SQLite } from '@ionic-native/sqlite';
import { TablasProvider } from '../providers/tablas/tablas';

@NgModule({
  declarations: [
    MyApp,
    CalendarioPage,
    ChoferPage,
    ConfiPage,
    GuiaPage,
    GananciasPage,
    ReservasPage,
    AcercaPage,
    DetallesReservaPage,
    LoginPage,
    EventoPage,
    GatosTourPage,
    PanelPage,
    PerfilPage,
    GastosRelPage
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
    AcercaPage,
    DetallesReservaPage,
    LoginPage,
    EventoPage,
    GatosTourPage,
    PanelPage,
    PerfilPage,
    GastosRelPage
  ],
  providers: [ 
    File,   
    SQLite,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GetDatosProvider,
    TablasProvider
  ]
})
export class AppModule {}
