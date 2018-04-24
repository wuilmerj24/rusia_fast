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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
var GatosTourPage = /** @class */ (function () {
    function GatosTourPage(viewCtrl, navCtrl, navParams, getDatos) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.gasto = {
            id: -1,
            concepto_gasto_id: [],
            Total: '',
            tipo_moneda: '',
            ciudad_id: [],
            usuario_id: [],
            observaciones: '',
            evento_padre: '',
            eventos_id: -1,
            fecha: ''
        };
        this.ver_segmento = true;
        this.cargar = false;
        this.ban_nuevo = false;
        var tmp_gasto = this.navParams.get('gasto');
        this.eventos_id = this.navParams.get('eventos_id');
        if (tmp_gasto == null) {
            this.ban_nuevo = true;
            this.gasto.fecha = new Date().toISOString();
        }
        else {
            this.gasto = this.navParams.get('gasto');
        }
        this.ver_segmento = this.navParams.get('ver_segmento');
        console.log(JSON.stringify(this.gasto));
    }
    GatosTourPage.prototype.closeModal = function (x) {
        if (x == 'x') {
            this.viewCtrl.dismiss(null);
        }
        else {
            this.viewCtrl.dismiss(x);
        }
    };
    GatosTourPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GatosTourPage');
    };
    GatosTourPage.prototype.guardar = function () {
        this.cargar = true;
        var self = this;
        var campos;
        if (this.ban_nuevo) {
            campos = {
                concepto_gasto_id: self.gasto.concepto_gasto_id[0],
                Total: self.gasto.Total,
                tipo_moneda: self.gasto.tipo_moneda,
                ciudad_id: self.gasto.ciudad_id[1],
                //usuario_id:83,
                observaciones: self.gasto.observaciones,
                eventos_id: self.eventos_id,
                fecha: self.getDatos.convertirFecha(new Date(self.gasto.fecha))
            };
            console.log(JSON.stringify(self.gasto.concepto_gasto_id));
            console.log(JSON.stringify(self.gasto.ciudad_id));
            console.log(JSON.stringify(campos));
            /*self.getDatos.create('rusia.gastostoursline', campos).then(
                res=>{
                    console.log('create gastos ok:' + res);
                    //self.cargar = false;
                    self.closeModal(res);
                },
                fail=>{
                    console.log('error create gastos');
                }

            );*/
        }
        else {
            campos = {
                concepto_gasto_id: self.gasto.concepto_gasto_id[0],
                Total: self.gasto.Total,
                tipo_moneda: self.gasto.tipo_moneda,
                ciudad_id: 3,
                //usuario_id:this.gasto.,
                observaciones: self.gasto.observaciones,
                eventos_id: self.eventos_id
            };
            /*self.getDatos.write('rusia.gastostoursline', self.gasto.id, campos).then(
                res=>{
                    console.log('write gastos ok');
                    self.cargar = false;
                },
                fail=>{
                    console.log('error writing gastos');
                }

            );*/
        }
    };
    GatosTourPage = __decorate([
        IonicPage(),
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