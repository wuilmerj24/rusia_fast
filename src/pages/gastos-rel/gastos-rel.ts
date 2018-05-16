import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';

@Component({
  selector: 'page-gastos-rel',
  templateUrl: 'gastos-rel.html',
})
export class GastosRelPage {

	private gastos_rel;
	private ver_negativos = true;

	constructor(public navCtrl: NavController, public navParams: NavParams, public getData:GetDatosProvider) {

		this.gastos_rel = this.navParams.get('gastos_rel');
		console.log(this.getData.usr.tipo_usuario);
		if (this.getData.usr.tipo_usuario == "is_client") {
			this.ver_negativos = false;
		}
		console.log(this.gastos_rel);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad GastosRelPage');
	}

}
