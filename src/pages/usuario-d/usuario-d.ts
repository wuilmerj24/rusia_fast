import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';


@Component({
  selector: 'page-usuario-d',
  templateUrl: 'usuario-d.html',
})
export class UsuarioDPage {

  private usuario = {
		id:null,
        login:null,
		email:null,
        mobile:null,
        fax:null,
        ciudades:[],
        groups_id:[],
        active:true,
		is_correo:true,
		is_general:false,
		is_traslados:false,
		is_chofer:false,
		is_client:false,
		is_guia:false,
		is_rep:false,
		is_root:false,
        company_id:1
	};

	private control = false;
	private read = true;
	private cargar = false;
    private ciudades = [];

	constructor( public alertCtrl: AlertController, public getDatos:GetDatosProvider, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
		let item = this.navParams.get('item');

		if (!item) {
			this.control = true;		
			this.read = false;	 
		}else{

			this.usuario = this.navParams.get('item');	
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

        if(self.usuario.is_chofer == true){
                self.usuario.groups_id = [[6, false, [12]]]
        }
        if(self.usuario.is_client == true){
            self.usuario.groups_id = [[6, false, [17]]]
        }
        if(self.usuario.is_traslados == true){
            self.usuario.groups_id = [[6, false, [13]]]
        }
        if(self.usuario.is_general == true){
            self.usuario.groups_id = [[6, false, [14]]]
        }
        if(self.usuario.is_guia == true){
            self.usuario.groups_id = [[6, false, [16]]]
        }
        if(self.usuario.is_rep == true){
            self.usuario.groups_id = [[6, false, [15]]]
        }
        if(self.usuario.is_root == true){
            self.usuario.groups_id = [[6, false, [11]]]
        }

        self.usuario.ciudades = [[6, false, self.usuario.ciudades]];

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
