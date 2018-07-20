import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GetDatosProvider } from '../../providers/get-datos/get-datos';

@Component({
  selector: 'page-general',
  templateUrl: 'general.html',
})
export class GeneralPage {

    private cargar = true;
	private general = [];	
	private items = [];
    private max = 10;
	constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {

		this.initgeneral();
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad CiudadPage');
	}

	initgeneral(){

	    var self = this; 
	    self.general = [];
	    self.cargar = true;
	    self.getDatos.search_read('rusia.general',[], ["concepto_id", "evento_id", "fecha", "ciudad_id", "rublos", "euros", "usd", "tc_rub", "tc_eur", "tc_usd", "tarjeta_pp", "cancelado"]).then(
	    	function (datos:any[]){
	    		self.general = datos;
	    		self.initItems();
	    		self.cargar = false;
	    		console.log(JSON.stringify(datos));
	    	},
	    	fail=>{

	    	}
    	);
	}

	private initItems(){

        for (var i = 0; i <  this.general.length && i < this.max; i++) {
            this.items.push(this.general[i]);
        }
    }

    private onCancel(ev: any){

    	this.initItems();
    }

    private  getItems(ev: any) {
    	// set val to the value of the searchbar
	    const val = ev.target.value;

	    // if the value is an empty string don't filter the items
	    if (val && val.trim() != '') {
	      this.items = this.general.filter((item) => {
	      	//console.log(String(item.name[1]).toLowerCase());
	        return (String(item.evento_id[1]).toLowerCase().indexOf(val.toLowerCase()) > -1);
	      })
	    }
    }



	doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        var self = this;
        setTimeout(() => {
          
          let i;
          for (i = self.max; i < this.general.length && i < this.max + 10 ; i++) {
            this.items.push(this.general[i]);
          }
          this.max = i;

          console.log('Async operation has ended');
          infiniteScroll.complete();
        }, 500);
    }

}
