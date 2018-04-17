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

	private db: SQLiteObject;

	tbl_eventos_root = ["guia_id", "chofer_id", "Fecha_Inicio", "Fecha_Fin","hora_inicio","hora_final", "name", "is_adjudicado"];

	constructor(private sqlite: SQLite) {
	
		var self = this;
		this.sqlite.create({
		  name: 'data.rusia',
		  location: 'default'
		}).then((db: SQLiteObject) => {


			db.executeSql('CREATE TABLE eventos_root(Fecha_Inicio, hora_inicio, hora_final)', {})
		  	.then(() => console.log('Executed SQL'))
		  	.catch(e => console.log(e));


		}).catch(e => console.log(e));
	}

	crearTablas(){
		console.log('crear tablas')
	}

	traerDatos(){
		console.log('traer datos');//Rusia.eventos,
		var self = this;//http://185.129.251.102
		var odoo = new OdooApi('/api', 'rusia3');
		odoo.login('jdmas@maui.com.mx', 'rusia@2018').then(
		function (uid) {
			console.log('estamos adentro');

			odoo.search_read('rusia.eventos', [['id', '<>', '0']], //, '', 'date_begin',
	                         self.tbl_eventos_root).then(

	        function (eventos) {

	        	var sql;
	        	Object.keys(eventos).forEach(key=> {

				    console.log(eventos[key])  ;     
				    sql = sql + "INSERT INTO 'user' (Fecha_Inicio,hora_inicio, hora_final, name) VALUES ('"+eventos[key].Fecha_Inicio+"','"+ eventos[key].hora_inicio+"', '"+ eventos[key].hora_final + "', '"+ eventos[key].name +"');";   				    
				});

				self.db.executeSql(sql,{})
				.then(() => console.log('Executed INSERT SQL'))
      			.catch(e => console.log(e));
	        	
	        },
	    	function (){
	    		console.log('error');
	    	})

		},
		function (){
			console.log('error');
		}
	)
	}

}
