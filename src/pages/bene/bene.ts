import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';

@Component({
  selector: 'page-bene',
  templateUrl: 'bene.html',
})
export class BenePage {

  	private cargar = true;
	private benef = [];	
	private items = [];
    private max = 10;
	constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {

		this.initBenef();
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad CiudadPage');
	}

	initBenef(){

	    var self = this; 
	    self.benef = [];
	    self.cargar = true;
	    self.getDatos.search_read('rusia.beneficios',[], ["name", "fecha", "tipo_moneda", "monto", "ciudad_id", "cancelado"]).then(
	    	function (datos:any[]){
	    		self.benef = datos;
	    		self.initItems();
	    		self.cargar = false;
	    		console.log(JSON.stringify(datos));
	    	},
	    	fail=>{

	    	}
    	);
	}

	private initItems(){

        for (var i = 0; i <  this.benef.length && i < this.max; i++) {
            this.items.push(this.benef[i]);
        }
    }


	doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        var self = this;
        setTimeout(() => {
          
          let i;
          for (i = self.max; i < this.benef.length && i < this.max + 10 ; i++) {
            this.items.push(this.benef[i]);
          }
          this.max = i;

          console.log('Async operation has ended');
          infiniteScroll.complete();
        }, 500);
    }

}
