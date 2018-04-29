import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete'


@Component({
  selector: 'page-gatos-tour',
  templateUrl: 'gatos-tour.html',
})
export class GatosTourPage {


	private gasto;
	private ver_segmento = true;
	private cargar = false;
	private eventos_id;
	private gastostours = [];

	private clientes = [
		{name:'jose', id:1},
		{name:'alvaro', id:2},
		{name:'camilo', id:3},
		{name:'jorge', id:4},
	];
	constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {
		

		this.gasto = this.navParams.get('gasto');			
		
		this.ver_segmento = this.navParams.get('ver_segmento');
		this.gastostours = this.navParams.get('lista_gastos');
		console.log(JSON.stringify(this.gastostours));
	}

	closeModal(dato) {
        if (dato == 'x') {
            this.viewCtrl.dismiss('x');
        } else {
            this.viewCtrl.dismiss(dato);
        }
    }

	ionViewDidLoad() {
		console.log('ionViewDidLoad GatosTourPage');
	}	


	private guardar(){


		this.cargar = true;
    	var self = this;
		
    	var campos;
		if(this.gasto.id == null){ // nuevo

			campos = {
				concepto_gasto_id:self.gasto.concepto_gasto_id[0],				
				Total:self.gasto.Total,
				tipo_moneda:self.gasto.tipo_moneda,
				ciudad_id:self.gasto.ciudad_id[0],				
				//usuario_id:83,
				observaciones:self.gasto.observaciones,
				eventos_id: self.gasto.eventos_id, 
				fecha: self.getDatos.convertirFecha(new Date(self.gasto.fecha)),
				evento_padre:self.gasto.evento_padre,
				usuario_id:false
			};

			/*console.log(JSON.stringify(self.gasto.concepto_gasto_id));
			console.log(JSON.stringify(self.gasto.ciudad_id));
*/
			//console.log(JSON.stringify(campos));
			self.closeModal(campos)
			 
			/*self.getDatos.create('rusia.gastostoursline', campos).then(
				res=>{
					console.log('create gastos ok:' + res);
					//self.cargar = false;
					//self.closeModal(res);
				},
				fail=>{
					console.log('error create gastos');
				}

			);*/
		}else{

			/*campos = {
				concepto_gasto_id:self.gasto.concepto_gasto_id[0],				
				Total:self.gasto.Total,
				tipo_moneda:self.gasto.tipo_moneda,
				ciudad_id:3,
				//usuario_id:this.gasto.,
				observaciones:self.gasto.observaciones,
				eventos_id: self.eventos_id
			};
			/*self.getDatos.write('rusia.gastostoursline', self.gasto.id, campos).then(
				res=>{
					console.log('write gastos ok');
					self.cargar = false;
				},
				fail=>{
					console.log('error writing gastos');
				}

			);*/
		}

		
	}

	public eliminar(){

		this.cargar = true;
    	var self = this;
		    	
		if(self.gasto.id != null){ // nuevo		
			
			console.log('self.gasto.id ' +  self.gasto.id );
			self.getDatos.eliminar('rusia.gastostoursline', self.gasto.id).then(
				res=>{
					console.log('delete gastos ok:' + res);
					//self.cargar = false;
					self.closeModal(res);
				},
				fail=>{
					console.log('error create gastos');
				}

			);
		}

	}

}
