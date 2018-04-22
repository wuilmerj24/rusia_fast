import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GatosTourPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gatos-tour',
  templateUrl: 'gatos-tour.html',
})
export class GatosTourPage {


	private gasto = {
		concepto_gasto_id:[-1,''],
		Total:'',
		tipo_moneda:'',
		ciudad_id:[-1,''],
		usuario_id:'',
		observaciones:'',
	};
	private ver_segmento = true;
	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.gasto = this.navParams.get('gasto');
		console.log(JSON.stringify(this.gasto))
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad GatosTourPage');
	}

}
