import { Component, ViewChild} from '@angular/core';
import { Slides, NavController, NavParams,ViewController, ModalController, ToastController, Platform } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { GatosTourPage } from '../../pages/gatos-tour/gatos-tour';
import { DetallesReservaPage } from '../../pages/detalles-reserva//detalles-reserva';
import { DocumentoPage } from '../../pages/documento/documento';
import { File, IWriteOptions } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {

	@ViewChild(Slides) slides: Slides;

	@ViewChild("sh_cliente") sh_cliente: Slides;


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
	 hora_chofer:'',
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
	 servicio_id:null,
	 nombre_reserva:null

	 //gastostoursline_ids:[]
	 }


	private clientes = [];
	private default_cliente = [];
	private default_guia = [];
	private default_chofer = [];

	private eventos = [];
	private default_evento = [];

	private gastostoursline_ids = [];
	private attachment = [];
	private gastostours = [];

	private servicios = [];
	private default_servicio = [];

	private editable = false;
	private editableObj = {
		editable:false
	}
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


	//private fileOpener: FileOpener,
	constructor(public plt: Platform, private fileOpener: FileOpener, private toastCtrl: ToastController, private file:File, public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider, public modalCtrl: ModalController) {
		
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

		}else if(this.permisos == 'is_chofer'){			

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

		if(this.evento_cal != null){


			this.initEvento();
			
		}else{
			this.editable = true;
		}
		this.initializeCategories();
	}

	ionViewDidLoad() {

	}

	protected adjustTextarea(event: any): void {
		let textarea: any		= event.target;
		textarea.style.overflow = 'hidden';
		textarea.style.height 	= 'auto';
		textarea.style.height 	= textarea.scrollHeight + 'px';
		return;
	}

	

	private async initEvento(){
		
		var self = this;
		self.gastostoursline_ids = [];

		self.attachment = [];
		self.gastostours = [];

		self.cargar = true;
		await self.getDatos.ejecutarSQL('SELECT * FROM eventos WHERE id = ' + self.evento_cal.id).then(
			function(eventos: {rows}){

				var evento = eventos.rows.item(0);
				var tmp_evento_id = JSON.parse(evento.evento_id);
				self.default_evento = tmp_evento_id;
				var tmp_cliente_id = JSON.parse(evento.cliente_id);
				self.default_cliente = tmp_cliente_id;
				var tmp_representante_id = JSON.parse(evento.representante_id);
				var tmp_guia_id = JSON.parse(evento.guia_id);
				self.default_guia = tmp_guia_id;
				var tmp_chofer_id = JSON.parse(evento.chofer_id);
				self.default_chofer = tmp_chofer_id;
				var tmp_hotel_id = JSON.parse(evento.hotel_id);
				var tmp_ciudad_id = JSON.parse(evento.ciudad_id);

				var tmp_servicio_id = JSON.parse(evento.servicio_id);
				self.default_servicio = tmp_servicio_id;


				self.evento = evento;
				self.evento.evento_id = tmp_evento_id;
				self.evento.cliente_id = tmp_cliente_id;
				self.evento.representante_id = tmp_representante_id;
				self.evento.guia_id = tmp_guia_id;
				self.evento.chofer_id = tmp_chofer_id;
				self.evento.hotel_id = tmp_hotel_id;
				self.evento.ciudad_id = tmp_ciudad_id;
				self.evento.servicio_id = tmp_servicio_id;

				

			},
			fail=>{
				console.log('Fail load evento')
			}			
		);			


		await self.getDatos.ejecutarSQL('SELECT * FROM gastostoursline WHERE eventos_id = "' + self.evento.id +'"').then(
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
		                

					},
					fail=>{
						console.log('Fail load gastostoursline')
					}
				);

		await self.getDatos.ejecutarSQL('SELECT * FROM attachment WHERE eventos_id = "' + self.evento.id +'"').then(
			function(attachment: {rows}){

				//console.log(JSON.stringify(attachment.rows));															 
				for(var i=0; i<attachment.rows.length; i++) {


					var att = attachment.rows.item(i)
					console.log(self.getDatos.usr.tipo_usuario);
					att.file_size = self.getDatos.bytesToSize(parseInt(att.file_size))
					if(self.getDatos.usr.tipo_usuario == 'is_client' && att.is_cliente == 'true'){

						self.attachment.push(att);               				                    

					}else{

						self.attachment.push(att);               				                    
					}							
                   	
                }
            

			},
			fail=>{
				console.log('Fail load attachment')
			}
		);

		await self.getDatos.ejecutarSQL('SELECT * FROM gastostours').then(
			function(gastostours: {rows}){

											 
				for(var i=0; i<gastostours.rows.length; i++) {

					var gastos = gastostours.rows.item(i)
					var tmp_ciudades = JSON.parse(gastos.ciudades);

					if(tmp_ciudades.indexOf(self.evento.ciudad_id[0]) > -1) {
			    		self.gastostours.push(gastos);
			      		//console.log(eventos[key].name);
			    	}										    	
                   	
                }

			},
			fail=>{
				console.log('Fail load gastostours');
			}
		);


		await self.getDatos.ejecutarSQL('SELECT id, name FROM user').then(

			(user: {rows})=>{

				//self.clientes = user.rows;
				for(var i=0; i<user.rows.length; i++) {

			    	self.clientes.push(user.rows.item(i));                   	
                }
				//console.log(JSON.stringify(self.clientes));
								
			},
			fail=>{

				console.log('Fail load user');

			}
		);

		await self.getDatos.ejecutarSQL('SELECT * FROM eventos WHERE is_padre = "true"').then(
			function(eventos: {rows}){

				//var evento = eventos.rows.item(0);
				
				for(var i=0; i<eventos.rows.length; i++) {

			    	self.eventos.push(eventos.rows.item(i));                   	
                }
				

			},
			fail=>{
				console.log('Fail load evento')
			}
		);

		await self.getDatos.ejecutarSQL('SELECT * FROM tiposervicios').then(
			function(servicios: {rows}){

				//var evento = eventos.rows.item(0);
				
				for(var i=0; i<servicios.rows.length; i++) {

			    	self.servicios.push(servicios.rows.item(i)); 
			    	console.log(servicios.rows.item(i));                  	
                }				

			},
			fail=>{
				console.log('Fail load evento')
			}
		);

		self.cargar = false;
		

	}

	
	private editar() {

		
        if (!this.editable) {
            this.editable = true;   
            this.editableObj.editable = true;
        } else {
            this.editable = false;
            this.editableObj.editable = false;
        }
    }

    seleccionCliente(ev: any){

    	//console.log(ev);
    	this.evento.cliente_id[0] = ev;
    }
    seleccionEvento(ev: any){

    	this.evento.evento_id[0] = ev;
    }
    seleccionServicio(ev: any){

    	this.evento.servicio_id[0] = ev;
    }

    seleccionGuia(ev: any){
    	this.evento.guia_id[0] = ev;
    }

    seleccionChofer(ev: any){
    	this.evento.chofer_id[0] = ev;
    }

    private guardar(dato, opcion){

    	var self = this;
    	self.cargar = true;
	    

    	var promise = new Promise(function (resolve, reject) {

    		if(self.editable){
    			
    			var campos;
				switch (opcion) {
					case 0:
						campos = {

							 Fecha_Inicio : self.evento.Fecha_Inicio,
							 hora_inicio :self.evento.hora_inicio,
							 hora_final :self.evento.hora_final,					 
							 Comentarios_Chofer :self.evento.Comentarios_Chofer,
							 Comentarios_Internos :self.evento.Comentarios_Internos,
							 Comentarios_Cliente :self.evento.Comentarios_Cliente,
							 Comentarios_Guia:self.evento.Comentarios_Guia,
							 Transporte :self.evento.Transporte,
							 message:self.evento.message,
							 numero_pax :self.evento.numero_pax,					 
							 is_traslado :self.evento.is_traslado,
							 is_guia:self.evento.is_guia,
							 cliente_id: self.evento.cliente_id[0],
							 evento_id: self.evento.evento_id[0],
							 servicio_id: self.evento.servicio_id[0],
							 guia_id: self.evento.guia_id[0],
							 chofer_id: self.evento.chofer_id[0]
						};			
					case 1:
						campos = {
							gastostoursline_ids: dato
						}
						break;
					case 2:
						campos = {
							documentos_ids: [[0,false,dato]]
						}
						break;
					
					default:
						// code...
						break;
				}					
									
				
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

    	console.log(item.fecha);
    	var self = this;
    	var gasto = {
			id:item.id,
			concepto_gasto_id:item.concepto_gasto_id,
			Total:item.Total,
			tipo_moneda:item.tipo_moneda,
			ciudad_id:item.ciudad_id,
			usuario_id:JSON.parse(item.usuario_id),
			observaciones:item.observaciones,		
			evento_padre:item.evento_padre,
			eventos_id:item.eventos_id,
			fecha:new Date(item.fecha).toISOString()
		}
    	let profileModal = this.modalCtrl.create(GatosTourPage, {gasto:gasto, ver_segmento:this.editable, lista_gastos:self.gastostours});
        
        profileModal.onDidDismiss(data => {
        			

            if (data != 'x') {
            	console.log(typeof data);
            	if(typeof data == 'boolean'){

            		self.cargar = true;
            			
        			self.getDatos.cargarCalendario(true,true,false,false,false,false,false).then(
		        		res=>{
		        			console.log('Update complete');
		        			self.initEvento();
		        		},
		        		fail=>{

		        			console.log('Error loading cgastos');
		        		}
		        	);
		        		
		        	
            	}else{

            		console.log('---------------------------------------update ')
            		self.cargar = true;
            		//console.log(JSON.stringify([[1,gasto.id,data]]));
            		self.guardar([[1,gasto.id,data]], 1).then(
		        		res=>{
		        			
		        			self.cargar = true;
		        			self.getDatos.cargarCalendario(true,true,false,false,false,false,false).then(
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
            	
            	self.guardar([[0,0,data]], 1).then(
	        		res=>{
	        			self.cargar = true;
	        			self.getDatos.cargarCalendario(true,true,false,false,false,false,false).then(
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

          var mimetype = res[0].mimetype.toString();
          var ext = "." + mimetype.split("/")[1];
          
          //var tabla = 
          //console.log(JSON.stringify(res[0].mimetype));
          //var ext = '';
          /*var mimetype_tmp = res[0].mimetype.toString();

          if(mimetype_tmp == "application/pdf"){
            ext = '.pdf';
          }else if(mimetype_tmp == "image/png"){
            ext = '.png';
          }*/

          let downloadPDF: any = res[0].datas;
            let base64pdf = downloadPDF;
            var binary = atob(base64pdf.replace(/\s/g, ''));
            var len = binary.length;
            var buffer = new ArrayBuffer(len);
            var view = new Uint8Array(buffer);
            for (var i = 0; i < len; i++) {
                view[i] = binary.charCodeAt(i);
            }
               
            var blobPdf = new Blob( [view], { type: res[0].mimetype.toString() });

          const opt: IWriteOptions = { replace: true }

          if (self.plt.is('ios')) {
            console.log('------------------loading in IOS');
            //var nativeUrl = (self.file.applicationStorageDirectory + "tmp/" + att.name.replace(/ /g,'')).substring(7) + ext;
            //console.log(nativeUrl)
            //self.file.applicationStorageDirectory
            self.file.writeFile(self.file.documentsDirectory, att.name.replace(/ /g,'') + ext, blobPdf, opt).then(
              res=>{
                //console.log('file saved'+ res.nativeURL);
                //console.log('file saved'+ res.toInternalURL());
                console.log('file saved'+ res.toURL());
                
                //self.presentToast();
                self.fileOpener.open(
                  res.toURL(),
                  mimetype//file mimeType
                ).then((success) => {
                  console.log('success open file: ', success);
                }, (err) => {
                  console.log('error open file', err.message);
                });

              },
              fail=>{
                console.log(JSON.stringify(fail));
              }
            );

          }else{
            self.file.writeFile(self.file.externalDataDirectory, att.name + ext, blobPdf, opt).then(
              res=>{
                console.log('file saved'+ res.nativeURL);
                //self.presentToast();
                self.fileOpener.open(
                  res.toInternalURL(),
                  mimetype//file mimeType
                ).then((success) => {
                  console.log('success open file: ', success);
                }, (err) => {
                  console.log('error open file', err.message);
                });

              },
              fail=>{
                console.log(JSON.stringify(fail));
              }
            );
          }

          //self.file.writeFile(self.file.dataDirectory, att.name + ext, blobPdf, opt).then(
          
          self.ver_download = false;
        },
        fail=>{
          console.log('Fail downloading att');
        }
    );

    }    

    private borrarAttachment(id){

    	console.log(id);

    	this.cargar = true;
    	var self = this;
		    	
		if(id != null){ // nuevo		
			
			//console.log('self.gasto.id ' +  self.gasto.id );
			self.getDatos.eliminar('ir.attachment', id).then(
				res=>{
					self.cargar = true;
        			self.getDatos.cargarCalendario(true,false,true,false,false,false,false).then(
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
					console.log('error create gastos');
				}

			);
		}

    }

    private abrirReserva(){
    	//console.log('entro');
    	
    	//if(!this.editable){

    		this.navCtrl.push(DetallesReservaPage, {evento:this.evento, permisos:this.permisos, padre:false});
    	//}
    	
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

	private agregarAttachment(){


		var self = this;
        let profileModal = this.modalCtrl.create(DocumentoPage);
        
        profileModal.onDidDismiss(data => {
        				

            if (data != 'x') {
            	
            	//console.log(JSON.stringify(self.evento))
            	//console.log(self.evento.cliente_id[0])
            	data.cliente_id = self.evento.cliente_id[0];
            	data.res_id = self.evento.id;
            	console.log(JSON.stringify(data))

            	self.guardar(data, 2).then(
	        		res=>{
	        			self.cargar = true;
	        			self.getDatos.cargarCalendario(true,false,true,false,false,false,false).then(
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

}
