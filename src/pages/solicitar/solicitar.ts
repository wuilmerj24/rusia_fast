import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { SolicitarDetallePage } from '../../pages/solicitar-detalle/solicitar-detalle';

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

        var sql = '';
        if(self.getDatos.usr.tipo_usuario == 'is_chofer'){

            sql = 'SELECT * FROM eventos WHERE is_traslado = "true" and is_padre = "false" and chofer_id = "false"  ORDER BY id DESC';

        }else if(self.getDatos.usr.tipo_usuario == 'is_guia'){

            sql = 'SELECT * FROM eventos WHERE is_guia = "true" and is_padre = "false" and guia_id = "false"  ORDER BY id DESC';
        }
        console.log(sql);
		self.getDatos.ejecutarSQL(sql).then(

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
                    var tmp_servicio_id = JSON.parse(evento.servicio_id);

                    //console.log(eventos.rows.item(i).guia_id);
                    
                    //var dateEnd = new Date(String(eventos.rows.item(i).Fecha_Inicio).replace(' ', 'T'));
                    event_format.push({
                        startTime:new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), hora_ini[0], hora_ini[1]),
                        endTime:new Date(dateStart.getFullYear(), dateStart.getMonth(), dateStart.getDate(), hora_fin[0], hora_fin[1]),
                        title:evento.name,
                        guia:tmp_guia_id[1],
                        chofer:tmp_chofer_id[1],
                        tipo_servicio:tmp_servicio_id[1],
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
        
        this.navCtrl.push(SolicitarDetallePage, {evento: evt});
    }

    refresh(){
        var self = this;
        
        self.cargar = true;
        var reload = [true,true,true,true, true, true, true];
        this.getDatos.cargarCalendario(reload).then(
            res=>{
                self.initSolicitar();
            },
            fail=>{
                console.log('Error refresh tables');
            }
        );
    }

}
