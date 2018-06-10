import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';

/**
 * Generated class for the TipoDPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tipo-d',
  templateUrl: 'tipo-d.html',
})
export class TipoDPage {

	private tipo = {
	    id: null,
		name:null,
		Code:null,
		Hora_Inicio:null,
		Hora_Finalizar:null,
		Descripcion:null,
		is_traslado:false,
		is_guia:false,
		ciudad_id:[],
		hora_chofer:null		
	};

	private control = false;
	private read = true;
	private cargar = true;

    private ciudades = [];
	constructor( public alertCtrl: AlertController, public getDatos:GetDatosProvider, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
		let item = this.navParams.get('item');

		if (!item) {
			this.control = true;		
			this.read = false;	 
		}else{

			this.tipo = this.navParams.get('item');	
		}

        var self = this;
        self.getDatos.ejecutarSQL('SELECT * FROM ciudad').then(
            function(ciudad: {rows}){

                                             
                for(var i=0; i<ciudad.rows.length; i++) {

                    self.ciudades.push(ciudad.rows.item(i));                       
                }
                //console.log(JSON.stringify(ciudad.rows));
                self.cargar = false;

            },
            fail=>{
                console.log('Fail load gastos')
            }
        );
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CiudadDPage');
	}

	closeModal() {

		this.tipo.id = null;
        this.viewCtrl.dismiss(this.tipo);
    }

    editar(){

    	this.read = false;
    	this.control = true;
    }

    guardar(){

    	var self = this;
    	self.cargar = true;

        let tipo_tmp = {
		    id: self.tipo.id,
			name:self.tipo.name,
			Code:self.tipo.Code,
			Hora_Inicio:self.tipo.Hora_Inicio,
			Hora_Finalizar:self.tipo.Hora_Finalizar,
			Descripcion:self.tipo.Descripcion,
			is_traslado:self.tipo.is_traslado,
			is_guia:self.tipo.is_guia,
			ciudad_id:self.tipo.ciudad_id[0],
			hora_chofer:self.tipo.hora_chofer		
		};
    	if (self.tipo.id != null) {
    		
    		self.getDatos.write('rusia.tiposervicios', this.tipo.id , tipo_tmp).then(

    			good=>{

    				self.tipo.id = 1;
    				self.viewCtrl.dismiss(self.tipo);
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
    		self.getDatos.create('rusia.tiposervicios', tipo_tmp).then(

    			good=>{

    				self.tipo.id = 1;
    				self.viewCtrl.dismiss(self.tipo);
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
    	self.getDatos.delete('rusia.tiposervicios',this.tipo.id).then(

    			good=>{

    				self.viewCtrl.dismiss(self.tipo);
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
