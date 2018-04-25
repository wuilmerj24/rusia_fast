import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

	private user={
		name:'',
		login:'',
		email:'',
		is_correo:'',
		phone:'',
		mobile:'',
		fax:''
	};
	constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {

		this.initPerfil();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PerfilPage');
	}

	private initPerfil(){
		var self = this;

		console.log('constructor creado primero');
    	self.getDatos.ejecutarSQL("SELECT * FROM user").then(

			function(data:{rows}){
				console.log(JSON.stringify(data));
				console.log(JSON.stringify(data.rows.item(0)));
				self.user = data.rows.item(0);
			},
			function(){
				console.log('Error get table user');				
			}
		);
	}


}
