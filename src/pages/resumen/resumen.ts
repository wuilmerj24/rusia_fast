import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';

@Component({
  selector: 'page-resumen',
  templateUrl: 'resumen.html',
})
export class ResumenPage {

    private cargar = true;
	private resumen = [];	
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
	    self.resumen = [];
	    self.cargar = true;
	    self.getDatos.search_read('rusia.resumen.movimientos',[], ["concepto_id", "name", "evento_id", "dia", "Total_Pago_Clientes", "Total_Pagado_Web", "Total_Euros", "Total_Usd", "Total_Rub", "Total_Paypal", "Total_Tarjeta", "Total_Representante", "Total_Gastos", "Total_Beneficios", "tarjeta_usd", "tarjeta_rub", "tarjeta_eur", "gasto_rub", "gasto_usd", "gasto_eur", "gasto_paypal", "tarjeta_usd_pos", "tarjeta_eur_pos"]).then(
	    	function (datos:any[]){
	    		self.resumen = datos;
	    		self.initItems();
	    		self.cargar = false;
	    		console.log(JSON.stringify(datos));
	    	},
	    	fail=>{

	    	}
    	);
	}

	private initItems(){

        for (var i = 0; i <  this.resumen.length && i < this.max; i++) {
            this.items.push(this.resumen[i]);
        }
    }


	doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        var self = this;
        setTimeout(() => {
          
          let i;
          for (i = self.max; i < this.resumen.length && i < this.max + 10 ; i++) {
            this.items.push(this.resumen[i]);
          }
          this.max = i;

          console.log('Async operation has ended');
          infiniteScroll.complete();
        }, 500);
    }

}
