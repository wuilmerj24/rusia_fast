import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';

@Component({
  selector: 'page-concep-d',
  templateUrl: 'concep-d.html',
})
export class ConcepDPage {

  	private concep = {
        id: null,
		name:null,
		ciudades:[],
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

			this.concep = this.navParams.get('item');	
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

		this.concep.id = null;
        this.viewCtrl.dismiss(this.concep);
    }

    editar(){

    	this.read = false;
    	this.control = true;
    }

    guardar(){

    	var self = this;
    	self.cargar = true;

        self.concep.ciudades = [[6, false, self.concep.ciudades]];
    	if (self.concep.id != null) {
    		
    		self.getDatos.write('rusia.conceptos.gral', this.concep.id ,this.concep).then(

    			good=>{

    				self.concep.id = 1;
    				self.viewCtrl.dismiss(self.concep);
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
    		self.getDatos.create('rusia.conceptos.gral',this.concep).then(

    			good=>{

    				self.concep.id = 1;
    				self.viewCtrl.dismiss(self.concep);
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
    	self.getDatos.delete('rusia.conceptos.gral',this.concep.id).then(

    			good=>{

    				self.viewCtrl.dismiss(self.concep);
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
