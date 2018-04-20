var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
/*
  Generated class for the GetDatosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GetDatosProvider = /** @class */ (function () {
    function GetDatosProvider(sqlite) {
        this.sqlite = sqlite;
        this.db = null;
        this.url = '/api';
        this.tbl_user = "CREATE TABLE IF NOT EXISTS user(" +
            " id INTEGER," +
            " usuario VARCHAR(255)," +
            " pwd VARCHAR(20)," +
            " bd VARCHAR(20)," +
            " tipo_usuario VARCHAR(20))";
        this.tbl_eventos = "CREATE TABLE IF NOT EXISTS eventos_root(" +
            " id INTEGER PRIMARY KEY," +
            " cliente_id VARCHAR(255)," +
            " representante_id VARCHAR(255)," +
            " Fecha_Inicio VARCHAR(20)," +
            " Fecha_Fin VARCHAR(20)," +
            " hora_inicio VARCHAR(10)," +
            " hora_final VARCHAR(10)," +
            " name VARCHAR(255)," +
            " is_padre VARCHAR(5)," +
            " fecha_padre VARCHAR(20)," +
            " guia_id VARCHAR(255)," +
            " chofer_id VARCHAR(255)," +
            " gasto_rub VARCHAR(10)," +
            " gasto_eur VARCHAR(10)," +
            " gasto_usd VARCHAR(10)," +
            " gasto_paypal VARCHAR(10)," +
            " Comentarios_Chofer TEXT," +
            " Comentarios_Internos TEXT," +
            " Comentarios_Cliente TEXT," +
            " Comentarios_Guia TEXT," +
            " Transporte VARCHAR(255)," +
            " hotel_id VARCHAR(255)," +
            " ciudad_id VARCHAR(255)," +
            " Total_Representante VARCHAR(25)," +
            " message TEXT," +
            " numero_pax VARCHAR(5)," +
            " evento_id VARCHAR(100)," +
            " Servicio_Gastos VARCHAR(10)," +
            " tarjeta_eur VARCHAR(10)," +
            " tarjeta_rub VARCHAR(10)," +
            " tarjeta_usd VARCHAR(10))";
        /*
            "tarjeta_usd_pos",
            "Total_Rub",
            "tarjeta_usd",
            "tarjeta_rub",
            "tarjeta_eur_pos",
            "Total_Beneficios",
            "Total_Pagado_Web",
            "Total_Tarjeta",
            "Total_Pago_Clientes",
            "Total_Paypal",
            "",
            "gastostoursline_ids",
            "evento_ids",
            "is_padre",
            "representante_id",
            "gastos_ids",
            "documentos_ids",
            "gastos_reps_ids",
            "Total_Euros",
            "name",
            "Total_Usd",
            "tarjeta_eur",
            "display_name",
            "__last_update",
            "fecha_padre",,,
            "is_adjudicado"*/
        this.tbl_eventos_root = ["Comentarios_Chofer",
            "Total_Beneficios",
            "tarjeta_usd_pos",
            "Transporte",
            "hotel_id",
            "ciudad_id",
            "Servicio_Gastos",
            "message",
            "numero_pax",
            "Total_Rub",
            "tarjeta_usd",
            "tarjeta_rub",
            "Total_Pagado_Web",
            "gastostoursline_ids",
            "evento_ids",
            "evento_id",
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
        this.tbl_user_odoo = ["email",
            "is_chofer",
            "is_guia",
            "is_rep",
            "is_client",
            "is_root",
            "is_general",
            "is_traslados"];
    }
    GetDatosProvider.prototype.getTable = function (select) {
        var self = this;
        var promise = new Promise(function (resolve, reject) {
            self.sqlite.create({
                name: 'ionicdb.db',
                location: 'default'
            }).then(function (db) {
                db.executeSql(select, {})
                    .then(function (res) {
                    resolve(res);
                }).catch(function (e) {
                    console.log(e.message);
                    reject(e);
                });
            }).catch(function (e) {
                console.log('Error en CONEXION');
                console.log(e.message);
                reject(e);
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.crearBD = function () {
        var self = this;
        var promise = new Promise(function (resolve, reject) {
            self.sqlite.create({
                name: 'ionicdb.db',
                location: 'default'
            }).then(function (db) {
                db.executeSql(self.tbl_eventos, {})
                    .then(function (res) {
                    console.log('BD created - OK');
                    self.getTable('SELECT * FROM user').then(function (data) {
                        var usr = data.rows.item(0);
                        //
                        console.log(usr.id);
                        var dominio;
                        if (usr.tipo_usuario == 'is_root') {
                            dominio = [['is_padre', '=', false]];
                        }
                        else {
                            dominio = [['is_padre', '=', false], ["guia_id", "=", usr.id]];
                        }
                        var sql = [];
                        self.search_read('rusia.eventos', dominio, //, '', 'date_begin',
                        self.tbl_eventos_root).then(function (eventos) {
                            //self.getData().then(function(eventos) {
                            Object.keys(eventos).forEach(function (key) {
                                console.log(eventos[key]);
                                sql.push("INSERT OR IGNORE INTO eventos_root " +
                                    "(id, cliente_id, representante_id," +
                                    " Fecha_Inicio, hora_inicio , hora_final , name, is_padre, fecha_padre, guia_id," +
                                    " chofer_id, chofer_nombre, gasto_rub, gasto_eur, gasto_usd, gasto_paypal, Comentarios_Chofer," +
                                    " Comentarios_Internos, Comentarios_Cliente, Comentarios_Guia, Fecha_Fin, Transporte, hotel_id," +
                                    " ciudad_id, Total_Representante, message, numero_pax, evento_id, Servicio_Gastos, tarjeta_eur," +
                                    " tarjeta_rub, tarjeta_usd)" +
                                    " VALUES (" + eventos[key].id + ", '" + JSON.stringify(eventos[key].Datos_Cliente_id) + "', '" +
                                    JSON.stringify(eventos[key].representante_id) + "', '" + eventos[key].Fecha_Inicio + "','" +
                                    eventos[key].hora_inicio + "', '" + eventos[key].hora_final + "', '" +
                                    eventos[key].name + "', '" + eventos[key].is_padre + "', '" +
                                    eventos[key].fecha_padre + "', '" + JSON.stringify(eventos[key].guia_id) + "' , '" +
                                    JSON.stringify(eventos[key].chofer_id) + "' , '" + eventos[key].gasto_rub + "' , '" +
                                    eventos[key].gasto_eur + "' , '" + eventos[key].gasto_usd + "' , '" +
                                    eventos[key].gasto_paypal + "', '" + eventos[key].Comentarios_Chofer + "', '" +
                                    eventos[key].Comentarios_Internos + "', '" + eventos[key].Comentarios_Cliente + "', '" +
                                    eventos[key].Comentarios_Guia + "', '" + eventos[key].Fecha_Fin + "', '" +
                                    eventos[key].Transporte + "', '" + JSON.stringify(eventos[key].hotel_id) + "', '" + JSON.stringify(eventos[key].ciudad_id) + "', '" +
                                    eventos[key].Total_Representante + "', '" + eventos[key].message + "', '" + eventos[key].numero_pax + "', '" +
                                    JSON.stringify(eventos[key].evento_id) + "', '" + eventos[key].Servicio_Gastos + "', '" + eventos[key].tarjeta_eur + "', '" +
                                    eventos[key].tarjeta_rub + "', '" + eventos[key].tarjeta_usd + "');");
                            });
                            db.sqlBatch(sql)
                                .then(function (res) {
                                console.log('GUARDADO SQL');
                                //resolve();
                                //resolve('Executed SQL');				          	
                                db.executeSql('SELECT * FROM eventos_root ORDER BY id DESC', {})
                                    .then(function (res) {
                                    resolve(res);
                                }).catch(function (e) {
                                    console.log(e.message);
                                    reject(e);
                                });
                            }).catch(function (e) {
                                console.log(e.message);
                                reject(e);
                            });
                        }, function () {
                            console.log('Error search_read');
                            reject('Error search_read');
                        });
                    }, function () {
                        console.log('Error get table');
                        reject();
                    });
                }).catch(function (e) {
                    console.log('Error en CREATE TABLE');
                    console.log(e.message);
                    reject(e);
                });
            }).catch(function (e) {
                console.log('Error en CONEXION');
                console.log(e.message);
                reject(e);
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.search_read = function (tabla, dominio, campos) {
        var self = this; //http://185.129.251.102
        var promise = new Promise(function (resolve, reject) {
            self.getTable('SELECT * FROM user').then(function (data) {
                var usr = data.rows.item(0);
                //for(var i=0; i<data.rows.length; i++) {
                //    self.reservas.push(data.rows.item(i));                    
                //}
                var odoo = new OdooApi(self.url, usr.bd);
                odoo.login(usr.usuario, usr.pwd).then(function (uid) {
                    console.log('search_read OK');
                    odoo.search_read(tabla, dominio, campos).then(function (tabla) {
                        resolve(tabla);
                    }, function () {
                        console.log('error');
                        reject();
                    });
                }, function () {
                    console.log('error');
                    reject();
                });
            }, function () {
                console.log('Error get table');
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.deleteBD = function () {
        var self = this;
        self.sqlite.deleteDatabase({
            name: 'ionicdb.db',
            location: 'default'
        }).then(function (ok) {
            console.log('BD deleted - OK');
            return true;
        }, function (fail) { return false; });
    };
    GetDatosProvider.prototype.login = function (conexion) {
        var self = this; //http://185.129.251.102
        var promise = new Promise(function (resolve, reject) {
            //console.log('traer datos');//Rusia.eventos,
            var odoo = new OdooApi(self.url, conexion.bd);
            odoo.login(conexion.usuario, conexion.pwd).then(function (uid) {
                odoo.search_read('res.users', [['email', '=', conexion.usuario]], //, '', 'date_begin',
                self.tbl_user_odoo).then(function (user) {
                    console.log(user[0]);
                    console.log('get login user OK');
                    var tipo = '';
                    if (user[0].is_chofer == true) {
                        tipo = "is_chofer";
                    }
                    else if (user[0].is_guia == true) {
                        tipo = "is_guia";
                    }
                    else if (user[0].is_rep == true) {
                        tipo = "is_rep";
                    }
                    else if (user[0].is_client == true) {
                        tipo = "is_client";
                    }
                    else if (user[0].is_root == true) {
                        tipo = "is_root";
                    }
                    else if (user[0].is_general == true) {
                        tipo = "is_general";
                    }
                    else if (user[0].is_traslados == true) {
                        tipo = "is_traslados";
                    }
                    else {
                        tipo = "is_chofer";
                    }
                    self.sqlite.create({
                        name: 'ionicdb.db',
                        location: 'default'
                    }).then(function (db) {
                        db.executeSql(self.tbl_user, {})
                            .then(function (res) {
                            console.log('Executed SQL');
                            //
                            var sql = [];
                            sql.push("INSERT OR IGNORE INTO user " +
                                "(id, usuario, pwd, bd, tipo_usuario)" +
                                " VALUES (" + uid + ", '" + conexion.usuario + "', '" + conexion.pwd + "', '" + conexion.bd + "', '" + tipo + "');");
                            db.sqlBatch(sql)
                                .then(function (res) {
                                resolve(true);
                            }).catch(function (e) {
                                console.log(e.message);
                                reject(e);
                            });
                        }).catch(function (e) {
                            console.log('Error en CREATE TABLE');
                            console.log(e.message);
                            reject(e);
                        });
                    }).catch(function (e) {
                        console.log('Error en CONEXION BD');
                        console.log(e.message);
                        reject(e);
                    });
                    //resolve();
                }, function () {
                    console.log('Error get usuarios');
                    reject();
                });
            }, function () {
                console.log('Error conexion login');
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [SQLite])
    ], GetDatosProvider);
    return GetDatosProvider;
}());
export { GetDatosProvider };
//# sourceMappingURL=get-datos.js.map