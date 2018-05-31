import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GetDatosProvider } from '../../providers/get-datos/get-datos';


@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  	private cargar = true;
	private usuarios = [];	
	private items = [];
    private max = 10;
	constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {

		this.initUsuarios();
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad CiudadPage');
	}

	initUsuarios(){

	    var self = this; 
	    self.usuarios = [];
	    self.cargar = true;
	    self.getDatos.search_read('res.users',[], ["name", "email", "groups_id"]).then(
	    	function (datos:any[]){
	    		self.usuarios = datos;
	    		self.initItems();
	    		self.cargar = false;
	    		console.log(JSON.stringify(datos));
	    	},
	    	fail=>{

	    	}
    	);
	}

	private initItems(){

        for (var i = 0; i <  this.usuarios.length && i < this.max; i++) {
            this.items.push(this.usuarios[i]);
        }
    }


	doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        var self = this;
        setTimeout(() => {
          
          let i;
          for (i = self.max; i < this.usuarios.length && i < this.max + 10 ; i++) {
            this.items.push(this.usuarios[i]);
          }
          this.max = i;

          console.log('Async operation has ended');
          infiniteScroll.complete();
        }, 500);
    }

}
