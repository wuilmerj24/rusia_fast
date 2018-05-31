import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CiudadPage } from '../../pages/ciudad/ciudad';
import { UsuarioPage } from '../../pages/usuario/usuario';
import { ClientePage } from '../../pages/cliente/cliente';
import { TipoPage } from '../../pages/tipo/tipo';
import { GastosTPage } from '../../pages/gastos-t/gastos-t';
import { GastosEPage } from '../../pages/gastos-e/gastos-e';
import { BenePage } from '../../pages/bene/bene';
import { ConcepPage } from '../../pages/concep/concep';
import { DocPage } from '../../pages/doc/doc';
import { FormPage } from '../../pages/form/form';

@Component({
  selector: 'page-confi',
  templateUrl: 'confi.html',
})
export class ConfiPage {

	private menus = [
		{title:'Ciudades', component:CiudadPage},
		{title:'Usuarios', component:UsuarioPage},
		{title:'Clientes', component:ClientePage},		
		{title:'Tipo de servicio', component:TipoPage},
		{title:'Gastos tours', component:GastosTPage},
		{title:'Gastos Extras', component:GastosEPage},
		{title:'Beneficios Extras', component:BenePage},
		{title:'Conceptos Generales', component:ConcepPage},
		{title:'Documentos', component:DocPage},
		{title:'Formularios', component:FormPage},		
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
