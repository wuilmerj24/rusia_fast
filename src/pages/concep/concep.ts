import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { ConcepDPage } from '../../pages/concep-d/concep-d';

@Component({
  selector: 'page-concep',
  templateUrl: 'concep.html',
})
export class ConcepPage {

	private cargar = true;
	private conceps = [];
	constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider, public modalCtrl: ModalController) {

		this.init();
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad CiudadPage');
	}

	init(){

	    var self = this; 
	    self.conceps = [];
	    self.cargar = true;
	    self.getDatos.search_read('rusia.conceptos.gral',[], ["name", "ciudades"]).then(
	    	function (datos:any[]){
	    		self.conceps = datos;
	    		self.cargar = false;
	    		//console.log(JSON.stringify(datos));
	    	},
	    	fail=>{

	    	}
    	);
	}

	abrir(item){

		var self = this;
        let profileModal = this.modalCtrl.create(ConcepDPage, {item:item});
        profileModal.onDidDismiss(data => {
            if (data.id != null) {

                self.init();
            }
        });
        profileModal.present();
	}

	add(){

		var self = this;
        let profileModal = this.modalCtrl.create(ConcepDPage, {item:false});
        profileModal.onDidDismiss(data => {
            if (data.id != null) {

                self.init();
            }
        });
        profileModal.present();
	}

}
