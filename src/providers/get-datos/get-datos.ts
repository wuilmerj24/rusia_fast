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

	private url = '/api';

	public usr = null;	

	private bd_conf = {
      name: 'ionicdb.db',
      location: 'default'
    };

	constructor(private sqlite: SQLite, private tablas:TablasProvider) {

		var self = this;

		//console.log('constructor creado primero');
    	self.ejecutarSQL("SELECT * FROM user").then(

			function(data:{rows}){
				console.log(JSON.stringify(data));
				self.usr = data.rows.item(0);
				console.log(JSON.stringify(data.rows.item(0)));
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

	/*public borrarTablas(tablas){
		var self = this;
		var promise = new Promise(function (resolve, reject) {
            
            
			self.sqlite.create(self.bd_conf).then((db: SQLiteObject) => {
		      

		      	var sql = [];
		      	Object.keys(tablas).forEach(key=> {

		      		//sql.push('DROP TABLE IF EXISTS '+tablas[key]);
		      		console.log('DROP TABLE IF EXISTS '+tablas[key]);
		      	});

		      	db.sqlBatch(sql).then(
	      		res => {
		      		console.log('----------Drop tables - OK---------');
		      		resolve();
		      	}).catch(e => {
	  				console.log('Error Drop tables');
	  				console.log(e.message);
	  				reject(e)
	  			});
  			}).catch(e => {
		  		console.log('Error en conexion bd');
		  		console.log(e.message);
		  		reject(e)
		  	});
	  	});

	  	return promise;
	}*/

	public cargarAttachment(borrar){

		var self = this;
		var sql = [];
		var promise = new Promise(function (resolve, reject) {
            
            
            self.search_read('ir.attachment', [["id", "<>", 0], ["cliente_id", "<>", false]], self.tablas.Tbl_attachment_odoo)
	  		.then(function(attachment) {
	  		

	  			//console.log('resolvio gastos');
	  			//console.log('-----------------entro3 ---------------');
	  			//console.log(JSON.stringify(attachment));
	  			if(borrar == true){
		  			sql.push('DELETE FROM attachment;');
	  			}	
	            
		  		Object.keys(attachment).forEach(key=> {

				    console.log("INSERT OR IGNORE INTO attachment "+
				    	"(id, cliente_id, file_size, name)"+
				    	" VALUES (" + attachment[key].id + ", '"+attachment[key].cliente_id[0]+"', '" +attachment[key].file_size+"', '" 
				    	+attachment[key].name +"');"); 


				    sql.push("INSERT OR IGNORE INTO attachment "+
				    	"(id, cliente_id, file_size, name)"+
				    	" VALUES (" + attachment[key].id + ", '"+attachment[key].cliente_id[0]+"', '" +attachment[key].file_size+"', '" 
				    	+attachment[key].name +"');");
				}); 

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

				//console.log('-----------------Fin ---------------');
				//resolve();
			    //console.log(JSON.stringify(sql));  										   



	   			

		  	}, 
			function() {
		  		
		  		console.log('Error search_read - Loading offline attachment');
		  		//console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
		  		reject();							  		
			});

			

        });

        return promise;	
    
	}

	public cargarGastos(borrar){
		var self = this;
		var sql = [];
		var promise = new Promise(function (resolve, reject) {
            
            
			self.sqlite.create(self.bd_conf).then((db: SQLiteObject) => {

		    	self.search_read('rusia.gastostoursline', [["id", "<>", 0]], self.tablas.Tbl_gastos_odoo)
			  		.then(function(gastos) {
			  		

			  			//console.log('resolvio gastos');
			  			if(borrar == true){
				  			sql.push('DELETE FROM gastostoursline;');
			  			}	
			            
				  		Object.keys(gastos).forEach(key=> {

						    /*console.log("INSERT OR IGNORE INTO gastostoursline "+
						    	"(id, concepto_gasto_id, tipo_moneda, Total, fecha, ciudad_id, observaciones, usuario_id, evento_padre, eventos_id)"+
						    	" VALUES (" + gastos[key].id + ", '"+JSON.stringify(gastos[key].concepto_gasto_id)+"', '" 
						    	+gastos[key].tipo_moneda +"', '"+ gastos[key].Total+ "', '" + gastos[key].fecha +"', '"+
						    	JSON.stringify(gastos[key].ciudad_id)+"', '"+gastos[key].observaciones+"', '"+JSON.stringify(gastos[key].usuario_id)+"', '"+gastos[key].evento_padre+"', '"+ JSON.stringify(gastos[key].eventos_id) +"');"); */


						    sql.push("INSERT OR IGNORE INTO gastostoursline "+
						    	"(id, concepto_gasto_id, tipo_moneda, Total, fecha, ciudad_id, observaciones, usuario_id, evento_padre, eventos_id)"+
						    	" VALUES (" + gastos[key].id + ", '"+JSON.stringify(gastos[key].concepto_gasto_id)+"', '" 
						    	+gastos[key].tipo_moneda +"', '"+ gastos[key].Total+ "', '" + gastos[key].fecha +"', '"+
						    	JSON.stringify(gastos[key].ciudad_id)+"', '"+gastos[key].observaciones+"', '"+JSON.stringify(gastos[key].usuario_id)+"', '"+gastos[key].evento_padre+"', '"+ gastos[key].eventos_id[0] +"');");
						}); 
					    //console.log(JSON.stringify(sql));  										   



			   			db.sqlBatch(sql)
				        .then(res => {
				        	//console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
				        	resolve();
								
						}).catch(e => {
							console.log(e.message);
							reject(e);
						});

				  	}, 
					function() {
				  		
				  		console.log('Error search_read - Loading offline gastos');
				  		//console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
				  		resolve();							  		
					});

		    	}).catch(e => {
		  		console.log('Error en CONEXION');
		  		console.log(e.message);
		  		reject(e)
		  	});

        });

        return promise;	
    	
	}



	public cargarCalendario(borrar){

		var self = this;
		var promise = new Promise(function (resolve, reject) {
            
            
			self.sqlite.create(self.bd_conf).then((db: SQLiteObject) => {
		      		       
				//console.log(self.usr.id);
				var dominio;
				if(self.usr.tipo_usuario == 'is_root'){
					dominio = [['is_padre', '=' , false]];
				}if(self.usr.tipo_usuario == 'is_client'){
					dominio = [['is_padre', '=' , false],["Datos_Cliente_id", "=", self.usr.id]];
				}else {
					dominio = [['is_padre', '=' , false], ["guia_id", "=", self.usr.id]];
				} 
	      		var sql = [];
	      		self.search_read('rusia.eventos', dominio, self.tablas.Tbl_eventos_odoo)
	      		.then(function(eventos) {
	      		
	      			console.log('resolvio eventos');
			  		Object.keys(eventos).forEach(key=> {

			  			if(borrar == true){
			  				sql.push('DELETE FROM eventos;');	
			  			}
					    				  							  			
					    sql.push("INSERT OR IGNORE INTO eventos "+
					    	"(id, cliente_id, representante_id,"+
					    	" Fecha_Inicio, hora_inicio , hora_final , name, is_padre, fecha_padre, guia_id,"+
					    	" chofer_id, gasto_rub, gasto_eur, gasto_usd, gasto_paypal, Comentarios_Chofer,"+
					    	" Comentarios_Internos, Comentarios_Cliente, Comentarios_Guia, Fecha_Fin, Transporte, hotel_id,"+
					    	" ciudad_id, Total_Representante, message, numero_pax, evento_id, Servicio_Gastos, tarjeta_eur,"+
					    	" tarjeta_rub, tarjeta_usd, is_guia, is_traslado, gastostoursline_ids)"+
					    	" VALUES (" + eventos[key].id + ", '"+ JSON.stringify(eventos[key].Datos_Cliente_id)+"', '" +
					    	JSON.stringify(eventos[key].representante_id)+ "', '" + eventos[key].Fecha_Inicio +"','" + 
					    	eventos[key].hora_inicio + "', '" + eventos[key].hora_final + "', '" + 
					    	eventos[key].name + "', '" + eventos[key].is_padre +"', '" + 
					    	eventos[key].fecha_padre +"', '" + JSON.stringify(eventos[key].guia_id)+ "' , '" + 
					    	JSON.stringify(eventos[key].chofer_id) + "' , '" + eventos[key].gasto_rub + "' , '" + 
					    	eventos[key].gasto_eur + "' , '" + eventos[key].gasto_usd + "' , '" + 
					    	eventos[key].gasto_paypal + "', '" + eventos[key].Comentarios_Chofer + "', '" + 
					    	eventos[key].Comentarios_Internos + "', '" + eventos[key].Comentarios_Cliente + "', '" + 
					    	eventos[key].Comentarios_Guia + "', '" + eventos[key].Fecha_Fin + "', '"+
					    	eventos[key].Transporte+"', '"+JSON.stringify(eventos[key].hotel_id)+"', '"+JSON.stringify(eventos[key].ciudad_id)+"', '"+
					    	eventos[key].Total_Representante+"', '"+eventos[key].message+"', '"+eventos[key].numero_pax+"', '"+
					    	JSON.stringify(eventos[key].evento_id)+"', '"+eventos[key].Servicio_Gastos+"', '"+eventos[key].tarjeta_eur+"', '"+
					    	eventos[key].tarjeta_rub+"', '"+eventos[key].tarjeta_usd+"' , '"+eventos[key].is_guia+"', '"+eventos[key].is_traslado+"', '"+ JSON.stringify(eventos[key].gastostoursline_ids)+"');");
					});

		   			db.sqlBatch(sql)
			        .then(res => {
			        	
			        	console.log('-----------------entro1 ---------------');
			        	self.cargarGastos(false).then(
			        		res=>{

			        			console.log('-----------------entro2 ---------------');
			        			self.cargarAttachment(false).then(
					        		res=>{
					        			resolve(self.usr.tipo_usuario);
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
							
					}).catch(e => {
						console.log(e.message);
						reject(e);
					});

			  	}, 
				function() {
			  		console.log('Error search_read');
			  		console.log('Loading offline events');
			  		resolve(self.usr.tipo_usuario);							  		
				});						

		  	}).catch(e => {
		  		console.log('Error en CONEXION');
		  		console.log(e.message);
		  		reject(e)
		  	});

        });

        return promise;	

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

		        	/*console.log('-----------Odoo created id:' + ok_id);
		        	if(ok_id != false && ok_id > 0){

		        		var insert = ok_id + ", ";
		        		var values = "id, ";
		        		Object.keys(campos).forEach(key=> {

		        			values = values + key+",";
		        			insert = insert + " '"+campos[key]+"', ";				        			
		        		});

		        		var tabla_bd = tabla.split('.')[1];

		        		values = values.substring(0, values.length - 1); 

		        		insert = insert.substring(0, insert.length - 2);

		        		insert = insert + " ";
		        		//console.log("UPDATE " + tabla_bd + " SET " + set + " WHERE id = "+ dominio);
		        		console.log("INSERT OR IGNORE INTO " + tabla_bd + 
								    	"("+values+")"+
								    	" VALUES (" + insert +");");

		        		
		        		self.ejecutarSQL("INSERT OR IGNORE INTO " + tabla_bd + 
								    	"("+values+")"+
								    	" VALUES (" + insert +");").then(
		        			res =>{
		        				console.log('create OK: ' + ok_id);
		        				//console.log(JSON.stringify(res));
		        				resolve(ok_id);
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
		        	}		*/					
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

		        	/*
		        	if(ok_code){

		        		var set = ''
		        		Object.keys(campos).forEach(key=> {

		        			set = set + key +" = '"+campos[key]+"', ";
		        			console.log();
		        		});

		        		var tabla_bd = tabla.split('.')[1];

		        		set = set.substring(0, set.length - 2); // "12345.0"
		        		set = set + " ";
		        		console.log("UPDATE " + tabla_bd + " SET " + set + " WHERE id = "+ dominio);
		        		self.ejecutarSQL("UPDATE " + tabla_bd + " SET " + set + " WHERE id = "+ dominio).then(
		        			res =>{
		        				console.log('write OK: ' + ok_code);
		        				console.log(res);
		        				resolve(res);
		        			},
		        			fail =>{				        				
		        				console.log('Fail update BD');
		        				reject();			
		        			}
		        		);				        		
		        						        		
		        	}else{
		        		console.log('Fail update Odoo');
		        		reject();	
		        	}							*/
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


	public search_read(tabla, dominio, campos){

		var self = this;//http://185.129.251.102
		var promise = new Promise(function (resolve, reject) {
                    
          
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

	public login(conexion){

		var self = this;//http://185.129.251.102
		//console.log('-----------------------------0');
		var promise = new Promise(function (resolve, reject) {
            
            //console.log('------------------------------1');
            if(self.usr != null){

            	resolve(self.usr.tipo_usuario);
            }else{
            	//console.log('-----------------------------1');

            	var odoo = new OdooApi(self.url, conexion.bd);
				odoo.login(conexion.usuario, conexion.pwd).then(
				function (uid) {
					

					odoo.search_read('res.users', [['login', '=', conexion.usuario]], //, '', 'date_begin',
			                         self.tablas.Tbl_user_odoo).then(
		 
				    	function (user) {

				    		console.log(user[0]);
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
					      
					      		var sql = [self.tablas.Tbl_eventos, self.tablas.Tbl_gastos, self.tablas.Tbl_user, self.tablas.Tbl_attachment];

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
								        	
								        	self.ejecutarSQL('SELECT * FROM user').then(

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
            }
			
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
