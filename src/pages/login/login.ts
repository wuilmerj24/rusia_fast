import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
//import { CalendarioPage } from '../../pages/calendario/calendario';
import { PanelPage } from '../../pages/panel/panel';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


    cargar = false;    
   
    //admin x ciudad     
    //conexion = {usuario: 'sp@guiarus.com', bd: 'rusia3', pwd: '123456'};

    //Admin traslados    
    //conexion = {usuario: 'eu@guiarus.com', bd: 'rusia3', pwd: '123456'};

    //Representante    
    //conexion = {usuario: 'info@guiarus.com', bd: 'rusia3', pwd: '123456'};

   	//guia
    //conexion = {usuario: 'joselugar8@hotmail.com', bd: 'rusia3', pwd: '123456'}; //pruebas
    //conexion = {usuario: 'cupabanoscar@gmail.com', bd: 'rusia3', pwd: '123456'};//produccion 

    //chofer
    //conexion = {usuario: 'anton1985info@gmail.com', bd: 'rusia3', pwd: '123456'};
    

    //conexion = {usuario: 'reservas@guiarus.com', bd: 'rusia3', pwd: '123456'};//produccion 
    //cliente
    //conexion = {usuario: 'abrilgalvez5@yahoo.com.mx', bd: 'rusia3', pwd: '123456'}; //   pruebas
    
    //chofer

    //conexion = {usuario: 'chofersanpetersburgo@gmail.com', bd: 'rusia3', pwd: '123456'};  //  prd
    conexion = {usuario: '', bd: 'rusia3', pwd: ''};
    //conexion = {usuario: 'sergey.guiarus@gmail.com', bd: 'rusia3', pwd: '123456'};
    //conexion = {usuario: 'sp@guiarus.com', bd: 'rusia3', pwd: '123456'};
    mensaje;
	constructor(public navCtrl: NavController, public navParams: NavParams, public getData:GetDatosProvider) {

		var operacion = this.navParams.get('operacion');
		if(operacion != null && operacion == 'salir'){
			this.getData.deleteBD();
			this.getData.usr = null;
		}

	}

	ionViewDidLoad() {
		this.conectarApp();
	}

	private conectarApp(){

		var self = this;
		self.cargar = true;
		this.getData.login(this.conexion).then(
			function(res){
				self.cargar = false;
				//console.log(JSON.stringify(res));
				self.navCtrl.setRoot(PanelPage, {usr:res});							
			}).catch(e => {
				//console.log(e.message);
				console.log('error');
				self.cargar = false;
			}
		);
	}

}
