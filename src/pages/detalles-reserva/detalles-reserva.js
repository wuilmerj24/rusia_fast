var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Slides, NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { GastosRelPage } from '../../pages/gastos-rel/gastos-rel';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { EventoPage } from '../../pages/evento/evento';
var DetallesReservaPage = /** @class */ (function () {
    function DetallesReservaPage(plt, fileOpener, file, viewCtrl, navCtrl, navParams, getDatos) {
        this.plt = plt;
        this.fileOpener = fileOpener;
        this.file = file;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.categories = [{ id: 1, name: 'Resumen', visible: false },
            { id: 2, name: 'Descripción', visible: false },
            { id: 3, name: 'Documentos', visible: false },
            //{id:4, name:'Costos Itinerario', visible:false},
            { id: 5, name: 'Costos por ciudad', visible: false },
            { id: 6, name: 'Gatos extras', visible: false },
            { id: 7, name: 'Comentarios', visible: false }];
        this.ver_download = false;
        this.reserva = { id: -1,
            cliente_id: [0, ''],
            representante_id: [0, ''],
            Fecha_Inicio: '',
            Fecha_Fin: '',
            hora_inicio: '',
            hora_final: '',
            name: '',
            is_padre: '',
            fecha_padre: '',
            guia_id: [0, ''],
            chofer_id: [0, ''],
            gasto_rub: '',
            gasto_eur: '',
            gasto_usd: '',
            gasto_paypal: '',
            Comentarios_Chofer: '',
            Comentarios_Internos: '',
            Comentarios_Cliente: '',
            Comentarios_Guia: '',
            Transporte: '',
            hotel_id: [0, ''],
            ciudad_id: [0, ''],
            Total_Representante: '',
            message: '',
            numero_pax: '',
            evento_id: [0, ''],
            Servicio_Gastos: '',
            tarjeta_eur: '',
            tarjeta_rub: '',
            tarjeta_usd: '',
            is_traslado: false,
            is_guia: false,
            gastos_ids: []
            //
        };
        this.itinerario = [];
        this.editable = false;
        this.ver_resumen = true;
        this.ver_descripcion = true;
        this.ver_comentarios = true;
        this.ver_documentos = true;
        this.cargar = true;
        this.ver_segmento = true;
        this.ver_gastos = true;
        //private gastostoursline_ids = [];
        this.gastos_ciudad = [];
        this.attachment = [];
        this.permisos = '';
        var padre = this.navParams.get('padre');
        if (padre) {
            this.evento_hijo = this.navParams.get('evento').id;
        }
        else {
            this.evento_hijo = this.navParams.get('evento').evento_id[0];
        }
        this.permisos = this.navParams.get('permisos');
        //console.log('permisos:'+ this.permisos);
        if (this.permisos == 'is_client' || this.permisos == 'is_chofer') {
            //this.ver_segmento = false;
            this.ver_segmento = false;
        }
        else {
            this.ver_gastos = true;
        }
        //var tmp_gastos = JSON.parse(eventos.rows.item(i).gastos_ids);
        this.initReserva();
        //this.initializeCategories();
        //console.log(JSON.stringify(this.navParams.get('evento')));
    }
    DetallesReservaPage.prototype.initReserva = function () {
        var self = this;
        self.itinerario = [];
        self.gastos_ciudad = [];
        self.cargar = true;
        self.getDatos.ejecutarSQL('SELECT * FROM eventos WHERE id = ' + self.evento_hijo).then(function (eventos) {
            var tmp_gastos_ids = JSON.parse(eventos.rows.item(0).gastos_ids);
            var tmp_representante_id = JSON.parse(eventos.rows.item(0).representante_id);
            var tmp_cliente_id = JSON.parse(eventos.rows.item(0).cliente_id);
            self.reserva = eventos.rows.item(0);
            self.reserva.gastos_ids = tmp_gastos_ids;
            self.reserva.representante_id = tmp_representante_id;
            self.reserva.cliente_id = tmp_cliente_id;
            self.getDatos.ejecutarSQL('SELECT name, ciudad_id, Fecha_Inicio, id FROM eventos WHERE is_padre = "false" and  name = "' + self.reserva.name + '"').then(function (eventos) {
                console.log(JSON.stringify(eventos));
                for (var i = 0; i < eventos.rows.length; i++) {
                    //console.log(JSON.stringify(gastos.rows.item(i)));                         
                    //var tmp_concepto_gasto_id = JSON.parse(gastos.rows.item(i).concepto_gasto_id)
                    var tmp_ciudad_id = JSON.parse(eventos.rows.item(i).ciudad_id);
                    var concepto = eventos.rows.item(i);
                    //concepto.concepto_gasto_id = tmp_concepto_gasto_id;
                    concepto.ciudad_id = tmp_ciudad_id;
                    self.itinerario.push(concepto);
                }
                console.log('SELECT * FROM attachment WHERE cliente_id = "' + self.reserva.cliente_id[0] + '"');
                self.getDatos.ejecutarSQL('SELECT * FROM attachment WHERE cliente_id = "' + self.reserva.cliente_id[0] + '"').then(function (attachment) {
                    for (var i = 0; i < attachment.rows.length; i++) {
                        var att = attachment.rows.item(i);
                        att.file_size = self.getDatos.bytesToSize(parseInt(att.file_size));
                        //var tmp_file_size = attachment.rows.item(i).file_size;
                        //console.log('file size:' + );
                        //console.log(JSON.stringify(attachment.rows.item(i)));      
                        self.attachment.push(att);
                    }
                    var tmp_gastos = self.reserva.gastos_ids;
                    var where = '(';
                    for (var i = tmp_gastos.length - 1; i >= 0; i--) {
                        where = where + tmp_gastos[i] + ",";
                    }
                    where = where.substring(0, where.length - 1); // "12345.0"
                    where = where + ')';
                    var sql = 'SELECT * FROM gastosciudad WHERE id in ' + where;
                    console.log(sql);
                    self.getDatos.ejecutarSQL(sql).then(function (gastos) {
                        console.log(JSON.stringify(gastos));
                        for (var i = 0; i < gastos.rows.length; i++) {
                            console.log(JSON.stringify(gastos.rows.item(i)));
                            var tmp_evento_id = JSON.parse(gastos.rows.item(i).evento_id);
                            //var tmp_ciudad_id = JSON.parse(gastos.rows.item(i).ciudad_id)
                            var concepto = gastos.rows.item(i);
                            concepto.evento_id = tmp_evento_id;
                            self.gastos_ciudad.push(concepto);
                        }
                        self.cargar = false;
                    }, function (fail) {
                        console.log('Fail load gastos');
                    });
                    //self.cargar = false;
                }, function (fail) {
                    console.log('Fail load gastos');
                });
                /**/
            }, function (fail) {
                console.log('Fail load evento');
            });
        }, function (fail) {
            console.log('Fail load evento');
        });
    };
    DetallesReservaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetallesReservaPage');
    };
    DetallesReservaPage.prototype.closeModal = function (x) {
        if (x == 'x') {
            this.viewCtrl.dismiss(null);
        }
        else {
            //this.viewCtrl.dismiss(this.item);
        }
    };
    DetallesReservaPage.prototype.initializeCategories = function () {
        // Select it by defaut
        console.log(this.categories);
        this.selectedCategory = this.categories[0];
        this.selectedCategory.visible = true;
        // Check which arrows should be shown
        this.showLeftButton = false;
        this.showRightButton = this.categories.length > 3;
    };
    DetallesReservaPage.prototype.filterData = function (categoryId) {
        // Handle what to do when a category is selected
        //console.log(categoryId);
        var _this = this;
        Object.keys(this.categories).forEach(function (key) {
            if (_this.categories[key].id == categoryId) {
                _this.categories[key].visible = true;
            }
            else {
                _this.categories[key].visible = false;
            }
            //console.log(this.categories[key]);
        });
    };
    // Method executed when the slides are changed
    DetallesReservaPage.prototype.slideChanged = function () {
        var currentIndex = this.slides.getActiveIndex();
        this.showLeftButton = currentIndex !== 0;
        this.showRightButton = currentIndex !== Math.ceil(this.slides.length() / 3);
    };
    // Method that shows the next slide
    DetallesReservaPage.prototype.slideNext = function () {
        this.slides.slideNext();
    };
    // Method that shows the previous slide
    DetallesReservaPage.prototype.slidePrev = function () {
        this.slides.slidePrev();
    };
    DetallesReservaPage.prototype.abrirGasto = function (gasto) {
        this.navCtrl.push(GastosRelPage, { gastos_rel: gasto });
    };
    DetallesReservaPage.prototype.descargarAtt = function (att) {
        var self = this;
        self.ver_download = true;
        console.log(att.id);
        self.getDatos.search_read('ir.attachment', [["id", "=", att.id]], ["datas", "mimetype"]).then(function (res) {
            //var tabla = 
            console.log(JSON.stringify(res[0].mimetype));
            var ext = '';
            var mimetype_tmp = res[0].mimetype.toString();
            if (mimetype_tmp == "application/pdf") {
                ext = '.pdf';
            }
            else if (mimetype_tmp == "image/png") {
                ext = '.png';
            }
            var downloadPDF = res[0].datas;
            var base64pdf = downloadPDF;
            var binary = atob(base64pdf.replace(/\s/g, ''));
            var len = binary.length;
            var buffer = new ArrayBuffer(len);
            var view = new Uint8Array(buffer);
            for (var i = 0; i < len; i++) {
                view[i] = binary.charCodeAt(i);
            }
            var blobPdf = new Blob([view], { type: res[0].mimetype.toString() });
            var opt = { replace: true };
            if (self.plt.is('ios')) {
                console.log('------------------loading in IOS');
                var nativeUrl = (self.file.applicationStorageDirectory + "tmp/" + fileName).substring(7);
                console.log();
                self.file.writeFile(self.file.applicationStorageDirectory, att.name.trim() + ext, blobPdf, opt).then(function (res) {
                    console.log('file saved' + res.nativeURL);
                    //self.presentToast();
                    self.fileOpener.open(res.toInternalURL(), mimetype_tmp //file mimeType
                    ).then(function (success) {
                        console.log('success open file: ', success);
                    }, function (err) {
                        console.log('error open file', err.message);
                    });
                }, function (fail) {
                    console.log(JSON.stringify(fail));
                });
            }
            else {
                self.file.writeFile(self.file.externalDataDirectory, att.name + ext, blobPdf, opt).then(function (res) {
                    console.log('file saved' + res.nativeURL);
                    //self.presentToast();
                    self.fileOpener.open(res.toInternalURL(), mimetype_tmp //file mimeType
                    ).then(function (success) {
                        console.log('success open file: ', success);
                    }, function (err) {
                        console.log('error open file', err.message);
                    });
                }, function (fail) {
                    console.log(JSON.stringify(fail));
                });
            }
            //self.file.writeFile(self.file.dataDirectory, att.name + ext, blobPdf, opt).then(
            self.ver_download = false;
        }, function (fail) {
            console.log('Fail downloading att');
        });
    };
    DetallesReservaPage.prototype.cargarEvento = function (evt) {
        this.navCtrl.push(EventoPage, { evento: evt, permisos: 'is_root' });
    };
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], DetallesReservaPage.prototype, "slides", void 0);
    DetallesReservaPage = __decorate([
        Component({
            selector: 'page-detalles-reserva',
            templateUrl: 'detalles-reserva.html',
        }),
        __metadata("design:paramtypes", [Platform, FileOpener, File, ViewController, NavController, NavParams, GetDatosProvider])
    ], DetallesReservaPage);
    return DetallesReservaPage;
}());
export { DetallesReservaPage };
//# sourceMappingURL=detalles-reserva.js.map