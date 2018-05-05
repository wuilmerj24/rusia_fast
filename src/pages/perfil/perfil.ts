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
		tipo_usuario:'',
		fax:'',		
		gastos_users_ids:null
	};
	private cargar  = true;
	private mostrar = false;

	private gastostoursline_ids = [];

	constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {

		this.initPerfil();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad PerfilPage');
	}

	private initPerfil(){
		var self = this;
		self.cargar = true;

		self.gastostoursline_ids = [];

    	self.getDatos.ejecutarSQL("SELECT * FROM user WHERE usuario IS NOT NULL").then(

			function(data:{rows}){


				self.user = data.rows.item(0);
				//console.log(JSON.stringify(data.rows.item(0)));

				if(self.user.tipo_usuario != "is_cliente"){
					var gastos_users_ids = JSON.parse(self.user.gastos_users_ids);

					if(gastos_users_ids.length > 0){

						var where =  '(';				
						Object.keys(gastos_users_ids).forEach(key=> {
						    
						    where = where + gastos_users_ids[key] + ',';				    
						}); 
						where = where.replace(/.$/,')');

						console.log('SELECT * FROM gastostoursline WHERE id IN ' + where );

						self.getDatos.ejecutarSQL('SELECT * FROM gastostoursline WHERE id IN ' + where).then(
							function(gastos: {rows}){

								
								
								for(var i=0; i<gastos.rows.length; i++) {
				                 	
				                	//                    	
				                 	var tmp_concepto_gasto_id = JSON.parse(gastos.rows.item(i).concepto_gasto_id)
				                 	var tmp_ciudad_id = JSON.parse(gastos.rows.item(i).ciudad_id)
				                 	
				                 	var concepto = gastos.rows.item(i);
				                 	concepto.concepto_gasto_id = tmp_concepto_gasto_id;
				                 	concepto.ciudad_id = tmp_ciudad_id;

				                    self.gastostoursline_ids.push(concepto);               
				                    
				                }
				                console.log(JSON.stringify(self.gastostoursline_ids))
				                self.cargar = false;
				              	self.mostrar = true;

							},
							fail=>{
								console.log('Fail load gastos')
							}
						);
					}else{

						self.cargar = false;
					}
					

				}else{

					self.cargar = false;
				}

				
			},
			function(){
				console.log('Error get table user');				
			}
		);
	}


}
