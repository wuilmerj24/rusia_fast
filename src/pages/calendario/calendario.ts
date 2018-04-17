import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos'
/**
 * Generated class for the CalendarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendario',
  templateUrl: 'calendario.html',
})
export class CalendarioPage {

    cargar = true;
    viewTitle = '';
    calendar = {
        eventSource: [],
        mode: 'month',
        currentDate: new Date(),
        formatDayHeader: 'E',
        noEventsLabel: 'Sin Eventos',
        formatMonthTitle: 'MMMM yyyy',
        allDayLabel: 'Todo el día',
        formatWeekTitle: 'MMMM yyyy, Se $n'
    };
    constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {

        var self = this;
        this.getDatos.crearBD().then(
           function(eventos) {
               console.log('OK!');
               //console.log(eventos);

                /*for (var key in guia) {
                    var dateStart = new Date(String((guia[key]).date_begin).replace(' ', 'T'));
                    var dateEnd = new Date(String((guia[key]).date_end).replace(' ', 'T'));
                    var startTime = new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), dateStart.getHours(), dateStart.getMinutes());
                    var endTime = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate(), dateEnd.getHours(), dateEnd.getMinutes());
                    guia[key].startTime = startTime;
                    guia[key].endTime = endTime;
                    guia[key].title = (guia[key]).tour_id[1];
                    //guia[key].title = 'cualquiercosa';
                    guia[key].allDay = false;
                    guia[key].reservas = [];
                    guia[key].futuras = [];
                    guia[key].guia_id = guia[key].guia_id ? guia[key].guia_id : '';
                    guia[key].observaciones = guia[key].observaciones ? guia[key].observaciones : '';
                    guia[key].no_editable = self.add;

                    ids.push(guia[key].id);
                }*/
               var event_format = [];

                for(var i=0; i<eventos.rows.length; i++) {
                    
                    var dateStart = new Date(String(eventos.rows.item(i).Fecha_Inicio).replace(' ', 'T'));
                    var hora_ini = eventos.rows.item(i).hora_inicio.split(":") //<--MAC
                    var hora_fin = eventos.rows.item(i).hora_final.split(":") //<--MAC
                    
                    //var dateEnd = new Date(String(eventos.rows.item(i).Fecha_Inicio).replace(' ', 'T'));
                    event_format.push({
                        startTime:new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), hora_ini[0], hora_ini[1]),
                        endTime:new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), hora_fin[0], hora_fin[1]),
                        title:eventos.rows.item(i).name,
                        allDay:false
                    });
                }
                self.calendar.eventSource = event_format;
                self.cargar = false;
           },
           function(e){
               console.log('Error en calendario');
               //console.log(e);
           });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CalendarioPage');
    }
    onViewTitleChanged(title) {
        this.viewTitle = title;
    }


}
