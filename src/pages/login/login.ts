import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
//import { CalendarioPage } from '../../pages/calendario/calendario';
import { PanelPage } from '../../pages/panel/panel';
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
   

	//"proxyUrl": "http://185.129.251.102"
   	//guia
    conexion = {usuario: 'joselugar8@hotmail.com', bd: 'rusia3', pwd: '123456'};
    //admin
    //conexion = {usuario: 'jdmas@maui.com.mx', bd: 'rusia3', pwd: 'rusia@2018'};
    //cliente
    //conexion = {usuario: 'denisepirowicz@hotmail.com', bd: 'rusia3', pwd: '123456'};
	constructor(public navCtrl: NavController, public navParams: NavParams, public getData:GetDatosProvider) {

		var operacion = this.navParams.get('operacion');
		if(operacion != null && operacion == 'salir'){
			this.getData.deleteBD();
		}else{
			if(this.conexion.usuario != ""){
				this.conectarApp();	
			}			
		}
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	private conectarApp(){

		var self = this;
		self.cargar = true;
		this.getData.login(this.conexion).then(
			function(res){
				self.cargar = false;
				self.navCtrl.setRoot(PanelPage, {usr:res});							
			}).catch(e => {
				console.log(e.message);
				console.log('error');
			}
		);
	}

}
