import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { FilePath } from '@ionic-native/file-path';
import { Base64 } from '@ionic-native/base64';
import { FileChooser } from '@ionic-native/file-chooser';
import { File, IWriteOptions, FileEntry, IFile } from '@ionic-native/file';
import { IOSFilePicker } from '@ionic-native/file-picker';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';

@Component({
  selector: 'page-documento',
  templateUrl: 'documento.html',
})
export class DocumentoPage {

	private doc = {
		name:null,
		type:'binary',
		datas:'',
		url:'',		
		ciudades:'',
		concepto_id:'',
		is_cliente:false,
		is_general:true,
		is_interno:true,
		Tipo_documento:'',
		res_id:null,

	}

	private nombre_archivo;
	private cargar = true;

	private archivo = true;
	private url = false;

	private ciudades = [];
	constructor(private filePicker: IOSFilePicker, public getDatos:GetDatosProvider, public plt: Platform, private file:File, public viewCtrl: ViewController, private base64: Base64, private filePath: FilePath, private fileChooser: FileChooser, public navCtrl: NavController, public navParams: NavParams) {

		var self = this;
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
	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad DocumentoPage');
	}

	closeModal(dato) {
        if (dato == 'x') {
            this.viewCtrl.dismiss('x');
        } else {
            this.viewCtrl.dismiss(dato);
        }
    }

  	private agregarAttachment(){


		var self = this;
		if (this.plt.is('ios')) {
	      // This will only print when on iOS
	      console.log('I am an iOS device!');
	      self.filePicker.pickFile()
		  .then(result => {
		  	console.log(result);
		  	let path = result.substring(0, result.lastIndexOf('/'));
	  		console.log(path);
	  		self.nombre_archivo = result.substring(result.lastIndexOf('/')+1, result.length);	
	  		self.doc.name = self.nombre_archivo;
	  		console.log(self.nombre_archivo);
	  		console.log('file://'+path);

		  	self.file.readAsBinaryString('file://'+path, self.nombre_archivo)
						      .then(content=>{
						        content = (<any>window).btoa(content);
						        self.doc.datas = content;
						        console.log(self.doc.datas);
						        //alert(JSON.stringify(content));
						      })
						      .catch(err=>{
						        console.log(err);
						        //alert(JSON.stringify(err));
						      });


		  })
		  .catch(err => console.log('Error', err));

	    }else{

			self.fileChooser.open()
			  .then(uri => {


			  self.filePath.resolveNativePath(uri).then( 
			  	(result) => {

			  		let path = result.substring(0, result.lastIndexOf('/'));
			  		console.log(path);
			  		self.nombre_archivo = result.substring(result.lastIndexOf('/')+1, result.length);	
			  		self.doc.name = self.nombre_archivo;	  		

			  		self.file.readAsBinaryString(path, self.nombre_archivo)
						      .then(content=>{
						        content = (<any>window).btoa(content);
						        self.doc.datas = content;
						        console.log(self.doc.datas);
						        //alert(JSON.stringify(content));
						      })
						      .catch(err=>{
						        console.log(err);
						        //alert(JSON.stringify(err));
						      });

	   		
	   			}).catch(e => console.log(e));

			  	

			  	 

			  	//self.file.readAsDataURL()
			  	//console.log(uri
			  	/**/

			  })
			  .catch(e => console.log(e));
	    }

	}

	onChange($event){
		console.log($event.target.value);
	}

	private guardar(){


		var self = this;

		if(self.doc.concepto_id == null || self.doc.name == null){
			return;
		}
		this.cargar = true;

    	var campos;
			campos = {
				Tipo_Documento:self.doc.Tipo_documento,
				cliente_id:0,
				name:self.doc.name,
				type:self.doc.type,
				datas:self.doc.datas,
				ciudades: [6, false, []],//self.doc.ciudades
				is_cliente:self.doc.is_cliente,
				is_general:self.doc.is_general,
				is_interno:self.doc.is_interno,
				concepto_id:self.doc.concepto_id,	
				company_id:1,			
				datas_fname:self.nombre_archivo,
				description:false,
				eventos_id:false,								
				public:false,				
				url:false	
			};


		console.log(JSON.stringify(campos))
		self.closeModal(campos)
		//self.closeModal(campos)
			 
		
		
	}

	public eliminar(){

		this.closeModal('x');

	}

}
