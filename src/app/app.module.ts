
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

//de configuracion
import { CiudadPage } from '../pages/ciudad/ciudad';
import { UsuarioPage } from '../pages/usuario/usuario';

import { ClientePage } from '../pages/cliente/cliente';
import { TipoPage } from '../pages/tipo/tipo';
import { GastosTPage } from '../pages/gastos-t/gastos-t';
import { GastosEPage } from '../pages/gastos-e/gastos-e';
import { BenePage } from '../pages/bene/bene';
import { ConcepPage } from '../pages/concep/concep';
import { DocPage } from '../pages/doc/doc';

import { CiudadDPage } from '../pages/ciudad-d/ciudad-d';
import { UsuarioDPage } from '../pages/usuario-d/usuario-d';
import { ClienteDPage } from '../pages/cliente-d/cliente-d';
import { TipoDPage } from '../pages/tipo-d/tipo-d';
import { GastosTdPage } from '../pages/gastos-td/gastos-td';
import { GastosEdPage } from '../pages/gastos-ed/gastos-ed';
import { BeneDPage } from '../pages/bene-d/bene-d';
import { ConcepDPage } from '../pages/concep-d/concep-d';
//import { DocPage } from '../pages/doc/doc';

import { FormPage } from '../pages/form/form';



//de ganancias
import {GanPage} from '../pages/gan/gan';
import {GanaDPage} from '../pages/gana-d/gana-d';
import {GananciasPage} from '../pages/ganancias/ganancias';
import {ResumenPage} from '../pages/resumen/resumen';
import {ResumeDPage} from '../pages/resume-d/resume-d';

import {MailPage} from '../pages/mail/mail';

import {GeneralPage} from '../pages/general/general';
import {GeneralDPage} from '../pages/general-d/general-d';

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


@NgModule({
  declarations: [
    MyApp,
    ResumeDPage,
    GanaDPage,
    GeneralDPage,
    MailPage,
    CiudadDPage,
    UsuarioDPage,
    ClienteDPage,
    TipoDPage,
    GastosTdPage,
    GastosEdPage,
    BeneDPage,
    ConcepDPage,
    GanPage,
    ResumenPage,
    GeneralPage,
    CiudadPage,
    UsuarioPage,
    ClientePage,
    TipoPage,
    GastosTPage,
    GastosEPage,
    BenePage,
    ConcepPage,
    DocPage,
    FormPage,
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
    ResumeDPage,
    MailPage,
    GanaDPage,
    GeneralDPage,
    CiudadDPage,
    UsuarioDPage,
    ClienteDPage,
    TipoDPage,
    GastosTdPage,
    GastosEdPage,
    BeneDPage,
    ConcepDPage,
    GanPage,
    ResumenPage,
    GeneralPage,
    CiudadPage,
    UsuarioPage,
    ClientePage,
    TipoPage,
    GastosTPage,
    GastosEPage,
    BenePage,
    ConcepPage,
    DocPage,
    FormPage,
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GetDatosProvider,
    TablasProvider
  ]
})
export class AppModule {}
