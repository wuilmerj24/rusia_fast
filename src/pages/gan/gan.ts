import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {GananciasPage} from '../../pages/ganancias/ganancias';
import {ResumenPage} from '../../pages/resumen/resumen';
import {GeneralPage} from '../../pages/general/general';

@Component({
  selector: 'page-gan',
  templateUrl: 'gan.html',
})
export class GanPage {

  private menus = [
		{title:'Ganancias totales', component:GananciasPage},
		{title:'Resumen movimientos', component:ResumenPage},
		{title:'General', component:GeneralPage}	
	];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiPage');
  }

  protected menuSelected(menu){

  	this.navCtrl.push(menu.component);
  }

}
