import { Component, ViewChild } from '@angular/core';
import { Slides, NavController, NavParams,ViewController, Platform, ModalController} from 'ionic-angular';
import { AcercaPage } from '../../pages/acerca/acerca';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { GastosRelPage } from '../../pages/gastos-rel/gastos-rel';
import { File, IWriteOptions } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { EventoPage } from '../../pages/evento/evento';
import { DocumentoPage } from '../../pages/documento/documento';


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
    private ver_download = false;

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
         gastos_ids:[]
     //
    }

  private itinerario = [];

  private editable = false;

  private ver_resumen = true;
  private ver_descripcion = true;
  private ver_comentarios = true;
  private ver_documentos = true;
  private cargar  = true;
  private ver_segmento = true;

  private ver_gastos= true;

  //private gastostoursline_ids = [];
  private gastos_ciudad = [];
  

  private attachment = [];
  private evento_hijo;
  private permisos = '';

  private clientes = [];
  private default_cliente = [];
  private default_repre = [];

	constructor(public plt: Platform, public modalCtrl: ModalController,private fileOpener: FileOpener, private file:File, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public getDatos:GetDatosProvider) {

    var padre = this.navParams.get('padre');
    if(padre){

      this.evento_hijo = this.navParams.get('evento').id;

    }else{

      this.evento_hijo = this.navParams.get('evento').evento_id[0];
    }

		

    this.permisos = this.navParams.get('permisos');
    //console.log('permisos:'+ this.permisos);
    if(this.permisos == 'is_client' || this.permisos == 'is_chofer'){
      //this.ver_segmento = false;
      this.ver_segmento = false;
    }else{

      this.ver_gastos = true;
    }    

        //var tmp_gastos = JSON.parse(eventos.rows.item(i).gastos_ids);

        this.initReserva();
		//this.initializeCategories();
        //console.log(JSON.stringify(this.navParams.get('evento')));
            
	}

  private async initReserva(){
        
    var self = this;
    self.itinerario = [];
    self.gastos_ciudad = [];

    self.cargar = true;

    await self.getDatos.ejecutarSQL('SELECT * FROM eventos WHERE id = ' + self.evento_hijo).then(
        function(eventos: {rows}){


            var tmp_gastos_ids = JSON.parse(eventos.rows.item(0).gastos_ids);
            var tmp_representante_id = JSON.parse(eventos.rows.item(0).representante_id);
            self.default_repre = tmp_representante_id;
            var tmp_cliente_id = JSON.parse(eventos.rows.item(0).cliente_id);
            self.default_cliente = tmp_cliente_id;

            self.reserva = eventos.rows.item(0);
            self.reserva.gastos_ids = tmp_gastos_ids;
            self.reserva.representante_id = tmp_representante_id;
            self.reserva.cliente_id = tmp_cliente_id;

        },
        fail=>{
            console.log('Fail load evento')
        }
    );

    await self.getDatos.ejecutarSQL('SELECT name, ciudad_id, Fecha_Inicio, id FROM eventos WHERE is_padre = "false" and  name = "' + self.reserva.name +'"').then(
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
        },
        fail=>{
            console.log('Fail load evento')
        }
    ); 

    await self.getDatos.ejecutarSQL('SELECT * FROM attachment WHERE cliente_id = "' + self.reserva.cliente_id[0] +'"').then(
        function(attachment: {rows}){

                                         
            for(var i=0; i<attachment.rows.length; i++) {

                var att = attachment.rows.item(i)
                att.file_size = self.getDatos.bytesToSize(parseInt(att.file_size))
                //var tmp_file_size = attachment.rows.item(i).file_size;
                //console.log('file size:' + );
                //console.log(JSON.stringify(attachment.rows.item(i)));      
                self.attachment.push(att);                                                   
            }
            
        },
        fail=>{
            console.log('Fail load gastos')
        }
    );

    var tmp_gastos = self.reserva.gastos_ids;
    var where = '(';
    for (var i = tmp_gastos.length - 1; i >= 0; i--) {
       
       where = where + tmp_gastos[i] + ",";
    }
    where = where.substring(0, where.length - 1); // "12345.0"
    where = where + ')'
    var sql = 'SELECT * FROM gastosciudad WHERE id in ' + where;
    console.log(sql);
    await self.getDatos.ejecutarSQL(sql).then(
        function(gastos: {rows}){

            
            console.log(JSON.stringify(gastos));
            for(var i=0; i<gastos.rows.length; i++) {
                 
                console.log(JSON.stringify(gastos.rows.item(i)));                         
                var tmp_evento_id = JSON.parse(gastos.rows.item(i).evento_id)
                //var tmp_ciudad_id = JSON.parse(gastos.rows.item(i).ciudad_id)
                 
                var concepto = gastos.rows.item(i);

                concepto.evento_id = tmp_evento_id;

                self.gastos_ciudad.push(concepto);               
                
            }            

        },
        fail=>{
            console.log('Fail load gastos')
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

    self.cargar = false;                                   
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

  private agregarGasto(){

    this.navCtrl.push(GastosRelPage, {gastos_rel:null});    
  }

  private abrirGasto(gasto){

      this.navCtrl.push(GastosRelPage, {gastos_rel:gasto});
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

  private cargarEvento(evt){

    this.navCtrl.push(EventoPage, {evento: evt, permisos:'is_root'});

  }

  private editar() {

  
      if (!this.editable) {
          this.editable = true;   
          
      } else {
          this.editable = false;
          
      }
  }

  private agregarEvento(){

    this.navCtrl.push(EventoPage, {evento: null , permisos:'is_root'});      
  }

  private agregarAttachment(){


    var self = this;
        let profileModal = this.modalCtrl.create(DocumentoPage);
        
        profileModal.onDidDismiss(data => {
                

            /*if (data != 'x') {
              
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
              
            }*/
        });

        profileModal.present();

  }

}
