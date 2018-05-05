import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';

@Component({
  selector: 'page-solicitar-admin',
  templateUrl: 'solicitar-admin.html',
})
export class SolicitarAdminPage {

	private solicitudes = [];
  private cargar = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {

  	this.initSolicitar();
  }

  private initSolicitar(){

    var self = this; 
    self.solicitudes = [];
    self.cargar = true;
    this.getDatos.ejecutarSQL('SELECT * FROM solicitud ORDER BY id DESC').then(

      function(solicitudes:{rows}){

        for(var i=0; i<solicitudes.rows.length; i++) {

            var solicitud = solicitudes.rows.item(i);
            //console.log(JSON.stringify(solicitud))
            //var tmp_evento_id = JSON.parse(evento.evento_id);
            //var tmp_cliente_id = JSON.parse(evento.cliente_id);
            //var tmp_representante_id = JSON.parse(evento.representante_id);
            var tmp_servicio_id = JSON.parse(solicitud.servicio_id);
            var tmp_usuario_id = JSON.parse(solicitud.usuario_id);
            var tmp_name = JSON.parse(solicitud.name);
            var tmp_ciudad_id = JSON.parse(solicitud.ciudad_id);


            solicitud = solicitud;
            //evento.evento_id = tmp_evento_id;
            //evento.cliente_id = tmp_cliente_id;
            //evento.representante_id = tmp_representante_id;
            solicitud.servicio_id = tmp_servicio_id;
            solicitud.usuario_id = tmp_usuario_id;
            solicitud.name = tmp_name;
            solicitud.ciudad_id = tmp_ciudad_id;
            
            self.solicitudes.push(solicitud);                    
        }
        self.cargar = false;
      },
      function(){
        console.log('Error Reservas');
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicitarAdminPage');
  }
  
  private async crearSolicitud(solicitud){

    this.cargar = true;
    var self = this;            
    if(solicitud.id != null){ // nuevo    
      
      console.log('solicitud ' +  solicitud.id );
      try{

        await self.getDatos.call('rusia.solicitud.eventos', 'get_aceptar', [solicitud.id]);
        await self.getDatos.cargarSolicitudes(true);
        self.initSolicitar();
        //self.cargar = false;

      }catch(e){

        console.log('error en aceptar');
        self.cargar = false;
      }
    }

  }

  private async borrarSolicitud(solicitud){

    this.cargar = true;
    var self = this;            
    if(solicitud.id != null){ // nuevo    
      
      console.log('solicitud ' +  solicitud.id );
      try{

        await self.getDatos.call('rusia.solicitud.eventos', 'get_rechazar', [solicitud.id]);
        await self.getDatos.cargarSolicitudes(true);
        self.initSolicitar();
        //self.cargar = false;

      }catch(e){

        console.log('error en rechazar');
        self.cargar = false;
      }
    }

  }

}
