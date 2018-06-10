import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';

@Component({
  selector: 'page-cliente-d',
  templateUrl: 'cliente-d.html',
})
export class ClienteDPage {

  private usuario = {
		id:null,
        login:null,
		email:null,
        mobile:null,
        fax:null,
        groups_id:[],
        active:true,
		is_correo:true,
		is_client:true,
        company_id:1
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

			this.usuario = this.navParams.get('item');	
			console.log(JSON.stringify(this.usuario));
		}
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad usuarioDPage');
	}


	closeModal() {

		this.usuario.id = null;
        this.viewCtrl.dismiss(this.usuario);
    }

    editar(){

    	this.read = false;
    	this.control = true;
    }

    guardar(){

    	var self = this;
    	self.cargar = true;

    	if(self.usuario.is_client == true){
            self.usuario.groups_id = [[6, false, [17]]]
        }

        self.usuario.login = self.usuario.email;
        self.usuario.company_id = 1;


        console.log(JSON.stringify(self.usuario));

    	if (self.usuario.id != null) {
    		
    		self.getDatos.write('res.users', this.usuario.id ,this.usuario).then(

    			good=>{

    				self.usuario.id = 1;
    				self.viewCtrl.dismiss(self.usuario);
    				self.cargar = false;
    			},
    			bad=>{
    				console.log('fail');
    				self.presentAlert('Error!', 'Error al intentar guardar, vuelva a intentarlo');
    				self.cargar = false;
    			}
    		);
    	}else{    

    		self.getDatos.create('res.users',self.usuario).then(

    			good=>{

    				self.usuario.id = 1;
    				self.viewCtrl.dismiss(self.usuario);
    				self.cargar = false;
    			},
    			bad=>{
    				console.log(JSON.stringify(bad));
    				self.presentAlert('Error!', 'Error al intentar guardar, vuelva a intentarlo');
    				self.cargar = false;
    			}
    		);
    	}
    }

    borrar(){

    	var self = this;
    	self.cargar = true;
    	self.getDatos.delete('res.users',this.usuario.id).then(

    			good=>{

    				self.viewCtrl.dismiss(self.usuario);
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
