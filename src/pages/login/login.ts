import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { CalendarioPage } from '../../pages/calendario/calendario';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


    cargar = false;    
   
   	//guia
    //conexion = {usuario: 'alekseevadar@gmail.com', bd: 'rusia3', pwd: '123456'};
    //admin
    conexion = {usuario: 'jdmas@maui.com.mx', bd: 'rusia3', pwd: 'rusia@2018'};
//    conexion = {usuario: '', bd: 'rusia3', pwd: ''};
	constructor(public navCtrl: NavController, public navParams: NavParams, public getData:GetDatosProvider) {

		var operacion = this.navParams.get('operacion');
		if(operacion != null && operacion == 'salir'){
			this.getData.deleteBD();
		}
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	private conectarApp(){

		var self = this;
		this.getData.login(this.conexion).then(res => {

			self.navCtrl.setRoot(CalendarioPage);							
		}).catch(e => {
			console.log(e.message);
			console.log('error');
		});
	}

}
