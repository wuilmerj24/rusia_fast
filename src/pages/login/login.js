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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
//import { CalendarioPage } from '../../pages/calendario/calendario';
import { PanelPage } from '../../pages/panel/panel';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    //admin
    //conexion = {usuario: 'jdmas@maui.com.mx', bd: 'rusia3', pwd: 'rusia@2018'};
    //cliente
    //conexion = {usuario: 'denisepirowicz@hotmail.com', bd: 'rusia3', pwd: '123456'};
    function LoginPage(navCtrl, navParams, getData) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getData = getData;
        this.cargar = false;
        //guia
        this.conexion = { usuario: 'alekseevadar@gmail.com', bd: 'rusia3', pwd: '123456' };
        var operacion = this.navParams.get('operacion');
        if (operacion != null && operacion == 'salir') {
            this.getData.deleteBD();
        }
        else {
            if (this.conexion.usuario != "") {
                this.conectarApp();
            }
        }
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.conectarApp = function () {
        var self = this;
        self.cargar = true;
        this.getData.login(this.conexion).then(function (res) {
            self.cargar = false;
            self.navCtrl.setRoot(PanelPage, { usr: res });
        }).catch(function (e) {
            console.log(e.message);
            console.log('error');
        });
    };
    LoginPage = __decorate([
        IonicPage(),
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