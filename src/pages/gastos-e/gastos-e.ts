import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';

@Component({
  selector: 'page-gastos-e',
  templateUrl: 'gastos-e.html',
})
export class GastosEPage {

  	private cargar = true;
	private gastos = [];	
	private items = [];
    private max = 10;
	constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {

		this.initGastos();
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad CiudadPage');
	}

	initGastos(){

	    var self = this; 
	    self.gastos = [];
	    self.cargar = true;
	    self.getDatos.search_read('rusia.gastos.extras',[], ["name", "fecha", "tipo_moneda", "monto", "ciudad_id", "cancelado"]).then(
	    	function (datos:any[]){
	    		self.gastos = datos;
	    		self.initItems();
	    		self.cargar = false;
	    		console.log(JSON.stringify(datos));
	    	},
	    	fail=>{

	    	}
    	);
	}

	private initItems(){

        for (var i = 0; i <  this.gastos.length && i < this.max; i++) {
            this.items.push(this.gastos[i]);
        }
    }


	doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        var self = this;
        setTimeout(() => {
          
          let i;
          for (i = self.max; i < this.gastos.length && i < this.max + 10 ; i++) {
            this.items.push(this.gastos[i]);
          }
          this.max = i;

          console.log('Async operation has ended');
          infiniteScroll.complete();
        }, 500);
    }

}
