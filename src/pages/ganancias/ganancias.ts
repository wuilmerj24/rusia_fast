import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GetDatosProvider } from '../../providers/get-datos/get-datos';

@Component({
  selector: 'page-ganancias',
  templateUrl: 'ganancias.html',
})
export class GananciasPage {

    	private cargar = true;
	private ganancias = [];	
	private items = [];
    private max = 10;
	constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {

		this.init();
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad CiudadPage');
	}

	init(){

	    var self = this; 
	    self.ganancias = [];
	    self.cargar = true;
	    self.getDatos.search_read('rusia.ganancias.totales',[], ["name", "fecha", "tipo_moneda", "monto", "ciudad_id"]).then(
	    	function (datos:any[]){
	    		self.ganancias = datos;
	    		self.initItems();
	    		self.cargar = false;
	    		console.log(JSON.stringify(datos));
	    	},
	    	fail=>{

	    	}
    	);
	}

	private initItems(){

        for (var i = 0; i <  this.ganancias.length && i < this.max; i++) {
            this.items.push(this.ganancias[i]);
        }
    }


	doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        var self = this;
        setTimeout(() => {
          
          let i;
          for (i = self.max; i < this.ganancias.length && i < this.max + 10 ; i++) {
            this.items.push(this.ganancias[i]);
          }
          this.max = i;

          console.log('Async operation has ended');
          infiniteScroll.complete();
        }, 500);
    }

}
