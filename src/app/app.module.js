var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//------------------------------------//
//--KEY TOOL PASSWORD: jose.123 -<rusia-fas-key.jks>
//------------------------------------//
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
import { DocumentoPage } from '../pages/documento/documento';
import { SolicitarPage } from '../pages/solicitar/solicitar';
import { SolicitarDetallePage } from '../pages/solicitar-detalle/solicitar-detalle';
import { SolicitarAdminPage } from '../pages/solicitar-admin/solicitar-admin';
import { SolicitarNuevaPage } from '../pages/solicitar-nueva/solicitar-nueva'; //-> borrar si no la piden
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { Base64 } from '@ionic-native/base64';
import { NgCalendarModule } from 'ionic2-calendar';
import { GetDatosProvider } from '../providers/get-datos/get-datos';
import { SQLite } from '@ionic-native/sqlite';
import { TablasProvider } from '../providers/tablas/tablas';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { AutocompleteComponent } from '../components/autocomplete/autocomplete';
import { IOSFilePicker } from '@ionic-native/file-picker';
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
                PanelPage,
                PerfilPage,
                GastosRelPage,
                AutocompleteComponent,
                SolicitarPage,
                SolicitarDetallePage,
                SolicitarAdminPage,
                SolicitarNuevaPage,
                DocumentoPage
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
                GastosRelPage,
                SolicitarPage,
                SolicitarDetallePage,
                SolicitarAdminPage,
                SolicitarNuevaPage,
                DocumentoPage
            ],
            providers: [
                File,
                IOSFilePicker,
                FileOpener,
                FileChooser,
                FilePath,
                Base64,
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