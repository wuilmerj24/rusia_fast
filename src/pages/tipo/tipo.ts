import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GetDatosProvider } from '../../providers/get-datos/get-datos';

@Component({
  selector: 'page-tipo',
  templateUrl: 'tipo.html',
})
export class TipoPage {

  	private cargar = true;
	private tipos = [];	
	private items = [];
    private max = 10;
	constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {

		this.initTipos();
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad CiudadPage');
	}

	initTipos(){

	    var self = this; 
	    self.tipos = [];
	    self.cargar = true;
	    self.getDatos.search_read('rusia.tiposervicios',[], ["ciudad_id", "name", "Code", "Hora_Inicio", "Hora_Finalizar"]).then(
	    	function (datos:any[]){
	    		self.tipos = datos;
	    		self.initItems();
	    		self.cargar = false;
	    		console.log(JSON.stringify(datos));
	    	},
	    	fail=>{

	    	}
    	);
	}

	private initItems(){

        for (var i = 0; i <  this.tipos.length && i < this.max; i++) {
            this.items.push(this.tipos[i]);
        }
    }


	doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        var self = this;
        setTimeout(() => {
          
          let i;
          for (i = self.max; i < this.tipos.length && i < this.max + 10 ; i++) {
            this.items.push(this.tipos[i]);
          }
          this.max = i;

          console.log('Async operation has ended');
          infiniteScroll.complete();
        }, 500);
    }

}
