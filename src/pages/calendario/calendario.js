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
import { EventoPage } from '../../pages/evento/evento';
/**
 * Generated class for the CalendarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CalendarioPage = /** @class */ (function () {
    function CalendarioPage(navCtrl, navParams, getDatos) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.cargar = true;
        this.viewTitle = '';
        this.calendar = {
            eventSource: [],
            mode: 'month',
            currentDate: new Date(),
            formatDayHeader: 'E',
            noEventsLabel: 'Sin Eventos',
            formatMonthTitle: 'MMMM yyyy',
            allDayLabel: 'Todo el día',
            formatWeekTitle: 'MMMM yyyy, Se $n'
        };
        this.permisos = '';
        this.initCalendario();
    }
    CalendarioPage.prototype.initCalendario = function () {
        var self = this;
        self.cargar = true;
        this.getDatos.cargarCalendario().then(function (permisos) {
            self.permisos = permisos;
            //console.log('permisos ------>'+ self.permisos);
            self.getDatos.ejecutarSQL('SELECT * FROM eventos ORDER BY id DESC').then(function (eventos) {
                console.log('eventos loaded - OK');
                var event_format = [];
                for (var i = 0; i < eventos.rows.length; i++) {
                    var dateStart = new Date(String(eventos.rows.item(i).Fecha_Inicio).replace(' ', 'T'));
                    var hora_ini = eventos.rows.item(i).hora_inicio.split(":"); //<--MAC
                    var hora_fin = eventos.rows.item(i).hora_final.split(":"); //<--MAC
                    //var dateEnd = new Date(String(eventos.rows.item(i).Fecha_Inicio).replace(' ', 'T'));
                    event_format.push({
                        startTime: new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), hora_ini[0], hora_ini[1]),
                        endTime: new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), hora_fin[0], hora_fin[1]),
                        title: eventos.rows.item(i).name,
                        allDay: false,
                        id: eventos.rows.item(i).id
                    });
                }
                self.calendar.eventSource = event_format;
                self.cargar = false;
            }, function (err) {
                console.log('error after create BD');
            });
        }, function (e) {
            console.log('Error en calendario');
            console.log(e);
        });
    };
    CalendarioPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CalendarioPage');
    };
    CalendarioPage.prototype.onViewTitleChanged = function (title) {
        this.viewTitle = title;
    };
    CalendarioPage.prototype.onEventSelected = function (evt) {
        this.navCtrl.push(EventoPage, { evento: evt, permisos: this.permisos });
    };
    CalendarioPage.prototype.refresh = function () {
        var self = this;
        this.getDatos.borrarTablas(["gastostoursline", "eventos"]).then(function (res) {
            self.initCalendario();
        }, function (fail) {
            console.log('Error refresh tables');
        });
    };
    CalendarioPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-calendario',
            templateUrl: 'calendario.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider])
    ], CalendarioPage);
    return CalendarioPage;
}());
export { CalendarioPage };
//# sourceMappingURL=calendario.js.map