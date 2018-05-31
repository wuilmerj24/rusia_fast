import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';

@Component({
  selector: 'page-concep',
  templateUrl: 'concep.html',
})
export class ConcepPage {

	private cargar = true;
	private conceps = [];
	constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {

		this.initConceps();
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad CiudadPage');
	}

	initConceps(){

	    var self = this; 
	    self.conceps = [];
	    self.cargar = true;
	    self.getDatos.search_read('rusia.conceptos.gral',[], ["name"]).then(
	    	function (datos:any[]){
	    		self.conceps = datos;
	    		self.cargar = false;
	    		//console.log(JSON.stringify(datos));
	    	},
	    	fail=>{

	    	}
    	);
	}

}
