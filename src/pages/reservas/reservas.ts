import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { DetallesReservaPage } from '../../pages/detalles-reserva/detalles-reserva';



@Component({
  selector: 'page-reservas',
  templateUrl: 'reservas.html',
})
export class ReservasPage {


	private reservas = [];
    private items = [];
    private max = 10;
	constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider, public modalCtrl: ModalController) {
		
		var self = this; 
        //WHERE is_padre = "true"
		this.getDatos.ejecutarSQL('SELECT * FROM eventos WHERE is_padre = "true" ORDER BY id DESC').then(

			function(eventos:{rows}){

				for(var i=0; i<eventos.rows.length; i++) {

                    var evento = eventos.rows.item(i);
                    
                    self.reservas.push(evento);    
                    console.log(JSON.stringify(eventos.rows.item(i)));                
                }

                self.initItems();
			},
			function(){
				console.log('Error Reservas');
			}
		);
	}


    private initItems(){

        for (var i = 0; i <  this.reservas.length && i < this.max; i++) {
            this.items.push(this.reservas[i]);
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
          this.items = this.reservas.filter((item) => {
            return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        }
    }

    doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        var self = this;
        setTimeout(() => {
          
          let i;
          for (i = self.max; i < this.reservas.length && i < this.max + 10 ; i++) {
            this.items.push(this.reservas[i]);
          }
          this.max = i;

          console.log('Async operation has ended');
          infiniteScroll.complete();
        }, 500);
    }

	ionViewDidLoad() {
		console.log('ionViewDidLoad ReservasPage');
	}

	private abrir_reserva(reserva){		

        this.navCtrl.push(DetallesReservaPage, {evento:reserva, permisos:'is_guia', padre:true});
	}    

}
