var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavParams } from 'ionic-angular';
import { CalendarioPage } from '../../pages/calendario/calendario';
import { ConfiPage } from '../../pages/confi/confi';
import { ReservasPage } from '../../pages/reservas/reservas';
import { GatosTourPage } from '../../pages/gatos-tour/gatos-tour';
import { LoginPage } from '../../pages/login/login';
import { PerfilPage } from '../../pages/perfil/perfil';
import { SolicitarPage } from '../../pages/solicitar/solicitar';
import { SolicitarAdminPage } from '../../pages/solicitar-admin/solicitar-admin';
var PanelPage = /** @class */ (function () {
    function PanelPage(platform, navParams) {
        this.platform = platform;
        this.navParams = navParams;
        this.rootPage = CalendarioPage;
        var tipo_usuario = this.navParams.get('usr');
        this.pages = [];
        console.log('-----------------------------------------------------------------');
        console.log(tipo_usuario);
        console.log('-----------------------------------------------------------------');
        // used for an example of ngFor and navigation
        if ("is_chofer" == tipo_usuario) {
            this.pages = [
                { title: 'Calendario', component: CalendarioPage },
                { title: 'Solicitar Servicio', component: SolicitarPage },
                { title: 'Mi Perfil', component: PerfilPage },
                { title: 'Salir', component: 'salir' },
            ];
        }
        else if ("is_guia" == tipo_usuario) {
            this.pages = [
                { title: 'Calendario', component: CalendarioPage },
                { title: 'Solicitar Servicio', component: SolicitarPage },
                { title: 'Mi Perfil', component: PerfilPage },
                //{ title: 'Acerca de', component: AcercaPage },
                { title: 'Salir', component: 'salir' },
            ];
        }
        else if ("is_rep" == tipo_usuario) {
            this.pages = [
                { title: 'Calendario', component: CalendarioPage },
                { title: 'Mi Perfil', component: PerfilPage },
                //{ title: 'Acerca de', component: AcercaPage },
                { title: 'Salir', component: 'salir' },
            ];
        }
        else if ("is_client" == tipo_usuario) {
            this.pages = [
                { title: 'Calendario', component: CalendarioPage },
                { title: 'Mi Perfil', component: PerfilPage },
                //{ title: 'Acerca de', component: AcercaPage },
                { title: 'Salir', component: 'salir' },
            ];
        }
        else if ("is_root" == tipo_usuario) {
            this.pages = [
                { title: 'Calendario', component: CalendarioPage },
                //{ title: 'Chofer adjudicado', component: ChoferPage },
                //{ title: 'Guia adjudicado',  component:GuiaPage },        
                //{ title: 'Reservas', component: ReservasPage },
                { title: 'Reservas', component: ReservasPage },
                { title: 'Solicitudes recibidas', component: SolicitarAdminPage },
                { title: 'Configuración', component: ConfiPage },
                { title: 'Gastos Temporal', component: GatosTourPage },
                { title: 'Mi Perfil', component: PerfilPage },
                //{ title: 'Acerca de', component: AcercaPage },
                { title: 'Salir', component: 'salir' },
            ];
        }
        else if ("is_general" == tipo_usuario) {
            this.pages = [
                { title: 'Calendario', component: CalendarioPage },
                { title: 'Mi Perfil', component: PerfilPage },
                //{ title: 'Acerca de', component: AcercaPage },       
                { title: 'Salir', component: 'salir' },
            ];
        }
        else if ("is_traslados" == tipo_usuario) {
            this.pages = [
                { title: 'Calendario', component: CalendarioPage },
                { title: 'Mi Perfil', component: PerfilPage },
                //{ title: 'Acerca de', component: AcercaPage },        
                { title: 'Salir', component: 'salir' },
            ];
        }
        else {
            this.pages = [
                { title: 'Calendario', component: CalendarioPage },
                { title: 'Mi Perfil', component: PerfilPage },
                //{ title: 'Acerca de', component: AcercaPage },
                { title: 'Salir', component: 'salir' },
            ];
        }
    }
    PanelPage.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.component == 'salir') {
            this.nav.setRoot(LoginPage, { operacion: 'salir' });
        }
        else {
            this.nav.setRoot(page.component);
        }
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], PanelPage.prototype, "nav", void 0);
    PanelPage = __decorate([
        Component({
            selector: 'page-panel',
            templateUrl: 'panel.html',
        }),
        __metadata("design:paramtypes", [Platform, NavParams])
    ], PanelPage);
    return PanelPage;
}());
export { PanelPage };
//# sourceMappingURL=panel.js.map