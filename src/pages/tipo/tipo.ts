import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { TipoDPage } from '../../pages/tipo-d/tipo-d';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';

@Component({
  selector: 'page-tipo',
  templateUrl: 'tipo.html',
})
export class TipoPage {

  	private cargar = true;
	private tipos = [];	
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
	    self.tipos = [];
	    self.cargar = true;
	    self.getDatos.search_read('rusia.tiposervicios',[], ["name", "Code", "Hora_Inicio", "Hora_Finalizar", "is_traslado", "is_guia", "ciudad_id", "hora_chofer", "Descripcion"]).then(
	    	function (datos:any[]){
	    		self.tipos = datos;
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
      this.items = this.tipos.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

	private initItems(){

        for (var i = 0; i <  this.tipos.length && i < this.max; i++) {
            this.items.push(this.tipos[i]);
        }
    }


	doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        var self = this;
        setTimeout(() => {
          
          let i;
          for (i = self.max; i < this.tipos.length && i < this.max + 10 ; i++) {
            this.items.push(this.tipos[i]);
          }
          this.max = i;

          console.log('Async operation has ended');
          infiniteScroll.complete();
        }, 500);
    }

    abrir(item){

		var self = this;
        let profileModal = this.modalCtrl.create(TipoDPage, {item:item});
        profileModal.onDidDismiss(data => {
            if (data.id != null) {

                self.init();
            }
        });
        profileModal.present();
	}

	add(){

		var self = this;
        let profileModal = this.modalCtrl.create(TipoDPage, {item:false});
        profileModal.onDidDismiss(data => {
            if (data.id != null) {

                self.init();
            }
        });
        profileModal.present();
	}

}
