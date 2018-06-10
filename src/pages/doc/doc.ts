import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { DocumentoPage } from '../../pages/documento/documento';

@Component({
  selector: 'page-doc',
  templateUrl: 'doc.html',
})
export class DocPage {

	private cargar = true;
	private docs = [];	
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
	    self.docs = [];
	    self.cargar = true;
	    self.getDatos.search_read('ir.attachment',[["concepto_id", "!=", false]], ["eventos_id", "create_date", "name", "Tipo_Documento", "file_size", "ciudades", "concepto_id"]).then(
	    	function (datos:any[]){
	    		self.docs = datos;
	    		self.initItems();
	    		self.cargar = false;
	    		console.log(JSON.stringify(datos));
	    	},
	    	fail=>{

	    	}
    	);
	}

	private initItems(){

        for (var i = 0; i <  this.docs.length && i < this.max; i++) {
            this.items.push(this.docs[i]);
        }
    }


	doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        var self = this;
        setTimeout(() => {
          
          let i;
          for (i = self.max; i < this.docs.length && i < this.max + 10 ; i++) {
            this.items.push(this.docs[i]);
          }
          this.max = i;

          console.log('Async operation has ended');
          infiniteScroll.complete();
        }, 500);
    }

    abrir(item){

		var self = this;
        let profileModal = this.modalCtrl.create(DocumentoPage, {item:item});
        profileModal.onDidDismiss(data => {
            if (data.id != null) {

                self.init();
            }
        });
        profileModal.present();
	}

	add(){

		var self = this;
        let profileModal = this.modalCtrl.create(DocumentoPage, {item:false});
        profileModal.onDidDismiss(data => {
            if (data.id != null) {

                self.init();
            }
        });
        profileModal.present();
	}


}
