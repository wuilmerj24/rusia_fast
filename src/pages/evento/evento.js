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
import { Slides, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { GatosTourPage } from '../../pages/gatos-tour/gatos-tour';
import { DetallesReservaPage } from '../../pages/detalles-reserva//detalles-reserva';
import { DocumentoPage } from '../../pages/documento/documento';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
var EventoPage = /** @class */ (function () {
    //private fileOpener: FileOpener,
    function EventoPage(fileOpener, toastCtrl, file, navCtrl, navParams, getDatos, modalCtrl) {
        this.fileOpener = fileOpener;
        this.toastCtrl = toastCtrl;
        this.file = file;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.modalCtrl = modalCtrl;
        this.evento = { id: -1,
            cliente_id: [0, ''],
            representante_id: [0, ''],
            Fecha_Inicio: '',
            Fecha_Fin: '',
            hora_inicio: '',
            hora_final: '',
            hora_chofer: '',
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
        };
        this.gastostoursline_ids = [];
        this.attachment = [];
        this.gastostours = [];
        this.editable = false;
        this.cargar = false;
        this.permisos = '';
        this.ver_segmento = true;
        this.ver_gastos = false;
        this.ver_resumen = false;
        this.ver_descripcion = false;
        this.ver_documentos = false;
        this.ver_comentarios = false;
        this.ver_download = false;
        this.evento_cal = this.navParams.get('evento');
        this.permisos = this.navParams.get('permisos');
        //console.log('permisos:'+ this.permisos);
        if (this.permisos == 'is_client') {
            this.ver_segmento = false;
            this.categories = [{ id: 1, name: 'Resumen', visible: false },
                { id: 2, name: 'Descripción', visible: false },
                //{id:3, name:'Gastos', visible:false},
                { id: 4, name: 'Documentos', visible: false },
                { id: 5, name: 'Comentarios', visible: false }]; //3
        }
        else if (this.permisos == 'is_chofer') {
            this.categories = [{ id: 1, name: 'Resumen', visible: false },
                { id: 2, name: 'Descripción', visible: false },
                //{id:3, name:'Gastos', visible:false},
                { id: 4, name: 'Documentos', visible: false },
                { id: 5, name: 'Comentarios', visible: false }]; //3
        }
        else {
            this.categories = [{ id: 1, name: 'Resumen', visible: false },
                { id: 2, name: 'Descripción', visible: false },
                { id: 3, name: 'Gastos', visible: false },
                { id: 4, name: 'Documentos', visible: false },
                { id: 5, name: 'Comentarios', visible: false }];
        }
        this.initEvento();
        this.initializeCategories();
    }
    EventoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EventoPage');
    };
    EventoPage.prototype.adjustTextarea = function (event) {
        var textarea = event.target;
        textarea.style.overflow = 'hidden';
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        return;
    };
    EventoPage.prototype.initEvento = function () {
        var self = this;
        self.gastostoursline_ids = [];
        self.attachment = [];
        self.gastostours = [];
        self.cargar = true;
        self.getDatos.ejecutarSQL('SELECT * FROM eventos WHERE id = ' + self.evento_cal.id).then(function (eventos) {
            var evento = eventos.rows.item(0);
            var tmp_evento_id = JSON.parse(evento.evento_id);
            var tmp_cliente_id = JSON.parse(evento.cliente_id);
            var tmp_representante_id = JSON.parse(evento.representante_id);
            var tmp_guia_id = JSON.parse(evento.guia_id);
            var tmp_chofer_id = JSON.parse(evento.chofer_id);
            var tmp_hotel_id = JSON.parse(evento.hotel_id);
            var tmp_ciudad_id = JSON.parse(evento.ciudad_id);
            self.evento = evento;
            self.evento.evento_id = tmp_evento_id;
            self.evento.cliente_id = tmp_cliente_id;
            self.evento.representante_id = tmp_representante_id;
            self.evento.guia_id = tmp_guia_id;
            self.evento.chofer_id = tmp_chofer_id;
            self.evento.hotel_id = tmp_hotel_id;
            self.evento.ciudad_id = tmp_ciudad_id;
            self.getDatos.ejecutarSQL('SELECT * FROM gastostoursline WHERE eventos_id = "' + self.evento.id + '"').then(function (gastos) {
                for (var i = 0; i < gastos.rows.length; i++) {
                    //                    	
                    var tmp_concepto_gasto_id = JSON.parse(gastos.rows.item(i).concepto_gasto_id);
                    var tmp_ciudad_id = JSON.parse(gastos.rows.item(i).ciudad_id);
                    var concepto = gastos.rows.item(i);
                    concepto.concepto_gasto_id = tmp_concepto_gasto_id;
                    concepto.ciudad_id = tmp_ciudad_id;
                    self.gastostoursline_ids.push(concepto);
                }
                //self.cargar = false;
                console.log('SELECT * FROM attachment WHERE res_id = "' + self.evento.id + '"');
                self.getDatos.ejecutarSQL('SELECT * FROM attachment WHERE eventos_id = "' + self.evento.id + '"').then(function (attachment) {
                    console.log(JSON.stringify(attachment.rows));
                    for (var i = 0; i < attachment.rows.length; i++) {
                        var att = attachment.rows.item(i);
                        console.log(self.getDatos.usr.tipo_usuario);
                        att.file_size = self.getDatos.bytesToSize(parseInt(att.file_size));
                        if (self.getDatos.usr.tipo_usuario == 'is_client' && att.is_cliente == 'true') {
                            self.attachment.push(att);
                        }
                        else {
                            self.attachment.push(att);
                        }
                    }
                    //self.cargar = false;
                    //				                console.log('SELECT * FROM attachment WHERE gastostours');
                    self.getDatos.ejecutarSQL('SELECT * FROM gastostours').then(function (gastostours) {
                        for (var i = 0; i < gastostours.rows.length; i++) {
                            var gastos = gastostours.rows.item(i);
                            var tmp_ciudades = JSON.parse(gastos.ciudades);
                            if (tmp_ciudades.indexOf(self.evento.ciudad_id[0]) > -1) {
                                self.gastostours.push(gastos);
                                //console.log(eventos[key].name);
                            }
                        }
                        self.cargar = false;
                    }, function (fail) {
                        console.log('Fail load gastos');
                    });
                }, function (fail) {
                    console.log('Fail load gastos');
                });
            }, function (fail) {
                console.log('Fail load gastos');
            });
        }, function (fail) {
            console.log('Fail load evento');
        });
    };
    EventoPage.prototype.editar = function () {
        if (!this.editable) {
            this.editable = true;
        }
        else {
            this.editable = false;
        }
    };
    EventoPage.prototype.guardar = function (dato, opcion) {
        var self = this;
        self.cargar = true;
        var promise = new Promise(function (resolve, reject) {
            if (self.editable) {
                var campos;
                switch (opcion) {
                    case 0:
                        campos = {
                            Fecha_Inicio: self.evento.Fecha_Inicio,
                            hora_inicio: self.evento.hora_inicio,
                            hora_final: self.evento.hora_final,
                            Comentarios_Chofer: self.evento.Comentarios_Chofer,
                            Comentarios_Internos: self.evento.Comentarios_Internos,
                            Comentarios_Cliente: self.evento.Comentarios_Cliente,
                            Comentarios_Guia: self.evento.Comentarios_Guia,
                            Transporte: self.evento.Transporte,
                            message: self.evento.message,
                            numero_pax: self.evento.numero_pax,
                            is_traslado: self.evento.is_traslado,
                            is_guia: self.evento.is_guia
                        };
                    case 1:
                        campos = {
                            gastostoursline_ids: dato
                        };
                        break;
                    case 2:
                        campos = {
                            documentos_ids: [[0, false, dato]]
                        };
                        break;
                    default:
                        // code...
                        break;
                }
                self.getDatos.write('rusia.eventos', self.evento.id, campos).then(function (res) {
                    console.log('save event ok');
                    self.cargar = false;
                    resolve();
                }, function (fail) {
                    console.log('error saving event');
                    reject();
                });
            }
            else {
                console.log('editable is false');
                reject();
            }
        });
        return promise;
    };
    EventoPage.prototype.initializeCategories = function () {
        // Select it by defaut
        //console.log(this.categories)
        this.selectedCategory = this.categories[0];
        this.ver_resumen = true;
        //this.selectedCategory.visible = true;        
        // Check which arrows should be shown
        this.showLeftButton = false;
        this.showRightButton = this.categories.length > 3;
    };
    EventoPage.prototype.allHide = function () {
        this.ver_resumen = false;
        this.ver_descripcion = false;
        this.ver_gastos = false;
        this.ver_comentarios = false;
        this.ver_documentos = false;
    };
    EventoPage.prototype.filterData = function (categoryId) {
        // Handle what to do when a category is selected
        //console.log(categoryId);
        switch (categoryId) {
            case 1:
                this.allHide();
                this.ver_resumen = true;
                break;
            case 2:
                this.allHide();
                this.ver_descripcion = true;
                break;
            case 3:
                this.allHide();
                this.ver_gastos = true;
                break;
            case 4:
                this.allHide();
                this.ver_documentos = true;
                break;
            case 5:
                this.allHide();
                this.ver_comentarios = true;
                break;
            default:
                this.allHide();
                break;
        }
    };
    // Method executed when the slides are changed
    EventoPage.prototype.slideChanged = function () {
        var currentIndex = this.slides.getActiveIndex();
        this.showLeftButton = currentIndex !== 0;
        this.showRightButton = currentIndex !== Math.ceil(this.slides.length() / 3);
    };
    // Method that shows the next slide
    EventoPage.prototype.slideNext = function () {
        this.slides.slideNext();
    };
    // Method that shows the previous slide
    EventoPage.prototype.slidePrev = function () {
        this.slides.slidePrev();
    };
    EventoPage.prototype.abrirGasto = function (item) {
        //item.concepto_gasto_id = JSON.stringify(item.concepto_gasto_id);
        console.log(item.fecha);
        var self = this;
        var gasto = {
            id: item.id,
            concepto_gasto_id: item.concepto_gasto_id,
            Total: item.Total,
            tipo_moneda: item.tipo_moneda,
            ciudad_id: item.ciudad_id,
            usuario_id: JSON.parse(item.usuario_id),
            observaciones: item.observaciones,
            evento_padre: item.evento_padre,
            eventos_id: item.eventos_id,
            fecha: new Date(item.fecha).toISOString()
        };
        var profileModal = this.modalCtrl.create(GatosTourPage, { gasto: gasto, ver_segmento: this.editable, lista_gastos: self.gastostours });
        profileModal.onDidDismiss(function (data) {
            if (data != 'x') {
                console.log(typeof data);
                if (typeof data == 'boolean') {
                    self.cargar = true;
                    self.getDatos.cargarCalendario(true, true, false, false).then(function (res) {
                        console.log('Update complete');
                        self.initEvento();
                    }, function (fail) {
                        console.log('Error loading cgastos');
                    });
                }
                else {
                    console.log('---------------------------------------update ');
                    self.cargar = true;
                    console.log(JSON.stringify([[1, gasto.id, data]]));
                    self.guardar([[1, gasto.id, data]], 1).then(function (res) {
                        self.cargar = true;
                        self.getDatos.cargarCalendario(true, true, false, false).then(function (res) {
                            console.log('Update complete');
                            self.initEvento();
                        }, function (fail) {
                            console.log('Error loading cgastos');
                        });
                    }, function (fail) {
                        console.log('Error loading cgastos');
                    });
                }
            }
        });
        profileModal.present();
    };
    EventoPage.prototype.agregarGasto = function () {
        var self = this;
        var gasto = {
            id: null,
            concepto_gasto_id: [],
            Total: '',
            tipo_moneda: '',
            ciudad_id: self.evento.ciudad_id,
            usuario_id: [],
            observaciones: '',
            evento_padre: this.evento.name,
            eventos_id: this.evento.id,
            fecha: new Date().toISOString()
        }; //gasto:{, , , id:nul
        var profileModal = this.modalCtrl.create(GatosTourPage, { gasto: gasto, ver_segmento: self.editable, lista_gastos: self.gastostours });
        profileModal.onDidDismiss(function (data) {
            if (data != 'x') {
                self.guardar([[0, 0, data]], 1).then(function (res) {
                    self.cargar = true;
                    self.getDatos.cargarCalendario(true, true, false, false).then(function (res) {
                        console.log('Update complete');
                        self.initEvento();
                    }, function (fail) {
                        console.log('Error loading cgastos');
                    });
                }, function (fail) {
                    console.log('Error loading cgastos');
                });
            }
        });
        profileModal.present();
    };
    EventoPage.prototype.descargarAtt = function (att) {
        var self = this;
        self.ver_download = true;
        console.log(att.id);
        self.getDatos.search_read('ir.attachment', [["id", "=", att.id]], ["datas", "mimetype"]).then(function (res) {
            //var tabla = 
            console.log(JSON.stringify(res[0].mimetype));
            var ext = '';
            if (res[0].mimetype.toString() == "application/pdf") {
                ext = '.pdf';
            }
            else if (res[0].mimetype.toString() == "image/png") {
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
            //var blob = new Blob([res[0].datas], {type: res[0].mimetype});
            //var blob = 'data:application/pdf;base64,' +res[0].datas;
            /*if (ionic.Platform.isIOS()) {
        pathFile = cordova.file.documentsDirectory
    } else {
        pathFile = cordova.file.externalDataDirectory
    }
            );*/
            self.file.writeFile(self.file.externalDataDirectory, att.name + ext, blobPdf, opt).then(function (res) {
                console.log('file saved' + res.nativeURL);
                self.presentToast();
                self.fileOpener.open(res.toInternalURL(), 'application/pdf' //file mimeType
                ).then(function (success) {
                    console.log('success open file: ', success);
                }, function (err) {
                    console.log('error open file', err.message);
                });
            }, function (fail) {
                console.log(JSON.stringify(fail));
            });
            self.ver_download = false;
        }, function (fail) {
            console.log('Fail downloading att');
        });
    };
    EventoPage.prototype.borrarAttachment = function (id) {
        console.log(id);
        this.cargar = true;
        var self = this;
        if (id != null) { // nuevo		
            //console.log('self.gasto.id ' +  self.gasto.id );
            self.getDatos.eliminar('ir.attachment', id).then(function (res) {
                self.cargar = true;
                self.getDatos.cargarCalendario(true, false, true, false).then(function (res) {
                    console.log('Update complete');
                    self.initEvento();
                }, function (fail) {
                    console.log('Error loading cgastos');
                });
            }, function (fail) {
                console.log('error create gastos');
            });
        }
    };
    EventoPage.prototype.abrirReserva = function () {
        //console.log('entro');
        // 
        this.navCtrl.push(DetallesReservaPage, { evento: this.evento, permisos: this.permisos, padre: false });
    };
    EventoPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Archivo descargado',
            duration: 2000,
            position: 'top'
        });
        /*toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });*/
        toast.present();
    };
    EventoPage.prototype.agregarAttachment = function () {
        var self = this;
        var profileModal = this.modalCtrl.create(DocumentoPage);
        profileModal.onDidDismiss(function (data) {
            if (data != 'x') {
                data.cliente_id = self.evento.cliente_id[0];
                data.res_id = self.evento.id;
                console.log(data.cliente_id);
                self.guardar(data, 2).then(function (res) {
                    self.cargar = true;
                    self.getDatos.cargarCalendario(true, false, true, false).then(function (res) {
                        console.log('Update complete');
                        self.initEvento();
                    }, function (fail) {
                        console.log('Error loading cgastos');
                    });
                }, function (fail) {
                    console.log('Error loading cgastos');
                });
            }
        });
        profileModal.present();
    };
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], EventoPage.prototype, "slides", void 0);
    EventoPage = __decorate([
        Component({
            selector: 'page-evento',
            templateUrl: 'evento.html',
        }),
        __metadata("design:paramtypes", [FileOpener, ToastController, File, NavController, NavParams, GetDatosProvider, ModalController])
    ], EventoPage);
    return EventoPage;
}());
export { EventoPage };
//# sourceMappingURL=evento.js.map