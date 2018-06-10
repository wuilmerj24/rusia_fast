import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { UsuarioDPage } from '../../pages/usuario-d/usuario-d';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { TablasProvider } from '../../providers/tablas/tablas';


@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  	private cargar = true;
	private usuarios = [];	
	private items = [];
    private max = 10;
	constructor(private tablas:TablasProvider, public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider, public modalCtrl: ModalController) {

		this.init();
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad CiudadPage');
	}

	init(){

	    var self = this; 
	    self.usuarios = [];
	    self.cargar = true;
	    self.getDatos.search_read('res.users',[], self.tablas.Tbl_user_odoo).then(
	    	function (datos:any[]){
	    		self.usuarios = datos;
	    		self.initItems();
	    		self.cargar = false;
	    		console.log(JSON.stringify(datos));
	    	},
	    	fail=>{

	    	}
    	);
	}

	private initItems(){

        for (var i = 0; i <  this.usuarios.length && i < this.max; i++) {
            this.items.push(this.usuarios[i]);
        }
    }

    private onCancel(ev: any){

    	this.initItems();
    }

    private  getItems(ev: any) {
    	// set val to the value of the searchbar
	    const val = ev.target.value;

	    // if the value is an empty string don't filter the items
	    if (val && val.trim() != '') {
	      this.items = this.usuarios.filter((item) => {
	        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
	      })
	    }
    }


	doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        var self = this;
        setTimeout(() => {
          
          let i;
          for (i = self.max; i < this.usuarios.length && i < this.max + 10 ; i++) {
            this.items.push(this.usuarios[i]);
          }
          this.max = i;

          console.log('Async operation has ended');
          infiniteScroll.complete();
        }, 500);
    }

  abrir(item){

		var self = this;
        let profileModal = this.modalCtrl.create(UsuarioDPage, {item:item});
        profileModal.onDidDismiss(data => {
            if (data.id != null) {

                self.init();
            }
        });
        profileModal.present();
	}

	add(){

		var self = this;
        let profileModal = this.modalCtrl.create(UsuarioDPage, {item:false});
        profileModal.onDidDismiss(data => {
            if (data.id != null) {

                self.init(); 
            }
        });
        profileModal.present();
	}

}
