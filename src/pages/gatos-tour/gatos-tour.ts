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
	private ciudades = [];

	private clientes = [];

	private usuario_id: any = false;
	
	private default = [];
	private prueba = 'hola mundo';

	constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {
		

		this.gasto = this.navParams.get('gasto');

		//console.log(this.gasto.usuario_id);
		
		this.default = this.gasto.usuario_id;	

		console.log(JSON.stringify(this.gasto));
		if(this.default.length > 0){

			this.usuario_id = this.default[0];	
		}
		
		
		this.ver_segmento = this.navParams.get('ver_segmento');
		this.gastostours = this.navParams.get('lista_gastos');		
		this.initGatos();
	}

	private initGatos(){

		var self = this;
		self.cargar = true;
		self.getDatos.ejecutarSQL('SELECT id, name FROM user').then(

			(user: {rows})=>{

				//self.clientes = user.rows;
				for(var i=0; i<user.rows.length; i++) {

			    	self.clientes.push(user.rows.item(i));                   	
                }
				//console.log(JSON.stringify(self.clientes));
				//self.cargar = false;

				self.getDatos.ejecutarSQL('SELECT * FROM ciudad').then(
					function(ciudad: {rows}){

													 
						for(var i=0; i<ciudad.rows.length; i++) {

					    	self.ciudades.push(ciudad.rows.item(i));                   	
		                }
		                //console.log(JSON.stringify(ciudad.rows));
		                self.cargar = false;

					},
					fail=>{
						console.log('Fail load gastos')
					}
				);
			},
			fail=>{

			}
		);

	}

	private seleccionCliente(usuario_id){

		this.usuario_id = usuario_id;
		console.log('selecccione el id' + this.usuario_id);
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
				usuario_id: self.usuario_id
			};

			self.closeModal(campos)
			 
		}else{

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
				usuario_id: self.usuario_id
			};
			
			self.closeModal(campos)
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
