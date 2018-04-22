var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgCalendarModule } from 'ionic2-calendar';
import { GetDatosProvider } from '../providers/get-datos/get-datos';
import { SQLite } from '@ionic-native/sqlite';
import { TablasProvider } from '../providers/tablas/tablas';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
                PanelPage
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
                PanelPage
            ],
            providers: [
                SQLite,
                StatusBar,
                SplashScreen,
                { provide: ErrorHandler, useClass: IonicErrorHandler },
                GetDatosProvider,
                TablasProvider
            ]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map