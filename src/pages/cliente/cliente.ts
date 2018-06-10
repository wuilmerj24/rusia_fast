import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { ClienteDPage } from '../../pages/cliente-d/cliente-d'

@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {

  	private cargar = true;
	private clientes = [];	
	private items = [];
    private max = 10;
	constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider, public modalCtrl: ModalController) {

		this.init();
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad CiudadPage');
	}

	init(){

	    var self = this; 
	    self.clientes = [];
	    self.cargar = true;
	    self.getDatos.search_read('res.users',[["is_client", "=", true]], ["name", "email", "groups_id", "is_client", "is_correo", "mobile", "fax"]).then(
	    	function (datos:any[]){
	    		self.clientes = datos;
	    		self.initItems();
	    		self.cargar = false;
	    		console.log(JSON.stringify(datos));
	    	},
	    	fail=>{

	    	}
    	);
	}

	private onCancel(ev: any){

    	this.initItems();
    }

    private  getItems(ev: any) {
    	// set val to the value of the searchbar
	    const val = ev.target.value;

	    // if the value is an empty string don't filter the items
	    if (val && val.trim() != '') {
	      this.items = this.clientes.filter((item) => {
	        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
	      })
	    }
    }

	private initItems(){

        for (var i = 0; i <  this.clientes.length && i < this.max; i++) {
            this.items.push(this.clientes[i]);
        }
    }


	doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        var self = this;
        setTimeout(() => {
          
          let i;
          for (i = self.max; i < this.clientes.length && i < this.max + 10 ; i++) {
            this.items.push(this.clientes[i]);
          }
          this.max = i;

          console.log('Async operation has ended');
          infiniteScroll.complete();
        }, 500);
    }

    abrir(item){

		var self = this;
        let profileModal = this.modalCtrl.create(ClienteDPage, {item:item});
        profileModal.onDidDismiss(data => {
            if (data.id != null) {

                self.init();
            }
        });
        profileModal.present();
	}

	add(){

		var self = this;
        let profileModal = this.modalCtrl.create(ClienteDPage, {item:false});
        profileModal.onDidDismiss(data => {
            if (data.id != null) {

                self.init(); 
            }
        });
        profileModal.present();
	}

}
