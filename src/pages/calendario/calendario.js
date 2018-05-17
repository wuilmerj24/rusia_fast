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
import { EventoPage } from '../../pages/evento/evento';
/**
 * Generated class for the CalendarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//@IonicPage()
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
        this.initCalendario(true);
    }
    CalendarioPage.prototype.initCalendario = function (borrar) {
        var self = this;
        self.cargar = true;
        this.getDatos.cargarCalendario(borrar, borrar, borrar, borrar).then(function (usr) {
            self.usuario = usr;
            var where;
            if (usr.tipo_usuario + '' == 'is_root') {
                where = 'is_padre = "false"';
            }
            else if (usr.tipo_usuario + '' == 'is_client') {
                //dominio = [["Datos_Cliente_id", "=", self.usr.id]];
                where = 'is_padre = "false" and cliente_id_tmp = "' + usr.id + '"';
            }
            else if (usr.tipo_usuario + '' == 'is_guia') { //+ JSON.stringify([usr.id, usr.name]  and guia_id = "[71,"Natalia Kazan"]"
                where = 'is_padre = "false" and guia_id_tmp = "' + usr.id + '"';
                //  console.log(where);
                //dominio = [["guia_id", "=", self.usr.id]];
            }
            else if (usr.tipo_usuario + '' == 'is_chofer') { //+ JSON.stringify([usr.id, usr.name]  and guia_id = "[71,"Natalia Kazan"]"
                where = 'is_padre = "false" and chofer_id_tmp = "' + usr.id + '"';
                //  console.log(where);
                //dominio = [["guia_id", "=", self.usr.id]];
            }
            //console.log()
            self.getDatos.ejecutarSQL('SELECT * FROM eventos WHERE ' + where + '  ORDER BY id DESC').then(function (eventos) {
                console.log('eventos loaded - OK');
                var event_format = [];
                for (var i = 0; i < eventos.rows.length; i++) {
                    var evento = eventos.rows.item(i);
                    var dateStart = new Date(String(evento.Fecha_Inicio).replace(' ', 'T'));
                    var hora_ini = evento.hora_inicio.split(":"); //<--MAC
                    var hora_fin = evento.hora_final.split(":"); //<--MAC
                    var tmp_guia_id = JSON.parse(evento.guia_id);
                    var tmp_chofer_id = JSON.parse(evento.chofer_id);
                    var tmp_servicio_id = JSON.parse(evento.servicio_id);
                    //console.log(eventos.rows.item(i).guia_id);
                    //var dateEnd = new Date(String(eventos.rows.item(i).Fecha_Inicio).replace(' ', 'T'));
                    event_format.push({
                        startTime: new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), hora_ini[0], hora_ini[1]),
                        endTime: new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), hora_fin[0], hora_fin[1]),
                        title: evento.name,
                        guia: tmp_guia_id[1],
                        chofer: tmp_chofer_id[1],
                        tipo_servicio: tmp_servicio_id[1],
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
        this.navCtrl.push(EventoPage, { evento: evt, permisos: this.usuario.tipo_usuario });
    };
    CalendarioPage.prototype.refresh = function () {
        var self = this;
        self.initCalendario(true);
        /*var self = this;
        this.getDatos.borrarTablas(["gastostoursline", "eventos"]).then(
            res=>{
                self.initCalendario();
            },
            fail=>{
                console.log('Error refresh tables');
            }
        );*/
    };
    CalendarioPage = __decorate([
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