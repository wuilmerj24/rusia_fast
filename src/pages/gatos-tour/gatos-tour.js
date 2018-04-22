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
var GatosTourPage = /** @class */ (function () {
    function GatosTourPage(navCtrl, navParams, getDatos) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.gasto = {
            id: -1,
            concepto_gasto_id: [-1, ''],
            Total: '',
            tipo_moneda: '',
            ciudad_id: [-1, ''],
            usuario_id: '',
            observaciones: '',
        };
        this.ver_segmento = true;
        this.cargar = false;
        this.gasto = this.navParams.get('gasto');
        this.ver_segmento = this.navParams.get('ver_segmento');
        console.log(JSON.stringify(this.gasto));
    }
    GatosTourPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GatosTourPage');
    };
    GatosTourPage.prototype.guardar = function () {
        this.cargar = true;
        var self = this;
        var campos = {
            //concepto_gasto_id:this.gasto.concepto_gasto_id[1],
            Total: this.gasto.Total,
            tipo_moneda: this.gasto.tipo_moneda,
            //ciudad_id:this.gasto.,
            //usuario_id:this.gasto.,
            observaciones: this.gasto.observaciones
        };
        //console.log('ID:' + this.evento.id)
        //console.log('usd:' + campos.gasto_usd)
        this.getDatos.write('rusia.gastostoursline', this.gasto.id, campos).then(function (res) {
            console.log('save gastos ok');
            self.cargar = false;
        }, function (fail) {
            console.log('error saving gastos');
        });
    };
    GatosTourPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-gatos-tour',
            templateUrl: 'gatos-tour.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider])
    ], GatosTourPage);
    return GatosTourPage;
}());
export { GatosTourPage };
//# sourceMappingURL=gatos-tour.js.map