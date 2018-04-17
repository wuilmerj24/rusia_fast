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

	tbl_eventos_root = ["guia_id", "chofer_id", "Fecha_Inicio", "Fecha_Fin","hora_inicio","hora_final", "name", "is_adjudicado"];

	constructor(private sqlite: SQLite) {

	}

	public crearBD(){

		var self = this;
		var promise = new Promise(function (resolve, reject) {
            
            
			self.sqlite.create({
		      name: 'ionicdb.db',
		      location: 'default'
		    }).then((db: SQLiteObject) => {
		      
		      db.executeSql('CREATE TABLE IF NOT EXISTS eventos_root(id INTEGER PRIMARY KEY, Fecha_Inicio TEXT, hora_inicio TEXT, hora_final TEXT, name TEXT)', {})
		      .then(
		      	res => {
		      		console.log('Executed SQL');
		      		//
		      		var sql = [];
		      		self.getData().then(function(eventos) {

				  		Object.keys(eventos).forEach(key=> {

						    console.log(eventos[key]);     
						    sql.push("INSERT OR IGNORE INTO eventos_root VALUES (" + eventos[key].id + ",  '" + eventos[key].Fecha_Inicio + "','" + eventos[key].hora_inicio + "', '" + eventos[key].hora_final + "', '" + eventos[key].name + "');");
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

	//public getEventos(){
    //	return this.db.executeSql('SELECT * FROM eventos_root', []);
	//}

/*	saveData() {
var self = this;
	    this.sqlite.create({
	      name: 'ionicdb.db',
	      location: 'default'
	    }).then((db: SQLiteObject) => {
	      db.executeSql('INSERT INTO eventos_root VALUES(?,?,?,?,?)',[1,'dadda','adad','dasdd','dadada'])
	        .then(res => {
	        	console.log('dato insertado');
	          console.log(res);
	      		//self.getData();    
	        })
	        .catch(e => {
	          console.log(e);
	          
	        });
	    }).catch(e => {
	      console.log(e);	      
	    });
	}


	getData() {
    this.sqlite.create({
      name: 'ionicdb.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      
      db.executeSql('SELECT * FROM eventos_root ORDER BY id DESC', {})
      .then(res => {
        console.log('select data:')
        for(var i=0; i<res.rows.length; i++) {
          console.log(res.rows.item(i).Fecha_Inicio);
        }
      })
      .catch(e => console.log(e));
      
    }).catch(e => console.log(e));
  }


*/
	/*public traerDatos(){
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

				    //console.log(eventos[key])  ;     
				    sql = sql + "INSERT INTO `eventos_root` (Fecha_Inicio,hora_inicio, hora_final, name) VALUES ('"+eventos[key].Fecha_Inicio+"','"+ eventos[key].hora_inicio+"', '"+ eventos[key].hora_final + "', '"+ eventos[key].name +"');"; 
				});



				/*self.db.executeSql(sql,{})
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
	}*/

}
