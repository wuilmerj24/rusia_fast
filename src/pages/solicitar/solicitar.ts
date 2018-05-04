import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';

@Component({
  selector: 'page-solicitar',
  templateUrl: 'solicitar.html',
})
export class SolicitarPage {

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

    usuario;

	constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {
		this.initSolicitar();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SolicitarPage');
	}

	private initSolicitar(){

			//["is_padre", "=", false],
			//["is_guia", "=", true],
			//["guia_id", "=", false]]
		var self = this;	
		self.cargar = true;		
		self.getDatos.ejecutarSQL('SELECT * FROM eventos WHERE is_guia = "true" and is_padre = "false" and guia_id = "false"  ORDER BY id DESC').then(

              function(eventos: {rows}){
                console.log('eventos loaded - OK');
                var event_format = [];

                for(var i=0; i<eventos.rows.length; i++) {
                    
                    var evento = eventos.rows.item(i);
                    var dateStart = new Date(String(evento.Fecha_Inicio).replace(' ', 'T'));
                    var hora_ini = evento.hora_inicio.split(":") //<--MAC
                    var hora_fin = evento.hora_final.split(":") //<--MAC

                    var tmp_guia_id = JSON.parse(evento.guia_id);
                    var tmp_chofer_id = JSON.parse(evento.chofer_id);

                    //console.log(eventos.rows.item(i).guia_id);
                    
                    //var dateEnd = new Date(String(eventos.rows.item(i).Fecha_Inicio).replace(' ', 'T'));
                    event_format.push({
                        startTime:new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), hora_ini[0], hora_ini[1]),
                        endTime:new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), hora_fin[0], hora_fin[1]),
                        title:evento.name,
                        guia:tmp_guia_id[1],
                        chofer:tmp_chofer_id[1],
                        allDay:false,
                        id:eventos.rows.item(i).id
                    });
                }                  
                self.calendar.eventSource = event_format;
                self.cargar = false;
              },
              err =>{
                console.log('error after create BD');
              }
            ); 
	}

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onEventSelected(evt) {
        
        //this.navCtrl.push(EventoPage, {evento: evt, permisos:this.usuario.tipo_usuario});
    }

    refresh(){
        //var self = this;
        //self.initCalendario();
        /*var self = this;
        this.getDatos.borrarTablas(["gastostoursline", "eventos"]).then(
            res=>{
                self.initCalendario();
            },
            fail=>{
                console.log('Error refresh tables');
            }
        );*/
    }

}
