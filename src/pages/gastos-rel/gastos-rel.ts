import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-gastos-rel',
  templateUrl: 'gastos-rel.html',
})
export class GastosRelPage {

	private gastos_rel;
	constructor(public navCtrl: NavController, public navParams: NavParams) {

		this.gastos_rel = this.navParams.get('gastos_rel');
		console.log(this.gastos_rel);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad GastosRelPage');
	}

}
