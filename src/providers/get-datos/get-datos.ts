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

	public db: SQLiteObject = null;

	public url = '/api';

	constructor(private sqlite: SQLite, private tablas:TablasProvider) {

	}

	public ejecutarSQL(select){


		var self = this;
		var promise = new Promise(function (resolve, reject) {
            
            
			self.sqlite.create({
		      name: 'ionicdb.db',
		      location: 'default'
		    }).then((db: SQLiteObject) => {
		     	          	
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

	public borrarTablas(tablas){
		var self = this;
		var promise = new Promise(function (resolve, reject) {
            
            
			self.sqlite.create({
		      name: 'ionicdb.db',
		      location: 'default'
		    }).then((db: SQLiteObject) => {
		      

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
	}

	public cargarCalendario(){

		var self = this;
		var promise = new Promise(function (resolve, reject) {
            
            
			self.sqlite.create({
		      name: 'ionicdb.db',
		      location: 'default'
		    }).then((db: SQLiteObject) => {
		      
		      var sql = [self.tablas.Tbl_eventos, self.tablas.Tbl_gastos];
		      db.sqlBatch(sql)
		      .then(
		      	res => {
		      		console.log('BD created - OK');

		      		self.ejecutarSQL('SELECT * FROM user').then(

						function(data:{rows}){

							var usr = data.rows.item(0);	
							//
							console.log(usr.id);
							var dominio;
							if(usr.tipo_usuario == 'is_root'){
								dominio = [['is_padre', '=' , false]];
							}if(usr.tipo_usuario == 'is_client'){
								dominio = [['is_padre', '=' , false],["Datos_Cliente_id", "=", usr.id]];
							}else {
								dominio = [['is_padre', '=' , false], ["guia_id", "=", usr.id]];
							} 
				      		sql = [];
				      		self.search_read('rusia.eventos', dominio, self.tablas.Tbl_eventos_odoo)
				      		.then(function(eventos) {
				      		
				      			console.log('resolvio eventos');
						  		Object.keys(eventos).forEach(key=> {

								    console.log(eventos[key]);   

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
						        	
						        	
						        	sql = [];
						        	self.search_read('rusia.gastostoursline', [["id", "<>", '0']], self.tablas.Tbl_gastos_odoo)
						      		.then(function(gastos) {
						      		

						      			console.log('resolvio gastos');
//						      			resolve(true);
								  		Object.keys(gastos).forEach(key=> {

										    //console.log(JSON.stringify(gastos[key])); JSON.stringify(gastos[key].concepto_gasto_id) 


										    sql.push("INSERT OR IGNORE INTO gastostoursline "+
										    	"(id, concepto_gasto_id, tipo_moneda, Total, fecha, ciudad_id, observaciones)"+
										    	" VALUES (" + gastos[key].id + ", '"+JSON.stringify(gastos[key].concepto_gasto_id)+"', '" 
										    	+gastos[key].tipo_moneda +"', '"+ gastos[key].Total+ "', '" + gastos[key].fecha +"', '"+
										    	JSON.stringify(gastos[key].ciudad_id)+"', '"+gastos[key].observaciones+"');");
										});
									    //console.log(JSON.stringify(sql));  										   


				 
							   			db.sqlBatch(sql)
								        .then(res => {
								        	//console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
								        	resolve(usr.tipo_usuario);
												
										}).catch(e => {
											console.log(e.message);
											reject(e);
										});

								  	}, 
									function() {
								  		console.log('Error search_read');
								  		console.log('Loading offline gastos');
								  		//console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
								  		resolve(usr.tipo_usuario);							  		
									});
										
								}).catch(e => {
									console.log(e.message);
									reject(e);
								});

						  	}, 
							function() {
						  		console.log('Error search_read');
						  		console.log('Loading offline events');
						  		resolve(true);							  		
							});						
						},
						function(){
							console.log('Error get table');
							reject()
						}
					);
		      		

	  			}).catch(e => {
	  				console.log('Error en CREATE TABLE');
	  				console.log(e.message);
	  				reject(e)
	  			});

		  	}).catch(e => {
		  		console.log('Error en CONEXION');
		  		console.log(e.message);
		  		reject(e)
		  	});

        });

        return promise;	

	}


	write(tabla, dominio, campos){

		var self = this;//http://185.129.251.102
		var promise = new Promise(function (resolve, reject) {
                    
            self.ejecutarSQL('SELECT * FROM user').then(

				function(data:{rows}){

					var usr = data.rows.item(0);
					//for(var i=0; i<data.rows.length; i++) {
	                    
	                //    self.reservas.push(data.rows.item(i));                    
	                //}
	                var odoo = new OdooApi(self.url, usr.bd);
					odoo.login(usr.usuario, usr.pwd).then(
					function (uid) {

						

						odoo.write(tabla, dominio, campos).then(
	 
				        function (ok_code) {

				        	if(ok_code){

				        		var set = ''
				        		Object.keys(campos).forEach(key=> {

				        			set = set + key +" = '"+campos[key]+"', ";
				        			console.log();
				        		});

				        		var tabla_bd = tabla.split('.')[1];

				        		set = set.substring(0, set.length - 2); // "12345.0"
				        		set = set + " ";
				        		//console.log("UPDATE " + tabla_bd + " SET " + set + " WHERE id = "+ dominio);
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
				        		//resolve(ok_code);				        		
				        	}else{
				        		console.log('Fail update Odoo');
				        		reject();	
				        	}							
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
				},
				function(){
					console.log('Error get table user');
					reject()
				}
			);			

        });

        return promise;	        
	}


	public search_read(tabla, dominio, campos){

		var self = this;//http://185.129.251.102
		var promise = new Promise(function (resolve, reject) {
                    
            self.ejecutarSQL('SELECT * FROM user').then(

				function(data:{rows}){

					var usr = data.rows.item(0);
					//for(var i=0; i<data.rows.length; i++) {
	                    
	                //    self.reservas.push(data.rows.item(i));                    
	                //}
	                var odoo = new OdooApi(self.url, usr.bd);
					odoo.login(usr.usuario, usr.pwd).then(
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
				},
				function(){
					console.log('Error get table');
					reject()
				}
			);			

        });

        return promise;	        
	}

	public deleteBD(){

		var self = this;
		self.sqlite.deleteDatabase({
		      name: 'ionicdb.db',
		      location: 'default'
	    }).then(
	    	ok =>{ 
	    		console.log('BD deleted - OK');
	    		return true;},
	    	fail => { return false}
	    )
	}

	public login(conexion){

		var self = this;//http://185.129.251.102
		var promise = new Promise(function (resolve, reject) {
            
            
			self.ejecutarSQL('SELECT * FROM user').then(
	    	function(usuario: {rows}){
	    		console.log('Loading offline user - OK');
	    		resolve(usuario.rows.item(0).tipo_usuario);
	    	},	
	    	fail => { 
	    		var odoo = new OdooApi(self.url, conexion.bd);
				odoo.login(conexion.usuario, conexion.pwd).then(
				function (uid) {
					

					odoo.search_read('res.users', [['email', '=', conexion.usuario]], //, '', 'date_begin',
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

					        self.sqlite.create({
					      		name: 'ionicdb.db',
					      		location: 'default'
					    	}).then((db: SQLiteObject) => {
					      
						      	db.executeSql(self.tablas.Tbl_user, {})
						      	.then(
						      		res => {
							      		console.log('Executed SQL');
							      		//
							      		var sql = [];

									    sql.push("INSERT OR IGNORE INTO user "+
									    	"(id, usuario, pwd, bd, tipo_usuario)"+
									    	" VALUES (" + uid +", '"+ conexion.usuario + "', '" + conexion.pwd +"', '" + conexion.bd + "', '" + tipo +	"');");
										
							   			db.sqlBatch(sql)
								        .then(res => {
								        	
								        	resolve(tipo);
												
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
	    	);			
        });

        return promise;

	}

}
