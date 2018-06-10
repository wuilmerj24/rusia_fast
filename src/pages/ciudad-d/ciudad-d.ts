import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';

@Component({
  selector: 'page-ciudad-d',
  templateUrl: 'ciudad-d.html',
})
export class CiudadDPage {

	private ciudad = {
		id:null,
		name:null,
		Tel_Emergency:null,
		Code:null
	};

	private control = false;
	private read = true;
	private cargar = false;

	constructor( public alertCtrl: AlertController, public getDatos:GetDatosProvider, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
		let item = this.navParams.get('item');

		if (!item) {
			this.control = true;		
			this.read = false;	 
		}else{

			this.ciudad = this.navParams.get('item');	
		}
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CiudadDPage');
	}

	closeModal() {

		this.ciudad.id = null;
        this.viewCtrl.dismiss(this.ciudad);
    }

    editar(){

    	this.read = false;
    	this.control = true;
    }

    guardar(){

    	var self = this;
    	self.cargar = true;
    	if (self.ciudad.id != null) {
    		
    		self.getDatos.write('rusia.ciudades', this.ciudad.id ,this.ciudad).then(

    			good=>{

    				self.ciudad.id = 1;
    				self.viewCtrl.dismiss(self.ciudad);
    				self.cargar = false;
    			},
    			bad=>{
    				console.log('fail');
    				self.presentAlert('Error!', 'Error al intentar guardar, vuelva a intentarlo');
    				self.cargar = false;
    			}
    		);
    	}else{

    		//console.log('entro');
    		self.getDatos.create('rusia.ciudades',this.ciudad).then(

    			good=>{

    				self.ciudad.id = 1;
    				self.viewCtrl.dismiss(self.ciudad);
    				self.cargar = false;
    			},
    			bad=>{
    				console.log('fail');
    				self.presentAlert('Error!', 'Error al intentar guardar, vuelva a intentarlo');
    				self.cargar = false;
    			}
    		);
    	}
    }

    borrar(){

    	var self = this;
    	self.cargar = true;
    	self.getDatos.delete('rusia.ciudades',this.ciudad.id).then(

    			good=>{

    				self.viewCtrl.dismiss(self.ciudad);
    				self.cargar = false;
    			},
    			bad=>{
    				console.log('fail');
    				self.presentAlert('Error!', 'Error al intentar borrar, vuelva a intentarlo');
    				self.cargar = false;
    			}
    		);
    }

    presentAlert(titulo, texto) {
        const alert = this.alertCtrl.create({
            title: titulo,
            subTitle: texto,
            buttons: ['Ok']
        });
        alert.present();
    }

}
