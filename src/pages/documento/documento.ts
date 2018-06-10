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
	  		/*self.file.resolveLocalFilesystemUrl(result)
	  		.then(content=>{
						        console.log(content);
						        //console.log(self.doc.datas);
						        //alert(JSON.stringify(content));
						      })
						      .catch(err=>{
						        console.log(err);
						        //alert(JSON.stringify(err));
						      });*/
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

		  	/*self.filePath.resolveNativePath(uri).then( 
			  	(result) => {

			  		let path = result.substring(0, result.lastIndexOf('/'));
			  		console.log(path);
			  		self.nombre_archivo = result.substring(result.lastIndexOf('/')+1, result.length);	
			  		self.doc.name = self.nombre_archivo;	  		

			  		self.file.readAsBinaryString(path, self.nombre_archivo)
						      .then(content=>{
						        content = (<any>window).btoa(content);
						        self.doc.datas = content;
						        //console.log(self.doc.datas);
						        //alert(JSON.stringify(content));
						      })
						      .catch(err=>{
						        console.log(err);
						        //alert(JSON.stringify(err));
						      });

	   		
	   			}).catch(e => console.log(e));*/

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
						        //console.log(self.doc.datas);
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
    	
		
		/*ciudades:[[6, false, [3]]],
								Tipo_Documento:false,
								cliente_id:142,
								company_id:1,
								concepto_id:2,
								datas:dato.datas,//"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…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",
								datas_fname:"76d6f27b-e433-47ce-bdf0-c6f8764135c0.pdf",
								description:false,
								eventos_id:false,
								is_cliente:false,
								is_general:true,
								is_interno:true,
								name:"fsdfasdf",
								public:false,
								type:"binary",
								url:false}*/

    	var campos;
			campos = {
				Tipo_Documento:self.doc.Tipo_documento,
				cliente_id:0,
				name:self.doc.name,
				type:self.doc.type,
				datas:self.doc.datas,
				ciudades: [0, false, self.doc.ciudades],//self.doc.ciudades,
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


		//console.log(JSON.stringify(campos))
		self.closeModal(campos)
		//self.closeModal(campos)
			 
		
		
	}

	public eliminar(){

		this.closeModal('x');

	}

}
