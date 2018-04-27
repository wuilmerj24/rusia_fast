import { Component, ViewChild } from '@angular/core';
import { Slides, NavController, NavParams,ViewController } from 'ionic-angular';
import { AcercaPage } from '../../pages/acerca/acerca';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';


@Component({
  selector: 'page-detalles-reserva',
  templateUrl: 'detalles-reserva.html',
})
export class DetallesReservaPage {
	
	@ViewChild(Slides) slides: Slides;

	
    public categories = [{id:1, name:'Resumen', visible:false},
    {id:2, name:'Descripción', visible:false},
    {id:3, name:'Documentos', visible:false},
    //{id:4, name:'Costos Itinerario', visible:false},
    {id:5, name:'Costos por ciudad', visible:false},
    {id:6, name:'Gatos extras', visible:false},
    {id:7, name:'Comentarios', visible:false}];
    public selectedCategory;
    public showLeftButton: boolean;
    public showRightButton: boolean;

    private reserva = {id:-1,
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
         is_guia:false,
     //
    }

    private itinerario = [];

    private editable = false;

    private ver_resumen = true;
    private ver_descripcion = true;
    private ver_comentarios = true;
    private ver_documentos = true;
    private cargar  = false;
    private gastostoursline_ids = [];
    private ver_segmento = true;

    private attachment = [];

	constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {

		this.reserva = this.navParams.get('evento');

        this.initReserva();
		//this.initializeCategories();
        console.log(JSON.stringify(this.navParams.get('evento')));
	}

    private initReserva(){
        
        var self = this;
        self.itinerario = [];
        self.gastostoursline_ids = [];

        self.cargar = true;
        self.getDatos.ejecutarSQL('SELECT name, ciudad_id, Fecha_Inicio FROM eventos WHERE is_padre = "false" and  name = "' + self.reserva.name +'"').then(
            function(eventos: {rows}){

                console.log(JSON.stringify(eventos));

                for(var i=0; i<eventos.rows.length; i++) {
                             
                    //console.log(JSON.stringify(gastos.rows.item(i)));                         
                     //var tmp_concepto_gasto_id = JSON.parse(gastos.rows.item(i).concepto_gasto_id)
                     var tmp_ciudad_id = JSON.parse(eventos.rows.item(i).ciudad_id);
                     
                     var concepto = eventos.rows.item(i);
                     //concepto.concepto_gasto_id = tmp_concepto_gasto_id;
                    concepto.ciudad_id = tmp_ciudad_id;                     

                    self.itinerario.push(concepto);               
                    
                }

                //self.cargar = false;
                /*var tmp_evento_id = JSON.parse(eventos.rows.item(0).evento_id);
                var tmp_cliente_id = JSON.parse(eventos.rows.item(0).cliente_id);
                var tmp_representante_id = JSON.parse(eventos.rows.item(0).representante_id);
                var tmp_guia_id = JSON.parse(eventos.rows.item(0).guia_id);
                var tmp_chofer_id = JSON.parse(eventos.rows.item(0).chofer_id);
                var tmp_hotel_id = JSON.parse(eventos.rows.item(0).hotel_id);
                var tmp_ciudad_id = JSON.parse(eventos.rows.item(0).ciudad_id);


                self.evento = eventos.rows.item(0);
                self.evento.evento_id = tmp_evento_id;
                self.evento.cliente_id = tmp_cliente_id;
                self.evento.representante_id = tmp_representante_id;
                self.evento.guia_id = tmp_guia_id;
                self.evento.chofer_id = tmp_chofer_id;
                self.evento.hotel_id = tmp_hotel_id;
                self.evento.ciudad_id = tmp_ciudad_id;*/

                console.log('SELECT * FROM attachment WHERE cliente_id = "' + self.reserva.cliente_id[0] +'"');
                self.getDatos.ejecutarSQL('SELECT * FROM attachment WHERE cliente_id = "' + self.reserva.cliente_id[0] +'"').then(
                    function(attachment: {rows}){

                                                     
                        for(var i=0; i<attachment.rows.length; i++) {

                            var att = attachment.rows.item(i)
                            att.file_size = self.getDatos.bytesToSize(parseInt(att.file_size))
                            //var tmp_file_size = attachment.rows.item(i).file_size;
                            //console.log('file size:' + );
                            //console.log(JSON.stringify(attachment.rows.item(i)));      
                            self.attachment.push(att);                                                   
                        }
                        self.cargar = false;

                    },
                    fail=>{
                        console.log('Fail load gastos')
                    }
                );
                /*self.getDatos.ejecutarSQL('SELECT * FROM gastostoursline WHERE evento_padre = "' + self.reserva.name +'"').then(
                    function(gastos: {rows}){

                        
                        console.log(JSON.stringify(gastos));
                        for(var i=0; i<gastos.rows.length; i++) {
                             
                            console.log(JSON.stringify(gastos.rows.item(i)));                         
                            var tmp_concepto_gasto_id = JSON.parse(gastos.rows.item(i).concepto_gasto_id)
                            var tmp_ciudad_id = JSON.parse(gastos.rows.item(i).ciudad_id)
                             
                            var concepto = gastos.rows.item(i);
                            concepto.concepto_gasto_id = tmp_concepto_gasto_id;
                            concepto.ciudad_id = tmp_ciudad_id;

                            self.gastostoursline_ids.push(gastos.rows.item(i));               
                            
                        }
                        self.cargar = false;
                       

                    },
                    fail=>{
                        console.log('Fail load gastos')
                    }
                );*/



            },
            fail=>{
                console.log('Fail load evento')
            }
        );    
    }

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad DetallesReservaPage');
  	}

  	closeModal(x) { 
	    if (x == 'x') {
	        this.viewCtrl.dismiss(null);
	    } else {
	        //this.viewCtrl.dismiss(this.item);
	    }
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
