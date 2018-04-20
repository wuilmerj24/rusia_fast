import { Component, ViewChild } from '@angular/core';
import { IonicPage, Slides, NavController, NavParams,ViewController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';

@IonicPage()
@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {

	@ViewChild(Slides) slides: Slides;


	public categories = [{id:1, name:'Resumen', visible:false},
	{id:2, name:'Descripción', visible:false},
	{id:3, name:'Gastos', visible:false},
	{id:4, name:'Documentos', visible:false},	
	{id:5, name:'Comentarios', visible:false}];
	public selectedCategory;
	public showLeftButton: boolean;
	public showRightButton: boolean;

	private evento_cal;
	private evento = {id:0,
	 cliente_id :[0,''],
	 representante_id :[0,''],	 
	 Fecha_Inicio :'',
	 Fecha_Fin :'',
	 hora_inicio :'',
	 hora_final :'',
	 name :'',
	 is_padre :'',
	 fecha_padre :'',	
	 guia_id :[0,''],
	 chofer_id :[0,''],	 
	 gasto_rub :'',
	 gasto_eur :'',
	 gasto_usd :'',
	 gasto_paypal :'',
	 Comentarios_Chofer :'',
	 Comentarios_Internos :'',
	 Comentarios_Cliente :'',
	 Comentarios_Guia:'',
	 Transporte :'',
	 hotel_id :[0,''],
	 ciudad_id :[0,''],
	 Total_Representante :'',
	 message:'',
	 numero_pax :'',
	 evento_id : [0,''],
	 Servicio_Gastos :'',
	 tarjeta_eur :'',
	 tarjeta_rub :'',
	 tarjeta_usd :'',
	 is_traslado :false,
	 is_guia:false
	 }

	 gastostoursline_ids = [];

	private editable = false;

	constructor(public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {

		this.evento_cal = this.navParams.get('evento');
		var self = this;
		this.getDatos.getTable('SELECT * FROM eventos_root WHERE id = ' + this.evento_cal.id).then(
			function(eventos: {rows}){

				var tmp_evento_id = JSON.parse(eventos.rows.item(0).evento_id);
				var tmp_cliente_id = JSON.parse(eventos.rows.item(0).cliente_id);
				var tmp_representante_id = JSON.parse(eventos.rows.item(0).representante_id);
				var tmp_guia_id = JSON.parse(eventos.rows.item(0).guia_id);
				var tmp_chofer_id = JSON.parse(eventos.rows.item(0).chofer_id);
				var tmp_hotel_id = JSON.parse(eventos.rows.item(0).hotel_id);
				var tmp_ciudad_id = JSON.parse(eventos.rows.item(0).ciudad_id);

				var tmp_gatos = JSON.parse(eventos.rows.item(0).gastostoursline_ids);
				var domanin = '';
				for (var i = tmp_gatos.length - 1; i >= 0; i--) {

					if(i == 0){
						domanin = domanin + tmp_gatos[i];  
					}else{
						domanin = domanin + tmp_gatos[i] + ","  	
					}
				}
				
				self.evento = eventos.rows.item(0);
				self.evento.evento_id = tmp_evento_id;
				self.evento.cliente_id = tmp_cliente_id;
				self.evento.representante_id = tmp_representante_id;
				self.evento.guia_id = tmp_guia_id;
				self.evento.chofer_id = tmp_chofer_id;
				self.evento.hotel_id = tmp_hotel_id;
				self.evento.ciudad_id = tmp_ciudad_id;
				//console.log(self.evento.name);

				self.getDatos.getTable('SELECT * FROM gastos WHERE id IN (' + domanin +')').then(
				function(gastos: {rows}){

					for(var i=0; i<gastos.rows.length; i++) {
	                 
	                     //console.log(JSON.stringify(gastos.rows.item(i)));      
	                     self.gastostoursline_ids.push(gastos.rows.item(i));               
	                }

				},
				fail=>{
					console.log('Fail load gastos')
				}
				);

			},
			fail=>{
				console.log('Fail load evento')
			}
			);

		this.initializeCategories();
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad EventoPage');
	}

  	initializeCategories() {

        // Select it by defaut
        console.log(this.categories)
        this.selectedCategory = this.categories[0];
        this.selectedCategory.visible = true;

        // Check which arrows should be shown
        this.showLeftButton = false;
        this.showRightButton = this.categories.length > 3;
    }

    public filterData(categoryId: number): void {
        // Handle what to do when a category is selected
        //console.log(categoryId);

        Object.keys(this.categories).forEach(key=> {

        	if(this.categories[key].id == categoryId){
        		this.categories[key].visible = true;
        	}else{
        		this.categories[key].visible = false;
        	}
		    //console.log(this.categories[key]);
		});
    }

    // Method executed when the slides are changed
    public slideChanged(): void {
        let currentIndex = this.slides.getActiveIndex();
        this.showLeftButton = currentIndex !== 0;
        this.showRightButton = currentIndex !== Math.ceil(this.slides.length() / 3);
    }

    // Method that shows the next slide
    public slideNext(): void {
        this.slides.slideNext();
    }

    // Method that shows the previous slide
    public slidePrev(): void {
        this.slides.slidePrev();
    }

}
