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
/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PerfilPage = /** @class */ (function () {
    function PerfilPage(navCtrl, navParams, getDatos) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.user = {
            name: '',
            login: '',
            email: '',
            is_correo: '',
            phone: '',
            mobile: '',
            tipo_usuario: '',
            fax: '',
            gastos_users_ids: null
        };
        this.cargar = true;
        this.mostrar = false;
        this.gastostoursline_ids = [];
        this.initPerfil();
    }
    PerfilPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PerfilPage');
    };
    PerfilPage.prototype.initPerfil = function () {
        var self = this;
        self.cargar = true;
        self.gastostoursline_ids = [];
        self.getDatos.ejecutarSQL("SELECT * FROM user WHERE usuario IS NOT NULL").then(function (data) {
            self.user = data.rows.item(0);
            //console.log(JSON.stringify(data.rows.item(0)));
            if (self.user.tipo_usuario != "is_cliente") {
                var gastos_users_ids = JSON.parse(self.user.gastos_users_ids);
                if (gastos_users_ids.length > 0) {
                    var where = '(';
                    Object.keys(gastos_users_ids).forEach(function (key) {
                        where = where + gastos_users_ids[key] + ',';
                    });
                    where = where.replace(/.$/, ')');
                    console.log('SELECT * FROM gastostoursline WHERE id IN ' + where);
                    self.getDatos.ejecutarSQL('SELECT * FROM gastostoursline WHERE id IN ' + where).then(function (gastos) {
                        for (var i = 0; i < gastos.rows.length; i++) {
                            //                    	
                            var tmp_concepto_gasto_id = JSON.parse(gastos.rows.item(i).concepto_gasto_id);
                            var tmp_ciudad_id = JSON.parse(gastos.rows.item(i).ciudad_id);
                            var concepto = gastos.rows.item(i);
                            concepto.concepto_gasto_id = tmp_concepto_gasto_id;
                            concepto.ciudad_id = tmp_ciudad_id;
                            self.gastostoursline_ids.push(concepto);
                        }
                        console.log(JSON.stringify(self.gastostoursline_ids));
                        self.cargar = false;
                        self.mostrar = true;
                    }, function (fail) {
                        console.log('Fail load gastos');
                    });
                }
                else {
                    self.cargar = false;
                }
            }
            else {
                self.cargar = false;
            }
        }, function () {
            console.log('Error get table user');
        });
    };
    PerfilPage = __decorate([
        Component({
            selector: 'page-perfil',
            templateUrl: 'perfil.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider])
    ], PerfilPage);
    return PerfilPage;
}());
export { PerfilPage };
//# sourceMappingURL=perfil.js.map