import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';

@IonicPage()
@Component({
  selector: 'page-gatos-tour',
  templateUrl: 'gatos-tour.html',
})
export class GatosTourPage {


	private gasto = {
			id:-1,
			concepto_gasto_id:[-1,''],
			Total:'',
			tipo_moneda:'',
			ciudad_id:[-1,''],
			usuario_id:'',
			observaciones:'',
		};
	private ver_segmento = true;
	private cargar = false;
	constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {
		var tmp_gasto = this.navParams.get('gasto');
		if(tmp_gasto == 'nuevo'){

		}else{
			this.gasto = this.navParams.get('gasto');	
		}
		
		this.ver_segmento = this.navParams.get('ver_segmento');
		//console.log(JSON.stringify(this.gasto))
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad GatosTourPage');
	}

	private guardar(){

		this.cargar = true;
    	var self = this;
		var campos = {
			//concepto_gasto_id:this.gasto.concepto_gasto_id[1],
			Total:this.gasto.Total,
			tipo_moneda:this.gasto.tipo_moneda,
			//ciudad_id:this.gasto.,
			//usuario_id:this.gasto.,
			observaciones:this.gasto.observaciones
		};
		//console.log('ID:' + this.evento.id)
		//console.log('usd:' + campos.gasto_usd)
		this.getDatos.write('rusia.gastostoursline', this.gasto.id, campos).then(
			res=>{
				console.log('save gastos ok');
				self.cargar = false;
			},
			fail=>{
				console.log('error saving gastos');
			}

		);
	}

}
