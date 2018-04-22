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

@Component({
  selector: 'page-reservas',
  templateUrl: 'reservas.html',
})
export class ReservasPage {


	reservas = [];
	constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider, public modalCtrl: ModalController) {
		
		var self = this; 
        //WHERE is_padre = "true"
		this.getDatos.ejecutarSQL('SELECT * FROM eventos_root ORDER BY id DESC').then(

			function(data:{rows}){

				for(var i=0; i<data.rows.length; i++) {
                    
                    self.reservas.push(data.rows.item(i));                    
                }
			},
			function(){
				console.log('Error Reservas');
			}
		);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ReservasPage');
	}

	private abrir_reserva(reserva){
		var self = this;
        let profileModal = this.modalCtrl.create(DetallesReservaPage, {reserva:reserva});
        profileModal.onDidDismiss(data => {
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
	}

}
