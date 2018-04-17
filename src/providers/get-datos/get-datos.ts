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

		var self = this;
		this.sqlite.create({
	      name: 'ionicdb.db',
	      location: 'default'
	    }).then((db: SQLiteObject) => {
	      db.executeSql('CREATE TABLE IF NOT EXISTS eventos_root(id INTEGER PRIMARY KEY, Fecha_Inicio TEXT, hora_inicio TEXT, hora_final TEXT, name TEXT)', {})
	      .then(res => {console.log('Executed SQL');

	      	db.sqlBatch(['INSERT INTO eventos_root VALUES(12, "ma","fas rarasdfa","fasdfa","fasdfasd")', 'INSERT INTO eventos_root VALUES(11, "que cosa","fasdfa","fasdfa","fasdfasd")'])
	        .then(res => {
	        	console.log('dato insertado');
	          console.log(res);
	          db.executeSql('SELECT * FROM eventos_root ORDER BY id DESC', {})
	      		.then(res => {
	        		console.log('select data:')
	        		for(var i=0; i<res.rows.length; i++) {
	          		console.log(res.rows.item(i).Fecha_Inicio);
	        	}
	      		}).catch(e => console.log(e));
	      		//self.getData();    
	        })
	        .catch(e => {
	          console.log(e);
	          
	        });

	      	
  })
	      .catch(e => console.log(e));
	      //self.saveData();



	  	}).catch(e => console.log(e));
	}	

	//public getEventos(){
    //	return this.db.executeSql('SELECT * FROM eventos_root', []);
	//}

	saveData() {
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
