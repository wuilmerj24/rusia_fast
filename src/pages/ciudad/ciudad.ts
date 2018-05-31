import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';

@Component({
  selector: 'page-ciudad',
  templateUrl: 'ciudad.html',
})
export class CiudadPage {

	private cargar = true;
	private ciudades = [];
	constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {

		this.initCiudades();
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad CiudadPage');
	}

	initCiudades(){

	    var self = this; 
	    self.ciudades = [];
	    self.cargar = true;
	    self.getDatos.search_read('rusia.ciudades',[], ["name", "Tel_Emergency", "Code"]).then(
	    	function (datos:any[]){
	    		self.ciudades = datos;
	    		self.cargar = false;
	    		//console.log(JSON.stringify(datos));
	    	},
	    	fail=>{

	    	}
    	);
	}

}
