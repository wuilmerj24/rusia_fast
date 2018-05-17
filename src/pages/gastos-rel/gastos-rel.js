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
var GastosRelPage = /** @class */ (function () {
    function GastosRelPage(navCtrl, navParams, getData) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getData = getData;
        this.ver_negativos = true;
        this.gastos_rel = this.navParams.get('gastos_rel');
        console.log(this.getData.usr.tipo_usuario);
        if (this.getData.usr.tipo_usuario == "is_client") {
            this.ver_negativos = false;
        }
        console.log(this.gastos_rel);
    }
    GastosRelPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad GastosRelPage');
    };
    GastosRelPage = __decorate([
        Component({
            selector: 'page-gastos-rel',
            templateUrl: 'gastos-rel.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider])
    ], GastosRelPage);
    return GastosRelPage;
}());
export { GastosRelPage };
//# sourceMappingURL=gastos-rel.js.map