import { Component, ViewChild ,Directive, ElementRef, ContentChild} from '@angular/core';
import { Slides, NavController, NavParams,ViewController, ModalController, ToastController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { GatosTourPage } from '../../pages/gatos-tour/gatos-tour';
import { DetallesReservaPage } from '../../pages/detalles-reserva//detalles-reserva';
import { File } from '@ionic-native/file';


@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})

@Directive({
  selector: 'ion-textarea[autosize]'
})

export class EventoPage {

	@ViewChild(Slides) slides: Slides;


	public categories;
	public selectedCategory;
	public showLeftButton: boolean;
	public showRightButton: boolean;

	private evento_cal;
	private evento = {id:-1,
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
	 //gastostoursline_ids:[]
	 }

	private gastostoursline_ids = [];
	private attachment = [];
	private gastostours = [];

	private editable = false;
	private cargar = false;
	private permisos = '';
	private ver_segmento = true;
	private ver_gastos= false;
	private ver_resumen = false;
	private ver_descripcion = false;
	private ver_documentos = false;
	private ver_comentarios = false;

	private ver_download = false;

	private ruta : '';


	constructor(public element:ElementRef, private toastCtrl: ToastController, private file:File, public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider, public modalCtrl: ModalController) {
		
		this.evento_cal = this.navParams.get('evento');
		this.permisos = this.navParams.get('permisos');
		//console.log('permisos:'+ this.permisos);
		if(this.permisos == 'is_client'){
			this.ver_segmento = false;

			this.categories = [{id:1, name:'Resumen', visible:false},//0
			{id:2, name:'Descripción', visible:false},//1
			//{id:3, name:'Gastos', visible:false},
			{id:4, name:'Documentos', visible:false},	//2
			{id:5, name:'Comentarios', visible:false}];//3

		}else{
			this.categories = [{id:1, name:'Resumen', visible:false},
			{id:2, name:'Descripción', visible:false},
			{id:3, name:'Gastos', visible:false},
			{id:4, name:'Documentos', visible:false},	
			{id:5, name:'Comentarios', visible:false}];
		}
		this.initEvento();
		this.initializeCategories();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad EventoPage');

	}

	protected adjustTextarea(event: any): void {
		let textarea: any		= event.target;
		textarea.style.overflow = 'hidden';
		textarea.style.height 	= 'auto';
		textarea.style.height 	= textarea.scrollHeight + 'px';
		return;
	}	

	private initEvento(){
		
		var self = this;
		self.gastostoursline_ids = [];

		self.attachment = [];
		self.gastostours = [];

		self.cargar = true;
		self.getDatos.ejecutarSQL('SELECT * FROM eventos WHERE id = ' + self.evento_cal.id).then(
			function(eventos: {rows}){

				var tmp_evento_id = JSON.parse(eventos.rows.item(0).evento_id);
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
				self.evento.ciudad_id = tmp_ciudad_id;


				self.getDatos.ejecutarSQL('SELECT * FROM gastostoursline WHERE eventos_id = "' + self.evento.id +'"').then(
					function(gastos: {rows}){

						
						
						for(var i=0; i<gastos.rows.length; i++) {
		                 	
		                	//                    	
		                 	var tmp_concepto_gasto_id = JSON.parse(gastos.rows.item(i).concepto_gasto_id)
		                 	var tmp_ciudad_id = JSON.parse(gastos.rows.item(i).ciudad_id)
		                 	
		                 	var concepto = gastos.rows.item(i);
		                 	concepto.concepto_gasto_id = tmp_concepto_gasto_id;
		                 	concepto.ciudad_id = tmp_ciudad_id;

		                    self.gastostoursline_ids.push(concepto);               
		                    
		                }
		                //self.cargar = false;
		                //console.log('SELECT * FROM attachment WHERE cliente_id = "' + self.evento.cliente_id[0] +'"');
		                self.getDatos.ejecutarSQL('SELECT * FROM attachment WHERE cliente_id = "' + self.evento.cliente_id[0] +'"').then(
							function(attachment: {rows}){

															 
								for(var i=0; i<attachment.rows.length; i++) {

									var att = attachment.rows.item(i)
									att.file_size = self.getDatos.bytesToSize(parseInt(att.file_size))

				                   	self.attachment.push(att);               				                    
				                }
				                //self.cargar = false;

//				                console.log('SELECT * FROM attachment WHERE gastostours');
				                self.getDatos.ejecutarSQL('SELECT * FROM gastostours').then(
									function(gastostours: {rows}){

																	 
										for(var i=0; i<gastostours.rows.length; i++) {

											var gastos = gastostours.rows.item(i)
											var tmp_ciudades = JSON.parse(gastos.ciudades);

											if(tmp_ciudades.indexOf(self.evento.ciudad_id[0]) > -1) {
									    		self.gastostours.push(gastos);
									      		//console.log(eventos[key].name);
									    	}										    	
						                   	
						                }
						                self.cargar = false;

									},
									fail=>{
										console.log('Fail load gastos')
									}
								);

							},
							fail=>{
								console.log('Fail load gastos')
							}
						);

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
	}
	
	private editar() {

        if (!this.editable) {
            this.editable = true;
        } else {
            this.editable = false;
        }
    }

    private guardar(dato){

    	var self = this;
    	self.cargar = true;
	    

    	var promise = new Promise(function (resolve, reject) {

    		if(self.editable){
    			var campos;
			
				if (dato == null){
					campos = {
					 //cliente_id :[0,''],
					 //representante_id :[0,''],	 
					 Fecha_Inicio : self.evento.Fecha_Inicio,
					 //Fecha_Fin :this.evento.Fecha_Fin,
					 hora_inicio :self.evento.hora_inicio,
					 hora_final :self.evento.hora_final,
					 //name :'',
					 //is_padre :'',
					 //fecha_padre :'',	
					 //guia_id :[0,''],
					 //chofer_id :[0,''],	 
					 //gasto_rub :this.evento.gasto_rub,
					 //gasto_eur :this.evento.gasto_eur,
					 //gasto_usd :this.evento.gasto_usd,
					 //gasto_paypal :this.evento.gasto_paypal,
					 Comentarios_Chofer :self.evento.Comentarios_Chofer,
					 Comentarios_Internos :self.evento.Comentarios_Internos,
					 Comentarios_Cliente :self.evento.Comentarios_Cliente,
					 Comentarios_Guia:self.evento.Comentarios_Guia,
					 Transporte :self.evento.Transporte,
					 //hotel_id :[0,''],
					 //ciudad_id :[0,''],
					 //Total_Representante :self.evento.Total_Representante,
					 message:self.evento.message,
					 numero_pax :self.evento.numero_pax,
					 //evento_id : [0,''],
					 //Servicio_Gastos :self.evento.Servicio_Gastos,
					 //tarjeta_eur :this.evento.tarjeta_eur, 
					 //tarjeta_rub :this.evento.tarjeta_rub,
					 //tarjeta_usd :this.evento.tarjeta_usd,
					 is_traslado :self.evento.is_traslado,
					 is_guia:self.evento.is_guia

					};
				}else{
					campos = {
						gastostoursline_ids: [[0,0,dato]]
					}
				}						

				console.log(JSON.stringify(campos));
				//console.log('ID:' + this.evento.id)
				//console.log('usd:' + campos.gasto_usd)
				self.getDatos.write('rusia.eventos', self.evento.id, campos).then(
					res=>{
						console.log('save event ok');
						self.cargar = false;
						resolve();
					},
					fail=>{
						console.log('error saving event');
						reject();
					} 

				);
    		}else{
    			console.log('editable is false');
    			reject();
    		}
    		
    	});

    	return promise;
    	
    }

  	private initializeCategories() {

        // Select it by defaut
        //console.log(this.categories)
        this.selectedCategory = this.categories[0];
        this.ver_resumen = true;
        //this.selectedCategory.visible = true;        

        // Check which arrows should be shown
        this.showLeftButton = false;
        this.showRightButton = this.categories.length > 3;
    }

    private allHide(){
    	this.ver_resumen = false;
    	this.ver_descripcion = false;
    	this.ver_gastos  = false;
    	this.ver_comentarios = false;
    	this.ver_documentos = false;
    }

    private filterData(categoryId: number): void {
        // Handle what to do when a category is selected
        //console.log(categoryId);
		switch (categoryId) {
			case 1:
				this.allHide();
				this.ver_resumen = true;
				break;
			case 2:
				this.allHide();
				this.ver_descripcion = true;
				break;
			case 3:
				this.allHide();
				this.ver_gastos = true;
				break;
			case 4:
				this.allHide();
				this.ver_documentos = true;
				break;
			case 5:
				this.allHide();
				this.ver_comentarios = true;
				break;
			default:
				this.allHide();
				break;
		}
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

    public abrirGasto(item){
    	//item.concepto_gasto_id = JSON.stringify(item.concepto_gasto_id);
    	var self = this;
    	var gasto = {
			id:item.id,
			concepto_gasto_id:item.concepto_gasto_id,
			Total:item.Total,
			tipo_moneda:item.tipo_moneda,
			ciudad_id:item.ciudad_id,
			usuario_id:item.usuario_id,
			observaciones:item.observaciones,		
			evento_padre:item.evento_padre,
			eventos_id:item.eventos_id,
			//fecha:new Date(item.fecha).toISOString()
		}
    	let profileModal = this.modalCtrl.create(GatosTourPage, {gasto:gasto, ver_segmento:this.editable});
        
        profileModal.onDidDismiss(data => {
        	
			console.log(data);
            if (data > 0) {
            	
            	self.cargar = true;
            	self.getDatos.cargarGastos(true).then(
	        		res=>{
	        			self.initEvento();
	        		},
	        		fail=>{

	        			console.log('Error loading cgastos');
	        		}
	        	);
            	
            }
        });

        profileModal.present();
    }

    private agregarGasto(){

    	var self = this;
    	var gasto = {
			id:null,
			concepto_gasto_id:[],
			Total:'',
			tipo_moneda:'',
			ciudad_id:self.evento.ciudad_id,
			usuario_id:[],
			observaciones:'',		
			evento_padre:this.evento.name,
			eventos_id:this.evento.id,
			fecha:new Date().toISOString()
		}//gasto:{, , , id:nul
        let profileModal = this.modalCtrl.create(GatosTourPage, {gasto:gasto, ver_segmento:self.editable, lista_gastos:self.gastostours});
        
        profileModal.onDidDismiss(data => {
        				
            if (data != 'x') {
            	self.cargar = true;
            	self.guardar(data).then(
	        		res=>{

	        			self.getDatos.cargarCalendario(false).then(
			        		res=>{
			        			console.log('Update complete');
			        			self.initEvento();
			        		},
			        		fail=>{

			        			console.log('Error loading cgastos');
			        		}
			        	);
	        		},
	        		fail=>{

	        			console.log('Error loading cgastos');
	        		}
	        	);
            	
            }
        });

        profileModal.present();       
    }

    private descargarAtt(att){

    	var self  = this;
    	self.ver_download = true;
    	console.log(att.id);
    	self.getDatos.search_read('ir.attachment', [["id", "=", att.id]], ["datas", "mimetype"]).then(

    		(res : [{datas:'', mimetype:''}])=>{
    			//var tabla = 
    			console.log(JSON.stringify(res[0].mimetype));
    			var ext = '';
    			if(res[0].mimetype.toString() == "application/pdf"){
    				ext = '.pdf';
    			}else if(res[0].mimetype.toString() == "image/png"){
    				ext = '.png';
    			}

    			var blob = new Blob([res[0].datas], {type: res[0].mimetype});
    			self.file.writeFile(self.file.externalDataDirectory, att.name + ext, blob, {replace:true}).then(
    				res=>{
    					console.log('file saved');
    					self.presentToast();
    				},
    				fail=>{
    					console.log(JSON.stringify(fail));
    				}
    			);
    			self.ver_download = false;
    		},
    		fail=>{
    			console.log('Fail downloading att');
    		}
		);

    }   

    private abrirReserva(){
    	//console.log('entro');
    	// 
    	this.navCtrl.push(DetallesReservaPage, {evento:this.evento});
    }

    private presentToast() {
	  let toast = this.toastCtrl.create({
	    message: 'Archivo descargado',
	    duration: 2000,
	    position: 'top'
	  });

	  /*toast.onDidDismiss(() => {
	    console.log('Dismissed toast');
	  });*/

	  toast.present();
	} 

}
