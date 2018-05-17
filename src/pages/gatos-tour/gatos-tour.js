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
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
var GatosTourPage = /** @class */ (function () {
    function GatosTourPage(viewCtrl, navCtrl, navParams, getDatos) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.ver_segmento = true;
        this.cargar = false;
        this.gastostours = [];
        this.clientes = [];
        this.usuario_id = false;
        this.default = [];
        this.prueba = 'hola mundo';
        this.gasto = this.navParams.get('gasto');
        //console.log(this.gasto.usuario_id);
        this.default = this.gasto.usuario_id;
        console.log(JSON.stringify(this.gasto));
        if (this.default.length > 0) {
            this.usuario_id = this.default[0];
        }
        this.ver_segmento = this.navParams.get('ver_segmento');
        this.gastostours = this.navParams.get('lista_gastos');
        this.initGatos();
    }
    GatosTourPage.prototype.initGatos = function () {
        var self = this;
        self.cargar = true;
        self.getDatos.ejecutarSQL('SELECT id, name FROM user').then(function (user) {
            //self.clientes = user.rows;
            for (var i = 0; i < user.rows.length; i++) {
                self.clientes.push(user.rows.item(i));
            }
            //console.log(JSON.stringify(self.clientes));
            self.cargar = false;
        }, function (fail) {
        });
    };
    GatosTourPage.prototype.seleccionCliente = function (usuario_id) {
        this.usuario_id = usuario_id;
        console.log('selecccione el id' + this.usuario_id);
    };
    GatosTourPage.prototype.closeModal = function (dato) {
        if (dato == 'x') {
            this.viewCtrl.dismiss('x');
        }
        else {
            this.viewCtrl.dismiss(dato);
        }
    };
    GatosTourPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GatosTourPage');
    };
    GatosTourPage.prototype.guardar = function () {
        this.cargar = true;
        var self = this;
        var campos;
        if (this.gasto.id == null) { // nuevo
            campos = {
                concepto_gasto_id: self.gasto.concepto_gasto_id[0],
                Total: self.gasto.Total,
                tipo_moneda: self.gasto.tipo_moneda,
                ciudad_id: self.gasto.ciudad_id[0],
                //usuario_id:83,
                observaciones: self.gasto.observaciones,
                eventos_id: self.gasto.eventos_id,
                fecha: self.getDatos.convertirFecha(new Date(self.gasto.fecha)),
                evento_padre: self.gasto.evento_padre,
                usuario_id: self.usuario_id
            };
            self.closeModal(campos);
        }
        else {
            campos = {
                concepto_gasto_id: self.gasto.concepto_gasto_id[0],
                Total: self.gasto.Total,
                tipo_moneda: self.gasto.tipo_moneda,
                ciudad_id: self.gasto.ciudad_id[0],
                //usuario_id:83,
                observaciones: self.gasto.observaciones,
                eventos_id: self.gasto.eventos_id,
                fecha: self.getDatos.convertirFecha(new Date(self.gasto.fecha)),
                evento_padre: self.gasto.evento_padre,
                usuario_id: self.usuario_id
            };
            self.closeModal(campos);
        }
    };
    GatosTourPage.prototype.eliminar = function () {
        this.cargar = true;
        var self = this;
        if (self.gasto.id != null) { // nuevo		
            console.log('self.gasto.id ' + self.gasto.id);
            self.getDatos.eliminar('rusia.gastostoursline', self.gasto.id).then(function (res) {
                console.log('delete gastos ok:' + res);
                //self.cargar = false;
                self.closeModal(res);
            }, function (fail) {
                console.log('error create gastos');
            });
        }
    };
    GatosTourPage = __decorate([
        Component({
            selector: 'page-gatos-tour',
            templateUrl: 'gatos-tour.html',
        }),
        __metadata("design:paramtypes", [ViewController, NavController, NavParams, GetDatosProvider])
    ], GatosTourPage);
    return GatosTourPage;
}());
export { GatosTourPage };
//# sourceMappingURL=gatos-tour.js.map