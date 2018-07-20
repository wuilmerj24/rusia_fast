import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavParams } from 'ionic-angular';

 
import { CalendarioPage } from '../../pages/calendario/calendario';
import { ChoferPage } from '../../pages/chofer/chofer';
import { ConfiPage } from '../../pages/confi/confi';
import { GuiaPage } from '../../pages/guia/guia';
import { GananciasPage } from '../../pages/ganancias/ganancias';
import { ReservasPage } from '../../pages/reservas/reservas';
import { AcercaPage } from '../../pages/acerca/acerca';
import { DetallesReservaPage } from '../../pages/detalles-reserva/detalles-reserva';
import { GatosTourPage } from '../../pages/gatos-tour/gatos-tour';
import { LoginPage } from '../../pages/login/login';
import { PerfilPage } from '../../pages/perfil/perfil';
import { SolicitarPage } from '../../pages/solicitar/solicitar';
import { SolicitarAdminPage } from '../../pages/solicitar-admin/solicitar-admin';

import { GanPage } from '../../pages/gan/gan';


@Component({
  selector: 'page-panel',
  templateUrl: 'panel.html',
})
export class PanelPage {

  @ViewChild(Nav) nav: Nav;

  //rootPage:any = CalendarioPage;
  rootPage:any = ConfiPage;

  pages: any; //Array<{title: string, component: any}>

  constructor(public platform: Platform, public navParams: NavParams) {

    var tipo_usuario = this.navParams.get('usr');

    this.pages = []; 
    console.log('-----------------------------------------------------------------');
    console.log(tipo_usuario);
    console.log('-----------------------------------------------------------------');

    // used for an example of ngFor and navigation
    if("is_chofer" == tipo_usuario){
      this.pages = [
        { title: 'Calendario', component: CalendarioPage },
        { title: 'Solicitar Servicio', component: SolicitarPage },
        { title: 'Mi Perfil', component: PerfilPage },        
        { title: 'Salir', component: 'salir' },
      ];
    } else if("is_guia" == tipo_usuario){
      this.pages = [
        { title: 'Calendario', component: CalendarioPage },
        { title: 'Solicitar Servicio', component: SolicitarPage },
        { title: 'Mi Perfil', component: PerfilPage },
        //{ title: 'Acerca de', component: AcercaPage },
        { title: 'Salir', component: 'salir' },
      ];
    }else if("is_rep" == tipo_usuario){
      this.pages = [
        { title: 'Calendario', component: CalendarioPage },
        { title: 'Mi Perfil', component: PerfilPage },
        //{ title: 'Acerca de', component: AcercaPage },
        { title: 'Salir', component: 'salir' },
      ];
    }else if("is_client" == tipo_usuario){
      this.pages = [
        { title: 'Calendario', component: CalendarioPage },
        { title: 'Mi Perfil', component: PerfilPage },
        //{ title: 'Acerca de', component: AcercaPage },
        { title: 'Salir', component: 'salir' },
      ];
    }else if("is_root" == tipo_usuario){
      this.pages = [
        { title: 'Calendario', component: CalendarioPage },
        //{ title: 'Chofer adjudicado', component: ChoferPage },
        //{ title: 'Guia adjudicado',  component:GuiaPage },        
        //{ title: 'Reservas', component: ReservasPage },
        { title: 'Reservas', component: ReservasPage },
        { title: 'Solicitudes recibidas', component: SolicitarAdminPage },
        
        { title: 'Configuración', component: ConfiPage },
        { title: 'Ganancias', component: GanPage },

        //{ title: 'Gastos Temporal',  component:GatosTourPage },
        { title: 'Mi Perfil', component: PerfilPage },
        //{ title: 'Acerca de', component: AcercaPage },
        { title: 'Salir', component: 'salir' },
      ];
    }else if("is_general" == tipo_usuario){
      this.pages = [
        { title: 'Calendario', component: CalendarioPage },
        { title: 'Solicitudes recibidas', component: SolicitarAdminPage },
        { title: 'Mi Perfil', component: PerfilPage },
        //{ title: 'Acerca de', component: AcercaPage },       
        { title: 'Salir', component: 'salir' },
      ];
    }else if("is_traslados" == tipo_usuario){
      this.pages = [
        { title: 'Calendario', component: CalendarioPage },
        { title: 'Mi Perfil', component: PerfilPage },
        //{ title: 'Acerca de', component: AcercaPage },        
        { title: 'Salir', component: 'salir' },
      ];
    }else {
      this.pages = [
        { title: 'Calendario', component: CalendarioPage },
        { title: 'Mi Perfil', component: PerfilPage },
        //{ title: 'Acerca de', component: AcercaPage },
        { title: 'Salir', component: 'salir' },
      ];
    }
    
 
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component == 'salir'){
      
      this.nav.setRoot(LoginPage, {operacion:'salir'});
    }else{
      this.nav.setRoot(page.component);  
    }
    
  }
}
