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
import { TablasProvider } from '../tablas/tablas';
/*
  Generated class for the GetDatosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GetDatosProvider = /** @class */ (function () {
    function GetDatosProvider(sqlite, tablas) {
        this.sqlite = sqlite;
        this.tablas = tablas;
        this.db = null;
        this.url = '/api';
    }
    GetDatosProvider.prototype.ejecutarSQL = function (select) {
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
                console.log('Error en ejecutarSQL');
                console.log(e.message);
                reject(e);
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.borrarTablas = function (tablas) {
        var self = this;
        var promise = new Promise(function (resolve, reject) {
            self.sqlite.create({
                name: 'ionicdb.db',
                location: 'default'
            }).then(function (db) {
                var sql = [];
                Object.keys(tablas).forEach(function (key) {
                    //sql.push('DROP TABLE IF EXISTS '+tablas[key]);
                    console.log('DROP TABLE IF EXISTS ' + tablas[key]);
                });
                db.sqlBatch(sql).then(function (res) {
                    console.log('----------Drop tables - OK---------');
                    resolve();
                }).catch(function (e) {
                    console.log('Error Drop tables');
                    console.log(e.message);
                    reject(e);
                });
            }).catch(function (e) {
                console.log('Error en conexion bd');
                console.log(e.message);
                reject(e);
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.cargarEventos = function () {
    };
    GetDatosProvider.prototype.cargarGastos = function () {
        var self = this;
        var sql = [];
        var promise = new Promise(function (resolve, reject) {
            self.sqlite.create({
                name: 'ionicdb.db',
                location: 'default'
            }).then(function (db) {
                self.search_read('rusia.gastostoursline', [["id", "<>", 0]], self.tablas.Tbl_gastos_odoo)
                    .then(function (gastos) {
                    console.log('resolvio gastos');
                    //						      			resolve(true);
                    Object.keys(gastos).forEach(function (key) {
                        //console.log(JSON.stringify(gastos[key].eventos_id)); 
                        sql.push("INSERT OR IGNORE INTO gastostoursline " +
                            "(id, concepto_gasto_id, tipo_moneda, Total, fecha, ciudad_id, observaciones, usuario_id, evento_padre, eventos_id)" +
                            " VALUES (" + gastos[key].id + ", '" + JSON.stringify(gastos[key].concepto_gasto_id) + "', '"
                            + gastos[key].tipo_moneda + "', '" + gastos[key].Total + "', '" + gastos[key].fecha + "', '" +
                            JSON.stringify(gastos[key].ciudad_id) + "', '" + gastos[key].observaciones + "', '" + JSON.stringify(gastos[key].usuario_id) + "', '" + gastos[key].evento_padre + "', '" + JSON.stringify(gastos[key].eventos_id) + "');");
                    });
                    //console.log(JSON.stringify(sql));  										   
                    db.sqlBatch(sql)
                        .then(function (res) {
                        //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                        resolve();
                    }).catch(function (e) {
                        console.log(e.message);
                        reject(e);
                    });
                }, function () {
                    console.log('Error search_read - Loading offline gastos');
                    //console.log('usr.tipo_usuario'+ usr.tipo_usuario);						        	
                    resolve();
                });
            }).catch(function (e) {
                console.log('Error en CONEXION');
                console.log(e.message);
                reject(e);
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.cargarCalendario = function () {
        var self = this;
        var promise = new Promise(function (resolve, reject) {
            self.sqlite.create({
                name: 'ionicdb.db',
                location: 'default'
            }).then(function (db) {
                var sql = [self.tablas.Tbl_eventos, self.tablas.Tbl_gastos];
                db.sqlBatch(sql)
                    .then(function (res) {
                    console.log('BD created - OK');
                    self.ejecutarSQL('SELECT * FROM user').then(function (data) {
                        var usr = data.rows.item(0);
                        //
                        console.log(usr.id);
                        var dominio;
                        if (usr.tipo_usuario == 'is_root') {
                            dominio = [['is_padre', '=', false]];
                        }
                        if (usr.tipo_usuario == 'is_client') {
                            dominio = [['is_padre', '=', false], ["Datos_Cliente_id", "=", usr.id]];
                        }
                        else {
                            dominio = [['is_padre', '=', false], ["guia_id", "=", usr.id]];
                        }
                        sql = [];
                        self.search_read('rusia.eventos', dominio, self.tablas.Tbl_eventos_odoo)
                            .then(function (eventos) {
                            console.log('resolvio eventos');
                            Object.keys(eventos).forEach(function (key) {
                                console.log(eventos[key]);
                                sql.push("INSERT OR IGNORE INTO eventos " +
                                    "(id, cliente_id, representante_id," +
                                    " Fecha_Inicio, hora_inicio , hora_final , name, is_padre, fecha_padre, guia_id," +
                                    " chofer_id, gasto_rub, gasto_eur, gasto_usd, gasto_paypal, Comentarios_Chofer," +
                                    " Comentarios_Internos, Comentarios_Cliente, Comentarios_Guia, Fecha_Fin, Transporte, hotel_id," +
                                    " ciudad_id, Total_Representante, message, numero_pax, evento_id, Servicio_Gastos, tarjeta_eur," +
                                    " tarjeta_rub, tarjeta_usd, is_guia, is_traslado, gastostoursline_ids)" +
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
                                    eventos[key].tarjeta_rub + "', '" + eventos[key].tarjeta_usd + "' , '" + eventos[key].is_guia + "', '" + eventos[key].is_traslado + "', '" + JSON.stringify(eventos[key].gastostoursline_ids) + "');");
                            });
                            db.sqlBatch(sql)
                                .then(function (res) {
                                self.cargarGastos().then(function (res) {
                                    resolve(usr.tipo_usuario);
                                }, function (fail) {
                                    reject();
                                });
                            }).catch(function (e) {
                                console.log(e.message);
                                reject(e);
                            });
                        }, function () {
                            console.log('Error search_read');
                            console.log('Loading offline events');
                            resolve(usr.tipo_usuario);
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
    GetDatosProvider.prototype.create = function (tabla, campos) {
        var self = this; //http://185.129.251.102
        var promise = new Promise(function (resolve, reject) {
            self.ejecutarSQL('SELECT * FROM user').then(function (data) {
                var usr = data.rows.item(0);
                //for(var i=0; i<data.rows.length; i++) {
                //    self.reservas.push(data.rows.item(i));                    
                //}
                var odoo = new OdooApi(self.url, usr.bd);
                odoo.login(usr.usuario, usr.pwd).then(function (uid) {
                    odoo.create(tabla, campos).then(function (ok_id) {
                        console.log('-----------Odoo created id:' + ok_id);
                        if (ok_id != false && ok_id > 0) {
                            var insert = ok_id + ", ";
                            var values = "id, ";
                            Object.keys(campos).forEach(function (key) {
                                values = values + key + ",";
                                insert = insert + " '" + campos[key] + "', ";
                            });
                            var tabla_bd = tabla.split('.')[1];
                            values = values.substring(0, values.length - 1);
                            insert = insert.substring(0, insert.length - 2);
                            insert = insert + " ";
                            //console.log("UPDATE " + tabla_bd + " SET " + set + " WHERE id = "+ dominio);
                            console.log("INSERT OR IGNORE INTO " + tabla_bd +
                                "(" + values + ")" +
                                " VALUES (" + insert + ");");
                            self.ejecutarSQL("INSERT OR IGNORE INTO " + tabla_bd +
                                "(" + values + ")" +
                                " VALUES (" + insert + ");").then(function (res) {
                                console.log('create OK: ' + ok_id);
                                //console.log(JSON.stringify(res));
                                resolve(ok_id);
                            }, function (fail) {
                                console.log('Fail update BD');
                                reject();
                            });
                            //resolve(ok_code);				        		
                        }
                        else {
                            console.log('Fail update Odoo');
                            reject();
                        }
                    }, function () {
                        console.log('error');
                        reject();
                    });
                }, function () {
                    console.log('error');
                    reject();
                });
            }, function () {
                console.log('Error get table user');
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.write = function (tabla, dominio, campos) {
        var self = this; //http://185.129.251.102
        var promise = new Promise(function (resolve, reject) {
            self.ejecutarSQL('SELECT * FROM user').then(function (data) {
                var usr = data.rows.item(0);
                //for(var i=0; i<data.rows.length; i++) {
                //    self.reservas.push(data.rows.item(i));                    
                //}
                var odoo = new OdooApi(self.url, usr.bd);
                odoo.login(usr.usuario, usr.pwd).then(function (uid) {
                    odoo.write(tabla, dominio, campos).then(function (ok_code) {
                        if (ok_code) {
                            var set = '';
                            Object.keys(campos).forEach(function (key) {
                                set = set + key + " = '" + campos[key] + "', ";
                                console.log();
                            });
                            var tabla_bd = tabla.split('.')[1];
                            set = set.substring(0, set.length - 2); // "12345.0"
                            set = set + " ";
                            console.log("UPDATE " + tabla_bd + " SET " + set + " WHERE id = " + dominio);
                            self.ejecutarSQL("UPDATE " + tabla_bd + " SET " + set + " WHERE id = " + dominio).then(function (res) {
                                console.log('write OK: ' + ok_code);
                                console.log(res);
                                resolve(res);
                            }, function (fail) {
                                console.log('Fail update BD');
                                reject();
                            });
                            //resolve(ok_code);				        		
                        }
                        else {
                            console.log('Fail update Odoo');
                            reject();
                        }
                    }, function () {
                        console.log('Fail update Odoo');
                        reject();
                    });
                }, function () {
                    console.log('Fail connect Odoo');
                    reject();
                });
            }, function () {
                console.log('Error get table user');
                reject();
            });
        });
        return promise;
    };
    GetDatosProvider.prototype.search_read = function (tabla, dominio, campos) {
        var self = this; //http://185.129.251.102
        var promise = new Promise(function (resolve, reject) {
            self.ejecutarSQL('SELECT * FROM user').then(function (data) {
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
            self.ejecutarSQL('SELECT * FROM user').then(function (usuario) {
                console.log('Loading offline user - OK');
                resolve(usuario.rows.item(0).tipo_usuario);
            }, function (fail) {
                var odoo = new OdooApi(self.url, conexion.bd);
                odoo.login(conexion.usuario, conexion.pwd).then(function (uid) {
                    odoo.search_read('res.users', [['email', '=', conexion.usuario]], //, '', 'date_begin',
                    self.tablas.Tbl_user_odoo).then(function (user) {
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
                            tipo = "is_client";
                        }
                        self.sqlite.create({
                            name: 'ionicdb.db',
                            location: 'default'
                        }).then(function (db) {
                            db.executeSql(self.tablas.Tbl_user, {})
                                .then(function (res) {
                                console.log('Executed SQL');
                                //
                                var sql = [];
                                sql.push("INSERT OR IGNORE INTO user " +
                                    "(id, usuario, pwd, bd, tipo_usuario)" +
                                    " VALUES (" + uid + ", '" + conexion.usuario + "', '" + conexion.pwd + "', '" + conexion.bd + "', '" + tipo + "');");
                                db.sqlBatch(sql)
                                    .then(function (res) {
                                    resolve(tipo);
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
        });
        return promise;
    };
    GetDatosProvider.prototype.addCero = function (num) {
        if (num < 10 && num.toString().length < 2) {
            return (num = '0' + num);
        }
        return num;
    };
    GetDatosProvider.prototype.convertirFecha = function (fecha) {
        var dateS = new Date(fecha);
        var date = new Date(dateS.getTime() + (dateS.getTimezoneOffset() * 60000));
        var year = date.getFullYear();
        var month = this.addCero(date.getMonth() + 1);
        var dia = this.addCero(date.getDate());
        var hora = this.addCero(date.getHours());
        var minutos = this.addCero(date.getMinutes());
        var segundos = this.addCero(date.getSeconds());
        //+ ' ' + hora + ':' + minutos + ':' + segundos
        return year + '-' + month + '-' + dia;
    };
    GetDatosProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [SQLite, TablasProvider])
    ], GetDatosProvider);
    return GetDatosProvider;
}());
export { GetDatosProvider };
//# sourceMappingURL=get-datos.js.map