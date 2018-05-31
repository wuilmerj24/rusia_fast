import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CiudadDPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ciudad-d',
  templateUrl: 'ciudad-d.html',
})
export class CiudadDPage {

	private ciudad = {
		id:null,
		name:null,
		Tel_Emergency:null,
		Code:null
	};

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.ciudad = this.navParams.get('ciudad');
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad CiudadDPage');
	}

}
