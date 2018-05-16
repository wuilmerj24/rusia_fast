//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { TablasProvider } from '../tablas/tablas';

declare var OdooApi: any;
/*
  Generated class for the GetDatosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetDatosProvider {

	private db: SQLiteObject = null;

	//private url = '/api';
	//private url = 'http://odoo.devoptions.mx';     //"http://odoo.devoptions.mx"
	//private url = 'https://rusiatoursmoscu.com:443';    //"proxyUrl":"http://rusiatoursmoscu.com"
	//private url = '185.129.251.102:443';    //"proxyUrl":"http://rusiatoursmoscu.com"
	private url = 'https://rusiatoursmoscu.com';    //"proxyUrl":"http://rusiatoursmoscu.com"

	public usr = null;	
	private eventoHijo = [];
	private gastos_ciudad = [];

	private bd_conf = {
      name: 'ionicdb.db',
      location: 'default'
    };

	constructor(private sqlite: SQLite, private tablas:TablasProvider) {

		var self = this;

		//console.log('constructor creado primero');
    	self.ejecutarSQL("SELECT * FROM user WHERE usuario IS NOT NULL").then(

			function(data:{rows}){
				//console.log(JSON.stringify(data));
				self.usr = data.rows.item(0);
				//console.log(JSON.stringify(data.rows.item(0)));
			},
			function(){
				console.log('Error get table user');				
			}
		);

	}

	public ejecutarSQL(select){


		var self = this;
		var promise = new Promise(function (resolve, reject) {
            
            
			self.sqlite.create(self.bd_conf).then((db: SQLiteObject) => {
		     	          	
				db.executeSql(select, {})
					.then(res => {

						resolve(res);
					}).catch(e => {
						console.log(e.message);
						reject(e);
					});

		  	}).catch(e => {
		  		console.log('Error en ejecutarSQL');
		  		console.log(e.message);
		  		reject(e)
		  	});

        });

        return promise;	

	}

	public bytesToSize(bytes:number) {
	   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	   if (bytes == 0) return '0 Byte';
	   var i = Math.floor(Math.log(bytes) / Math.log(1024));
	   return Math.round((bytes / Math.pow(1024, i))) + ' ' + sizes[i];
	};

	public cargarGastosConceptos(){

		var self = this;
		var sql = [];
		var promise = new Promise(function (resolve, reject) {
            
            //console.log('-----------------entro3 ---------------');
            self.search_read('rusia.gastostours', [["ciudades", "in", [2,3,4,5,6,7]]], ["gasto_id","name", "ciudades"])
	  		.then(function(gastostours) {
	  		

	  			//console.log(JSON.stringify(gastostours));
	  			//console.log('resolvio gastos');
	  			//console.log('-----------------entro4 ---------------');
	  			//console.log(JSON.stringify(attachment));
	  			//if(borrar == true){
		  		//	sql.push('DELETE FROM attachment;');
	  			//}	


	  			//console.log(JSON.stringify(gastostours))
	            
		  		Object.keys(gastostours).forEach(key=> {

				    var registro = "INSERT OR IGNORE INTO gastostours "+
				    	"(id, name, ciudades)"+
				    	" VALUES (" + gastostours[key].id + ", '"+gastostours[key].name+"', '"+JSON.stringify(gastostours[key].ciudades) +"');";

				    //console.log(registro);
				    sql.push(registro);
				}); 

				self.insertBatch(sql)
			        .then(res => {
			        	//console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
			        	resolve();
							
					}).catch(e => {
			  		console.log('Error en insertBatch DB');
			  		console.log(e.message);
			  		reject(e) 
			  	});

			
		  	}, 
			function() {
		  		
		  		console.log('Error search_read - Loading offline attachment');
		  		//console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
		  		reject();							  		
			});

			

        });

        return promise;	

	}

	private insertBatch(sql){
		var self = this;
		var promise = new Promise(function (resolve, reject) {
			self.sqlite.create(self.bd_conf).then((db: SQLiteObject) => {

			    	db.sqlBatch(sql)
			        .then(res => {
			        	//console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
			        	resolve();
							
					}).catch(e => {
						console.log(e.message);
						reject(e);
					});

		    	}).catch(e => {
			  		console.log('Error en conexion DB');
			  		console.log(e.message);
			  		reject(e) 
			  	});
		    }
	    );
		return promise;
	}

	public cargarAttachment(borrar){

		var self = this;
		var sql = [];
		var promise = new Promise(function (resolve, reject) {
            
            //console.log('-----------------entro3 ---------------');
            self.search_read('ir.attachment', [["id", "<>", 0], ["cliente_id", "<>", false]], self.tablas.Tbl_attachment_odoo)
	  		.then(function(attachment) {
	  		

	  			//console.log('resolvio gastos');
	  			//console.log('-----------------entro4 ---------------');
	  			//console.log(JSON.stringify(attachment));
	  			if(borrar == true){
		  			sql.push('DELETE FROM attachment;');
	  			}	
	            
		  		Object.keys(attachment).forEach(key=> {

		  			var registro = "INSERT OR IGNORE INTO attachment "+
				    	"(id, cliente_id, file_size, name, eventos_id, is_cliente)"+
				    	" VALUES (" + attachment[key].id + ", '"+attachment[key].cliente_id[0]+"', '" +attachment[key].file_size+"', '" 
				    	+attachment[key].name +"', '"+attachment[key].eventos_id[0]+"', '"+attachment[key].is_cliente+"');";
				    //console.log(registro); 


				    sql.push(registro);
				}); 

				self.insertBatch(sql)
			        .then(res => {
			        	//console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
			        	resolve();
							
					}).catch(e => {
			  		console.log('Error en insertBatch DB');
			  		console.log(e.message);
			  		reject(e) 
			  	});

			
		  	}, 
			function() {
		  		
		  		console.log('Error search_read - Loading offline attachment');
		  		//console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
		  		reject();							  		
			});

			

        });

        return promise;	
    
	}

	private cargarGastosCiudad(borrar){

		var self = this;
		var sql = [];
		var promise = new Promise(function (resolve, reject) {
            
            //console.log('-----------------entro3 ---------------');
            //console.log('-----------------cargarGastosCiudad ---------------');
            //console.log(self.gastos_ciudad);
            self.read('rusia.gastos.ciudad', self.gastos_ciudad, self.tablas.Tbl_gastos_ciudad_odoo)
	  		.then(function(gastos) {
	  		

	  			//console.log('resolvio gastos');
	  			
	  			//console.log(JSON.stringify(attachment));
	  			if(borrar == true){
		  			sql.push('DELETE FROM gastosciudad;');
	  			}	
	            
		  		Object.keys(gastos).forEach(key=> {


		  			var registro = "INSERT OR IGNORE INTO gastosciudad "+
				    	"(id, fecha_pago_reserva, Total_Beneficios, tarjeta_usd_pos, tarjeta_usd, tarjeta_rub, "+
				    	"Total_Pagado_Web, tarjeta_eur_pos, Total_Tarjeta, Total_Paypal, Total_Rub, Total_Representante, "+
				    	"Total_Pago_Clientes, gasto_usd, concepto_id, gasto_paypal, Total_Usd, tarjeta_eur, gasto_rub, "+
				    	"gasto_eur, Total_Euros, display_name, dia, evento_id)"+
				    	" VALUES (" + gastos[key].id+ ", '"+gastos[key].fecha_pago_reserva+ "', '"+
				    	gastos[key].Total_Beneficios+ "', '"+gastos[key].tarjeta_usd_pos+ "', '"+
				    	gastos[key].tarjeta_usd+ "', '"+gastos[key].tarjeta_rub+ "', '"+
				    	gastos[key].Total_Pagado_Web+ "', '"+gastos[key].tarjeta_eur_pos+ "', '"+
				    	gastos[key].Total_Tarjeta+ "', '"+gastos[key].Total_Paypal+ "', '"+
				    	gastos[key].Total_Rub+ "', '"+gastos[key].Total_Representante+ "', '"+
				    	gastos[key].Total_Pago_Clientes+ "', '"+gastos[key].gasto_usd+ "', '"+
				    	JSON.stringify(gastos[key].concepto_id)+ "', '"+gastos[key].gasto_paypal+ "', '"+gastos[key].Total_Usd+ "', '"+
				    	gastos[key].tarjeta_eur+ "', '"+gastos[key].gasto_rub+ "', '"+gastos[key].gasto_eur+ "', '"+
				    	gastos[key].Total_Euros+ "', '"+gastos[key].display_name +"',  '"+gastos[key].dia+"', '"+JSON.stringify(gastos[key].evento_id)+ "');";


				    //console.log(registro);
				    sql.push(registro);
				});

				self.insertBatch(sql)
			        .then(res => {
			        	//console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
			        	resolve();
							
					}).catch(e => {
			  		console.log('Error en insertBatch DB');
			  		console.log(e.message);
			  		reject(e) 
			  	});

			
		  	}, 
			function() {
		  		
		  		console.log('Error search_read - Loading offline attachment');
		  		//console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
		  		reject();							  		
			});

			

        });

        return promise;	

	};

	public cargarGastos(borrar){
		var self = this;
		var sql = [];
		var promise = new Promise(function (resolve, reject) {
            
            self.search_read('rusia.gastostoursline', [["id", "<>", 0]], self.tablas.Tbl_gastos_odoo)
	  		.then(function(gastos) {
	  		

	  			//console.log('resolvio gastos');
	  			if(borrar == true){
		  			sql.push('DELETE FROM gastostoursline;');
	  			}	
	            
		  		Object.keys(gastos).forEach(key=> {

				    var registro = "INSERT OR IGNORE INTO gastostoursline "+
				    	"(id, concepto_gasto_id, tipo_moneda, Total, fecha, ciudad_id, observaciones, usuario_id, evento_padre, eventos_id)"+
				    	" VALUES (" + gastos[key].id + ", '"+JSON.stringify(gastos[key].concepto_gasto_id)+"', '" 
				    	+gastos[key].tipo_moneda +"', '"+ gastos[key].Total+ "', '" + gastos[key].fecha +"', '"+
				    	JSON.stringify(gastos[key].ciudad_id)+"', '"+gastos[key].observaciones+"', '"+JSON.stringify(gastos[key].usuario_id)+"', '"+gastos[key].evento_padre+"', '"+ gastos[key].eventos_id[0] +"');";

				    //console.log(registro);
				    sql.push(registro);
				}); 
			    //console.log(JSON.stringify(sql));  										   


			    self.insertBatch(sql)
			        .then(res => {
			        	//console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
			        	resolve();
							
					}).catch(e => {
			  		console.log('Error en insertBatch DB');
			  		console.log(e.message);
			  		reject(e) 
			  	});	   			

		  	}, 
			function() {
		  		
		  		console.log('Error search_read - Loading offline gastos');
		  		//console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
		  		resolve();							  		
			});					

        });

        return promise;	
    	
	}

	private parseDato(dato){
		//console.log(typeof dato)
		//console.log((dato == 'false'));

		//dato = 
		return ((dato == 'false' || dato == false)?"":dato.replace(/\'/g, ""));
	}

	//private cargarGastosEvento
	
	private guardarEventos(eventos, is_padre, borrar){

		var self = this;
		//self.eventoHijo = [];
		var promise = new Promise(function (resolve, reject) {
			//console.log('resolvio eventos');
  			//console.log(JSON.stringify(eventos));
  			var sql = [];
  			if(borrar == true){
  				sql.push('DELETE FROM eventos;');	
  			}
	  		Object.keys(eventos).forEach(key=> {
	  			

	  			//console.log('Inner B'+ tmp_dominio)
	  			//console.log(JSON.stringify(eventos[key].gastos_ids));
	  			if(is_padre == false){

	  				//console.log('cargar evento padre---------------------->' + self.eventoHijo.indexOf(eventos[key].name));

	  				if(self.eventoHijo.indexOf(eventos[key].evento_id[0]) == -1) {

	  					var evento_id = eventos[key].evento_id[0];
	  					if (evento_id != null) {
	  						self.eventoHijo.push(eventos[key].evento_id[0]);
	  					}
			    		
			    		//console.log('Es evento padre---------------------->')
			      		//console.log(self.eventoHijo);
			    	}	
	  			}else{
	  				//gastos_ciudad
	  				//agrego los

					var gastos_ids = eventos[key].gastos_ids;
					//console.log(JSON.stringify(gastos_ids));
					for (var i = gastos_ids.length - 1; i >= 0; i--) {
						
						if(self.gastos_ciudad.indexOf(gastos_ids[i]) == -1) {

	  						//var gasto_id = eventos[key].gastos_ids[key2];
	  						self.gastos_ciudad.push(gastos_ids[i]);			      			
			    		}
					}

	  				/*
	  				Object.keys(gastos_ids).forEach(key2=> {

	  					
	  				});*/

	  				//console.log(JSON.stringify(self.gastos_ciudad));
	  			}			  			
	  			var registro = "INSERT OR IGNORE INTO eventos "+
			    	"(id, cliente_id_tmp, cliente_id, representante_id,"+
			    	" Fecha_Inicio, hora_inicio , hora_final, hora_chofer, name, is_padre, fecha_padre, guia_id,"+
			    	" chofer_id_tmp, chofer_id, gasto_rub, gasto_eur, gasto_usd, gasto_paypal, Comentarios_Chofer,"+
			    	" Comentarios_Internos, Comentarios_Cliente, Comentarios_Guia, Fecha_Fin, Transporte, hotel_id,"+
			    	" ciudad_id, Total_Representante, message, numero_pax, evento_id, Servicio_Gastos, tarjeta_eur,"+
			    	" tarjeta_rub, tarjeta_usd, is_guia, is_traslado, gastostoursline_ids, guia_id_tmp, gastos_ids,"+
			    	" servicio_id, salario, observaciones_solicitud)"+
			    	" VALUES (" + eventos[key].id + ", '"+eventos[key].Datos_Cliente_id[0]+"', '" + JSON.stringify(eventos[key].Datos_Cliente_id)+"', '" +
			    	JSON.stringify(eventos[key].representante_id)+ "', '" + eventos[key].Fecha_Inicio +"','" + 
			    	eventos[key].hora_inicio + "', '" + eventos[key].hora_final + "', '" + self.parseDato(eventos[key].hora_chofer) + "', '" + 
			    	eventos[key].name + "', '" + eventos[key].is_padre +"', '" + 
			    	eventos[key].fecha_padre +"', '" + JSON.stringify(eventos[key].guia_id)+ "' , '" + 
			    	eventos[key].chofer_id[0] + "' , '" +JSON.stringify(eventos[key].chofer_id) + "' , '" + eventos[key].gasto_rub + "' , '" + 
			    	eventos[key].gasto_eur + "' , '" + eventos[key].gasto_usd + "' , '" + 
			    	eventos[key].gasto_paypal + "', '" + self.parseDato(eventos[key].Comentarios_Chofer) + "', '" + 
			    	self.parseDato(eventos[key].Comentarios_Internos) + "', '" + self.parseDato(eventos[key].Comentarios_Cliente) + "', '" + 
			    	self.parseDato(eventos[key].Comentarios_Guia) + "', '" + eventos[key].Fecha_Fin + "', '"+
			    	self.parseDato(eventos[key].Transporte)+"', '"+JSON.stringify(eventos[key].hotel_id)+"', '"+JSON.stringify(eventos[key].ciudad_id)+"', '"+
			    	eventos[key].Total_Representante+"', '"+self.parseDato(eventos[key].message)+"', '"+eventos[key].numero_pax+"', '"+
			    	JSON.stringify(eventos[key].evento_id)+"', '"+eventos[key].Servicio_Gastos+"', '"+eventos[key].tarjeta_eur+"', '"+
			    	eventos[key].tarjeta_rub+"', '"+eventos[key].tarjeta_usd+"' , '"+eventos[key].is_guia+"', '"+eventos[key].is_traslado+"', '"+ 
			    	JSON.stringify(eventos[key].gastostoursline_ids)+"', '"+eventos[key].guia_id[0]+"', '"+ JSON.stringify(eventos[key].gastos_ids) +"', '"+
			    	JSON.stringify(eventos[key].servicio_id)+"', '"+eventos[key].salario+"', '"+self.parseDato(eventos[key].observaciones_solicitud)+"');";
			    console.log(registro);							  			
			    sql.push(registro);
			});

			self.insertBatch(sql)
			        .then(res => {
			        	//console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
			        	resolve();
							
					}).catch(e => {
			  		console.log('Error en insertBatch DB');
			  		console.log(e.message);
			  		reject(e) 
			  	});


		});

		return promise;
	}

	private cargarEventos(tmp_dominio, borrar){

		var self = this;
		//self.eventoHijo = [];
		var promise = new Promise(function (resolve, reject) {

			var dominio = [];

			//console.log('Inner A'+ tmp_dominio)
			if(tmp_dominio == null){

				//console.log('tmp_dominio is null -------------------------------------------------------1');
				//console.log(JSON.stringify(self.eventoHijo));
				self.read('rusia.eventos', self.eventoHijo, self.tablas.Tbl_eventos_odoo).then(
					eventos=>{
						//console.log(' va por los padres -------------------------------------------------------2');
						//console.log(JSON.stringify(eventos));
						self.guardarEventos(eventos, true, false).then(
		      				res=>{
		      					//console.log(' entro a  cargarGastosCiudad-------------------------------------------------------2');
		      					self.cargarGastosCiudad(borrar).then(
		      						res=>{
				      					resolve();
				      				},
				      				fail=>{
				      					reject();
				      				}
		      					);		      					
		      				},
		      				fail=>{
		      					reject();
		      				}
		      			);
					},
					fail=>{

						reject();
					}
					
				)

			}else{

				
			self.search_read('rusia.eventos', tmp_dominio, self.tablas.Tbl_eventos_odoo)
	      		.then(function(eventos) {

	      			
	      			self.guardarEventos(eventos, false, borrar).then(
	      				res=>{
	      					resolve();
	      				},
	      				fail=>{
	      					reject();
	      				}
	      			)
	      					
			  	}, 
				function() {
			  		reject();						  		
				});	
	      	}
		});

		return promise;

	}


	public async cargarCalendario(borrarE, borrarG, borrarA, borrarC){

		var self = this;

		var dominioUsers = null;
		var dominio; 
		var dominioSol = null;
		
		try{

			if(self.usr.tipo_usuario + '' == 'is_root'){
				dominio = [['is_padre', '=' , false]];
				dominioSol = [
				["is_padre", "=", false],
				["is_guia", "=", true],
				["guia_id", "=", false]];


			}else if(self.usr.tipo_usuario + '' == 'is_client'){
				dominio = [['is_padre', '=' , false],["Datos_Cliente_id", "=", self.usr.id]];

			}else if(self.usr.tipo_usuario + '' == 'is_guia'){
				
				dominio = [['is_padre', '=' , false], ["guia_id", "=", self.usr.id]];
				dominioUsers = [["is_client", "=", false], ["is_rep", "=", false]];
				dominioSol = [
				["is_padre", "=", false],
				["is_guia", "=", true],
				["guia_id", "=", false]];
				
															

			}else if(self.usr.tipo_usuario + '' == 'is_chofer'){
				dominio = [['is_padre', '=' , false], ["chofer_id", "=", self.usr.id]];
				dominioUsers = [["is_client", "=", false], ["is_rep", "=", false]];
				dominioSol = [
				["is_padre", "=", false],
				["is_traslado", "=", true],
				["chofer_id", "=", false]];				
			}


			if(borrarE){

				console.log('----------  Cargar los eventos asignados');
				await self.cargarEventos(dominio,borrarE);
				console.log('----------  Cargar los eventos para la tabla solicitudes');
				await self.cargarEventos(dominioSol, false);
				console.log('----------  Cargar los eventos padres');
				await self.cargarEventos(null, false);	
			}
			

			if(borrarG){

				console.log('----------  await self.cargarGastos(false);;');				
				await self.cargarGastos(borrarG);	
			}
			if(borrarA){

				console.log('----------  await self.cargarAttachment(false);');
				await self.cargarAttachment(borrarA);	
			}
			if(borrarC){

				console.log('----------  await self.cargarGastosConceptos();');
				await self.cargarGastosConceptos();//-> no lo carga el usuario
			}				

			if(dominioUsers != null){

				await self.cargarUsuario(dominioUsers);
			}

			return self.usr;

		}catch(e){

			return self.usr;
		}

	}

	public eliminar(tabla, id){
		
		var self = this;//http://185.129.251.102
		var promise = new Promise(function (resolve, reject) {

			//for(var i=0; i<data.rows.length; i++) {
                
            //    self.reservas.push(data.rows.item(i));                    
            //}
            var odoo = new OdooApi(self.url, self.usr.bd);
			odoo.login(self.usr.usuario, self.usr.pwd).then(
			function (uid) {

				

				odoo.delete(tabla, id).then(

		        function (ok_delete) {

		        	/*console.log(ok_delete);
		        	resolve(ok_delete);*/

		        	
		        	if(ok_delete){

		        		var tabla_bd = tabla.split('.')[1];

		        		//console.log("UPDATE " + tabla_bd + " SET " + set + " WHERE id = "+ dominio);
		        		console.log("DELETE FROM " + tabla_bd +" WHERE id = " + id);

		        		
		        		self.ejecutarSQL("DELETE FROM " + tabla_bd +" WHERE id = " + id).then(
		        			res =>{
		        				console.log('delete OK: ' + id);
		        				//console.log(JSON.stringify(res));
		        				resolve(ok_delete);
		        			},
		        			fail =>{				        				
		        				console.log('Fail update BD');
		        				reject();			
		        			}
		        		);				        		
		        		//resolve(ok_code);				        		
		        	}else{
		        		console.log('Fail update Odoo');
		        		reject();	
		        	}						
		        },
		    	function (){
		    		console.log('Error creating Odoo');
		    		reject();
		    	})

			},
			function (){
				console.log('error');
				reject()
			});
						
        });

        return promise;	   
	}

	public create(tabla, campos){

		var self = this;//http://185.129.251.102
		var promise = new Promise(function (resolve, reject) {

			//for(var i=0; i<data.rows.length; i++) {
                
            //    self.reservas.push(data.rows.item(i));                    
            //}
            var odoo = new OdooApi(self.url, self.usr.bd);
			odoo.login(self.usr.usuario, self.usr.pwd).then(
			function (uid) {

				

				odoo.create(tabla, campos).then(

		        function (ok_id) {

		        	resolve(ok_id);

		        
		        },
		    	function (){
		    		console.log('Error creating Odoo');
		    		reject();
		    	})

			},
			function (){
				console.log('error');
				reject()
			});
						
        });

        return promise;	        
	}	

	write(tabla, dominio, campos){

		var self = this;//http://185.129.251.102
		var promise = new Promise(function (resolve, reject) {
                               
            var odoo = new OdooApi(self.url, self.usr.bd);
			odoo.login(self.usr.usuario, self.usr.pwd).then(
			function (uid) {

				

				odoo.write(tabla, dominio, campos).then(

		        function (ok_code) {

		     
		        	resolve(ok_code);
		        },
		    	function (){
		    		console.log('Fail update Odoo');
		    		reject();
		    	})

			},
			function (){
				console.log('Fail connect Odoo');
				reject()
			});
        });

        return promise;	        
	}
	

	public call(tabla, metodo, id){

		var self = this;//http://185.129.251.102
		var promise = new Promise(function (resolve, reject) {
                    
          
            var odoo = new OdooApi(self.url, self.usr.bd);
			odoo.login(self.usr.usuario, self.usr.pwd).then(
			function (uid) {

				console.log('search_read OK');

				odoo.call(tabla, metodo, id).then(

		        function (tabla) {

		        	resolve(tabla);
		        	
		        },
		    	function (){
		    		console.log('error');
		    		reject();
		    	})

			},
			function (){
				console.log('error');
				reject()
			});
							

        });

        return promise;	        
	}

	public read(tabla, ids, campos){

		var self = this;//http://185.129.251.102
		var promise = new Promise(function (resolve, reject) {
                    
          
            var odoo = new OdooApi(self.url, self.usr.bd);
			odoo.login(self.usr.usuario, self.usr.pwd).then(
			function (uid) {

				console.log('search_read OK');

				odoo.read(tabla, ids, campos).then(

		        function (tabla) {

		        	resolve(tabla);
		        	
		        },
		    	function (){
		    		console.log('error');
		    		reject();
		    	})

			},
			function (){
				console.log('error');
				reject()
			});
							

        });

        return promise;	        
	}


	public search_read(tabla, dominio, campos){

		var self = this;//http://185.129.251.102
		var promise = new Promise(function (resolve, reject) {
                    
          	//console.log(JSON.stringify(campos))
            var odoo = new OdooApi(self.url, self.usr.bd);
			odoo.login(self.usr.usuario, self.usr.pwd).then(
			function (uid) {

				console.log('search_read OK');

				odoo.search_read(tabla, dominio, campos).then(

		        function (tabla) {

		        	resolve(tabla);
		        	
		        },
		    	function (){
		    		console.log('error');
		    		reject();
		    	})

			},
			function (){
				console.log('error');
				reject()
			});
							

        });

        return promise;	        
	}

	public deleteBD(){

		var self = this;
		self.sqlite.deleteDatabase(self.bd_conf).then(
	    	ok =>{ 
	    		console.log('BD deleted - OK');
	    		return true;},
	    	fail => { return false}
	    )
	}	

	private cargarUsuario(dominio){

		var self = this;


		var promise = new Promise(function (resolve, reject) {

			self.search_read('res.users', dominio, self.tablas.Tbl_user_odoo).then(
		 
		    	function (users) {

		    		//console.log(user[0]);
		    		var sql = [];
		    		Object.keys(users).forEach(key=> {


			  			var registro = "INSERT OR IGNORE INTO user "+
					    	"(id, gastos_users_ids,"+
					    	" company_id, ciudades, fax, is_correo, name, eventos_ids, state,"+
					    	"email, active, reps_gastos_ids, login, phone, mobile) VALUES (" + users[key].id +	", '"+JSON.stringify(users[key].gastos_users_ids)+"', '"+
					    	JSON.stringify(users[key].company_id)+"', '"+users[key].ciudades+"', '"+users[key].fax+"', '"+users[key].is_correo+"', '"+
					    	self.parseDato(users[key].name)+"', '"+JSON.stringify(users[key].eventos_ids)+"', '"+users[key].state+"', '"+users[key].email+"', '"+
					    	users[key].active+"', '"+JSON.stringify(users[key].reps_gastos_ids)+"', '"+users[key].login+"' ,'"+users[key].phone+"', '"+users[key].mobile+"' );"


					    //console.log(registro);
					    sql.push(registro);
					});

			        self.insertBatch(sql)
				        .then(res => {
				        	//console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
				        	resolve();
								
						}).catch(e => {
				  		console.log('Error en insertBatch DB');
				  		console.log(e.message);
				  		reject(e) 
				  	});


		    	//resolve();
		    	
		        },
		    	function (){
		    		console.log('Error get usuarios');
		    		reject();
		    	}
			)
		});

		return promise;
		

	}

	public cargarSolicitudes(borrar){

		var self = this;

		console.log('-------------------cargando solicitudes');
		var promise = new Promise(function (resolve, reject) {

			self.search_read('rusia.solicitud.eventos', [["procesado", "!=", true]], self.tablas.Tbl_solicitud_odoo).then(
		 
		    	function (solicitud) {

		    		//console.log(user[0]);
		    		var sql = [];

		    		if(borrar == true){
			  			sql.push('DELETE FROM solicitud;');
		  			}	
		    		Object.keys(solicitud).forEach(key=> {


			  			var registro = "INSERT OR IGNORE INTO solicitud "+
					    	"(id, usuario_id, name, servicio_id, tipo, salario, fecha, observaciones_solicitud, ciudad_id) VALUES (" + solicitud[key].id +	", '"+JSON.stringify(solicitud[key].usuario_id)+"', '"+
					    	JSON.stringify(solicitud[key].name)+"', '"+JSON.stringify(solicitud[key].servicio_id)+"', '"+solicitud[key].tipo+"', '"+solicitud[key].salario+"', '"+
					    	solicitud[key].fecha+"', '"+solicitud[key].observaciones_solicitud+"' , '"+JSON.stringify(solicitud[key].ciudad_id)+"');"


					    //console.log(registro);
					    sql.push(registro);
					});

			        self.insertBatch(sql)
				        .then(res => {
				        	//console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
				        	resolve();
								
						}).catch(e => {
				  		console.log('Error en insertBatch DB');
				  		console.log(e.message);
				  		reject(e) 
				  	});


		    	//resolve();
		    	
		        },
		    	function (){
		    		console.log('Error get usuarios');
		    		reject();
		    	}
			)
		});

		return promise;
		

	}

	private crearEsquema(conexion){

		var self = this;

		var promise = new Promise(function (resolve, reject) {
			if(conexion.usuario != '' && conexion.pwd != ''){

				//console.log()
        		var odoo = new OdooApi(self.url, conexion.bd);
				odoo.login(conexion.usuario, conexion.pwd).then(
				function (uid) {
					
					//vamos a cargar el usuario 
					odoo.search_read('res.users', [['login', '=', conexion.usuario]], //, '', 'date_begin',
			                         self.tablas.Tbl_user_odoo).then(
		 
				    	function (user) {

				    		//console.log(user[0]);
				    		console.log('get login user OK');


				    		var tipo = '';

				    		if(user[0].is_chofer == true){
				    			tipo = "is_chofer";
				    		} else if(user[0].is_guia == true){
				    			tipo = "is_guia";
				    		}else if(user[0].is_rep == true){
				    			tipo = "is_rep";
				    		}else if(user[0].is_client == true){
				    			tipo = "is_client";
				    		}else if(user[0].is_root == true){
				    			tipo = "is_root";
				    		}else if(user[0].is_general == true){
				    			tipo = "is_general";
				    		}else if(user[0].is_traslados == true){
				    			tipo = "is_traslados";
				    		}else {
				    			tipo = "is_client";
				    		}

				    		//creo todas las tablas

					        self.sqlite.create(self.bd_conf).then((db: SQLiteObject) => {
					      		//
					      		var sql = [self.tablas.Tbl_solicitud, self.tablas.Tbl_gastos_ciudad, self.tablas.Tbl_gastostours, self.tablas.Tbl_eventos, self.tablas.Tbl_gastos, self.tablas.Tbl_user, self.tablas.Tbl_attachment];

						      	db.sqlBatch(sql)
						      	.then(
						      		res => {
							      		console.log('Executed SQL');
							      		//
							      		var sql = [];
							      		//console.log('-----------------------------2');
									    sql.push("INSERT OR IGNORE INTO user "+
									    	"(id, usuario, pwd, bd, tipo_usuario, gastos_users_ids,"+
									    	" company_id, ciudades, fax, is_correo, name, eventos_ids, state,"+
									    	"email, active, reps_gastos_ids, login, phone, mobile) VALUES (" + uid +", '"+ conexion.usuario + "', '" 
									    	+ conexion.pwd +"', '" + conexion.bd + "', '" + tipo +	"', '"+JSON.stringify(user[0].gastos_users_ids)+"', '"+
									    	JSON.stringify(user[0].company_id)+"', '"+user[0].ciudades+"', '"+user[0].fax+"', '"+user[0].is_correo+"', '"+
									    	user[0].name+"', '"+JSON.stringify(user[0].eventos_ids)+"', '"+user[0].state+"', '"+user[0].email+"', '"+
									    	user[0].active+"', '"+JSON.stringify(user[0].reps_gastos_ids)+"', '"+user[0].login+"' ,'"+user[0].phone+"', '"+user[0].mobile+"' );");
										
							   			db.sqlBatch(sql)
								        .then(res => {
								        	
								        	self.ejecutarSQL('SELECT * FROM user where login = "'+user[0].login+'"' ).then(

												function(data:{rows}){

													self.usr = data.rows.item(0);
													resolve(tipo);
												},
												function(){
													console.log('Error get table user');	
													reject();			
												}
											);								        	
												
										}).catch(e => {
											console.log(e.message);
											reject(e);
										});

					  			}).catch(e => {
					  				console.log('Error en CREATE TABLE');
					  				console.log(e.message);
					  				reject(e)
					  			});

						  	}).catch(e => {
						  		console.log('Error en CONEXION BD');
						  		console.log(e.message);
						  		reject(e)
						  	});

			        	//resolve();
			        	
				        },
				    	function (){
				    		console.log('Error get usuarios');
				    		reject();
				    	}
			    	);

				},
				function (){
					console.log('Error conexion login');
					reject()
				});	
        	}else{
        		reject();
        	}
		});

		return promise;
	}

	public login(conexion){

		var self = this;//http://185.129.251.102
		//console.log('-----------------------------0');
		var promise = new Promise(function (resolve, reject) {
            
            self.ejecutarSQL('SELECT * FROM user WHERE usuario IS NOT NULL' ).then(

				function(data:{rows}){

					//console.log('---------------login by bd ---------------1');
					//console.log(JSON.stringify(data));
					if(data.rows.length > 0){

						self.usr = data.rows.item(0);
					}else{
						self.usr = null;
					}
					
					//console.log(JSON.stringify(data.rows.item(0)));
					//
		            if(self.usr != null){

		            	resolve(self.usr.tipo_usuario);
		            }else{
		            	//console.log('-----------------------------1');
		            	
		            }
				},
				function(){
					//console.log('Error get table user');				
					//console.log('---------------login by connet ---------------1');
					self.crearEsquema(conexion).then(
						res=>{
							resolve(res);
						},
						fail=>{
							reject();
						}
					);
				}
			);
            
            		    	
            
			
        });

        return promise;

	}

	private addCero(num){

        if (num < 10 && num.toString().length < 2 ) {
         return (num = '0' + num);
        }

        return num
    }

	public convertirFecha(fecha){
        var dateS = new Date(fecha)

        var date = new Date(dateS.getTime() + (dateS.getTimezoneOffset() * 60000));

        var year = date.getFullYear();
        var month = this.addCero(date.getMonth()+1);
        var dia = this.addCero(date.getDate())
        var hora = this.addCero(date.getHours())
        var minutos = this.addCero(date.getMinutes())
        var segundos = this.addCero(date.getSeconds())     

        //+ ' ' + hora + ':' + minutos + ':' + segundos
        return year+'-' + month + '-'+ dia;
    }

}
