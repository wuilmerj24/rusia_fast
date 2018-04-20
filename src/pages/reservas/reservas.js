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
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { DetallesReservaPage } from '../../pages/detalles-reserva/detalles-reserva';
/**
 * Generated class for the ReservasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ReservasPage = /** @class */ (function () {
    function ReservasPage(navCtrl, navParams, getDatos, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.modalCtrl = modalCtrl;
        this.reservas = [];
        var self = this;
        //WHERE is_padre = "true"
        this.getDatos.getTable('SELECT * FROM eventos_root ORDER BY id DESC').then(function (data) {
            for (var i = 0; i < data.rows.length; i++) {
                self.reservas.push(data.rows.item(i));
            }
        }, function () {
            console.log('Error Reservas');
        });
    }
    ReservasPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ReservasPage');
    };
    ReservasPage.prototype.abrir_reserva = function (reserva) {
        var self = this;
        var profileModal = this.modalCtrl.create(DetallesReservaPage, { reserva: reserva });
        profileModal.onDidDismiss(function (data) {
            if (data != null) {
                //if (data.nuevo == true) {
                /*var dateStart = new Date(String((data).date_begin).replace(' ', 'T'));
                var dateEnd = new Date(String((data).date_end).replace(' ', 'T'));
                var startTime = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), dateStart.getHours(), dateStart.getMinutes());
                var endTime = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate(), dateEnd.getHours(), dateEnd.getMinutes());
                data.startTime = startTime;
                data.endTime = endTime;

                console.log(data);
                
                self.storage.get('guia').then((guia) => {

                    guia.push(data);
                    self.storage.set('guia', guia).then((val) => {
                        self.cargarSinDatos();
                    })

                });          */
                //self.cargarConDatos(false);
                //}
            }
        });
        profileModal.present();
    };
    ReservasPage = __decorate([
        Component({
            selector: 'page-reservas',
            templateUrl: 'reservas.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider, ModalController])
    ], ReservasPage);
    return ReservasPage;
}());
export { ReservasPage };
//# sourceMappingURL=reservas.js.map