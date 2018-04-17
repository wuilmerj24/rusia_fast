//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
declare var OdooApi: any;
/*
  Generated class for the GetDatosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GetDatosProvider {

	public db: SQLiteObject = null;

	tbl_eventos = "CREATE TABLE IF NOT EXISTS eventos_root("+
	" id INTEGER PRIMARY KEY,"+
	" cliente_id VARCHAR(10),"+
	" cliente_nombre VARCHAR(255),"+
	" representante_id VARCHAR(10),"+
	" representante_nombre VARCHAR(255),"+
	" Fecha_Inicio VARCHAR(20),"+
	" hora_inicio VARCHAR(10),"+
	" hora_final VARCHAR(10),"+
	" name VARCHAR(255),"+
	" is_padre VARCHAR(5),"+
	" fecha_padre VARCHAR(20))";
	
	tbl_eventos_root = ["Comentarios_Chofer",
	"Total_Beneficios",
	"tarjeta_usd_pos",
	"Total_Rub",
	"tarjeta_usd",
	"tarjeta_rub",
	"Total_Pagado_Web",
	"gastostoursline_ids",
	"evento_ids",
	"tarjeta_eur_pos",
	"Comentarios_Internos",
	"is_padre",
	"Total_Tarjeta",
	"Total_Pago_Clientes",
	"Total_Paypal",
	"Total_Representante",
	"representante_id",
	"Comentarios_Cliente",
	"gastos_ids",
	"Comentarios_Guia",
	"gasto_usd",
	"documentos_ids",
	"gastos_reps_ids",
	"Datos_Cliente_id",
	"Total_Euros",
	"name",
	"Total_Usd",
	"tarjeta_eur",
	"gasto_rub",
	"gasto_eur",
	"gasto_paypal",
	"display_name",
	"__last_update",
	"fecha_padre",
	"guia_id", 
	"chofer_id", 
	"Fecha_Inicio", 
	"Fecha_Fin",
	"hora_inicio",
	"hora_final", 
	"is_adjudicado"];

	constructor(private sqlite: SQLite) {

	}

	public getTable(where, order){


		var self = this;
		var promise = new Promise(function (resolve, reject) {
            
            
			self.sqlite.create({
		      name: 'ionicdb.db',
		      location: 'default'
		    }).then((db: SQLiteObject) => {
		     	          	
				db.executeSql('SELECT * FROM eventos_root ' + where + order, {})
					.then(res => {

						resolve(res);
					}).catch(e => {
						console.log(e.message);
						reject(e);
					});

		  	}).catch(e => {
		  		console.log('Error en CONEXION');
		  		console.log(e.message);
		  		reject(e)
		  	});

        });

        return promise;	

	}

	public crearBD(){

		var self = this;
		var promise = new Promise(function (resolve, reject) {
            
            
			self.sqlite.create({
		      name: 'ionicdb.db',
		      location: 'default'
		    }).then((db: SQLiteObject) => {
		      
		      db.executeSql(self.tbl_eventos, {})
		      .then(
		      	res => {
		      		console.log('Executed SQL');
		      		//
		      		var sql = [];
		      		self.getData().then(function(eventos) {

				  		Object.keys(eventos).forEach(key=> {

						    console.log(eventos[key]);     
						    sql.push("INSERT OR IGNORE INTO eventos_root "+
						    	"(id, cliente_id, cliente_nombre, representante_id, representante_nombre,"+
						    	" Fecha_Inicio, hora_inicio , hora_final , name, is_padre, fecha_padre)"+
						    	" VALUES (" + eventos[key].id + ", '"+ eventos[key].Datos_Cliente_id[0]+ 
						    	"', '" + eventos[key].Datos_Cliente_id[1] +"', '" +
						    	eventos[key].representante_id[0]+ 
						    	"', '" + eventos[key].representante_id[1] +
						    	"', '" + eventos[key].Fecha_Inicio +"','" 
						    	+ eventos[key].hora_inicio + "', '" + eventos[key].hora_final + 
						    	"', '" + eventos[key].name + "', '" + eventos[key].is_padre +"', '" + 
						    	eventos[key].fecha_padre +"');");
						});
 
			   			db.sqlBatch(sql)
				        .then(res => {
				        	
				        	console.log('GUARDADO SQL');
				        	//resolve();
				        	//resolve('Executed SQL');				          	
							db.executeSql('SELECT * FROM eventos_root ORDER BY id DESC', {})
								.then(res => {

									resolve(res);
								}).catch(e => {
									console.log(e.message);
									reject(e);
								});
								
							}).catch(e => {
								console.log(e.message);
								reject(e);
							});

					  }, function() {
					  		console.log('Error getData');
					  		reject('Error getData');
					});

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

	public getData(){


		var self = this;//http://185.129.251.102
		var promise = new Promise(function (resolve, reject) {
            
            //console.log('traer datos');//Rusia.eventos,
			
			var odoo = new OdooApi('/api', 'rusia3');
			odoo.login('jdmas@maui.com.mx', 'rusia@2018').then(
			function (uid) {
				console.log('estamos adentro');

				odoo.search_read('rusia.eventos', [['id', '<>', '0']], //, '', 'date_begin',
		                         self.tbl_eventos_root).then(
	 
		        function (eventos) {

		        	resolve(eventos);
		        	
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

}
