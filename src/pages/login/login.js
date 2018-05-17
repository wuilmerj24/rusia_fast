var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
//import { CalendarioPage } from '../../pages/calendario/calendario';
import { PanelPage } from '../../pages/panel/panel';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, getData) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getData = getData;
        this.cargar = false;
        //guia
        //conexion = {usuario: 'joselugar8@hotmail.com', bd: 'rusia3', pwd: '123456'}; //pruebas
        //conexion = {usuario: 'cupabanoscar@gmail.com', bd: 'rusia3', pwd: '123456'};//produccion 
        //chofer
        //conexion = {usuario: 'anton1985info@gmail.com', bd: 'rusia3', pwd: '123456'};
        //conexion = {usuario: 'reservas@guiarus.com', bd: 'rusia3', pwd: '123456'};//produccion 
        //cliente
        //conexion = {usuario: 'abrilgalvez5@yahoo.com.mx', bd: 'rusia3', pwd: '123456'}; //   pruebas
        //chofer
        //conexion = {usuario: 'chofersanpetersburgo@gmail.com', bd: 'rusia3', pwd: '123456'};  //  prd
        this.conexion = { usuario: '', bd: 'rusia3', pwd: '' };
        var operacion = this.navParams.get('operacion');
        if (operacion != null && operacion == 'salir') {
            this.getData.deleteBD();
            this.getData.usr = null;
        }
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        this.conectarApp();
    };
    LoginPage.prototype.conectarApp = function () {
        var self = this;
        self.cargar = true;
        this.getData.login(this.conexion).then(function (res) {
            self.cargar = false;
            //console.log(JSON.stringify(res));
            self.navCtrl.setRoot(PanelPage, { usr: res });
        }).catch(function (e) {
            //console.log(e.message);
            console.log('error');
            self.cargar = false;
        });
    };
    LoginPage = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map