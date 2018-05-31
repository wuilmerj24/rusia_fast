import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GetDatosProvider } from '../../providers/get-datos/get-datos';
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {

  	private cargar = true;
	private clientes = [];	
	private items = [];
    private max = 10;
	constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {

		this.initClientes();
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad CiudadPage');
	}

	initClientes(){

	    var self = this; 
	    self.clientes = [];
	    self.cargar = true;
	    self.getDatos.search_read('res.users',[["is_client", "=", true]], ["name", "email", "groups_id"]).then(
	    	function (datos:any[]){
	    		self.clientes = datos;
	    		self.initItems();
	    		self.cargar = false;
	    		console.log(JSON.stringify(datos));
	    	},
	    	fail=>{

	    	}
    	);
	}

	private initItems(){

        for (var i = 0; i <  this.clientes.length && i < this.max; i++) {
            this.items.push(this.clientes[i]);
        }
    }


	doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        var self = this;
        setTimeout(() => {
          
          let i;
          for (i = self.max; i < this.clientes.length && i < this.max + 10 ; i++) {
            this.items.push(this.clientes[i]);
          }
          this.max = i;

          console.log('Async operation has ended');
          infiniteScroll.complete();
        }, 500);
    }

}
