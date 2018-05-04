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
import { IonicPage, Slides, NavController, NavParams, ModalController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { GatosTourPage } from '../../pages/gatos-tour/gatos-tour';
var EventoPage = /** @class */ (function () {
    function EventoPage(navCtrl, navParams, getDatos, modalCtrl) {
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
            gastostoursline_ids: []
        };
        this.gastostoursline_ids = [];
        this.editable = false;
        this.cargar = false;
        this.permisos = '';
        this.ver_segmento = true;
        this.evento_cal = this.navParams.get('evento');
        this.permisos = this.navParams.get('permisos');
        //console.log('permisos:'+ this.permisos);
        if (this.permisos == 'is_client') {
            this.ver_segmento = false;
            this.categories = [{ id: 1, name: 'Resumen', visible: false },
                { id: 2, name: 'Descripción', visible: false },
                { id: 3, name: 'Gastos', visible: false },
                { id: 4, name: 'Documentos', visible: false },
                { id: 5, name: 'Comentarios', visible: false }];
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
    EventoPage.prototype.initEvento = function () {
        var self = this;
        self.gastostoursline_ids = [];
        self.cargar = true;
        self.getDatos.ejecutarSQL('SELECT * FROM eventos WHERE id = ' + self.evento_cal.id).then(function (eventos) {
            var tmp_evento_id = JSON.parse(eventos.rows.item(0).evento_id);
            var tmp_cliente_id = JSON.parse(eventos.rows.item(0).cliente_id);
            var tmp_representante_id = JSON.parse(eventos.rows.item(0).representante_id);
            var tmp_guia_id = JSON.parse(eventos.rows.item(0).guia_id);
            var tmp_chofer_id = JSON.parse(eventos.rows.item(0).chofer_id);
            var tmp_hotel_id = JSON.parse(eventos.rows.item(0).hotel_id);
            var tmp_ciudad_id = JSON.parse(eventos.rows.item(0).ciudad_id);
            var tmp_gatos = JSON.parse(eventos.rows.item(0).gastostoursline_ids);
            var domanin = '';
            for (var i = tmp_gatos.length - 1; i >= 0; i--) {
                if (i == 0) {
                    domanin = domanin + tmp_gatos[i];
                }
                else {
                    domanin = domanin + tmp_gatos[i] + ",";
                }
            }
            self.evento = eventos.rows.item(0);
            self.evento.evento_id = tmp_evento_id;
            self.evento.cliente_id = tmp_cliente_id;
            self.evento.representante_id = tmp_representante_id;
            self.evento.guia_id = tmp_guia_id;
            self.evento.chofer_id = tmp_chofer_id;
            self.evento.hotel_id = tmp_hotel_id;
            self.evento.ciudad_id = tmp_ciudad_id;
            self.evento.gastostoursline_ids = tmp_gatos;
            //console.log(self.evento.name);
            //console.log('self.gastostoursline_ids' + JSON.stringify(self.gastostoursline_ids));
            self.getDatos.ejecutarSQL('SELECT * FROM gastostoursline WHERE eventos_id = "' + self.evento.id + ',' + self.evento.name + '"').then(function (gastos) {
                console.log(JSON.stringify(gastos.rows.item(i)));
                for (var i = 0; i < gastos.rows.length; i++) {
                    var tmp_concepto_gasto_id = JSON.parse(gastos.rows.item(i).concepto_gasto_id);
                    var tmp_ciudad_id = JSON.parse(gastos.rows.item(i).ciudad_id);
                    var concepto = gastos.rows.item(i);
                    concepto.concepto_gasto_id = tmp_concepto_gasto_id;
                    concepto.ciudad_id = tmp_ciudad_id;
                    self.gastostoursline_ids.push(concepto);
                }
                self.cargar = false;
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
    EventoPage.prototype.guardar_btn = function () {
        this.guardar().then(function (res) {
            console.log('save event ok');
        }).catch(function (e) {
            console.log(e);
        });
    };
    EventoPage.prototype.guardar = function () {
        var self = this;
        self.cargar = true;
        var promise = new Promise(function (resolve, reject) {
            console.log('------------------------------campos ----------------');
            /*
            var campos = {
                 //cliente_id :[0,''],
                 //representante_id :[0,''],
                 //Fecha_Inicio : this.evento.Fecha_Inicio,
                 //Fecha_Fin :this.evento.Fecha_Fin,
                 //hora_inicio :self.evento.hora_inicio,
                 //hora_final :self.evento.hora_final,
                 //name :'',
                 //is_padre :'',
                 //fecha_padre :'',
                 //guia_id :[0,''],
                 //chofer_id :[0,''],
                 //gasto_rub :this.evento.gasto_rub,
                 //gasto_eur :this.evento.gasto_eur,
                 //gasto_usd :this.evento.gasto_usd,
                 //gasto_paypal :this.evento.gasto_paypal,
                 //Comentarios_Chofer :self.evento.Comentarios_Chofer,
                 //Comentarios_Internos :self.evento.Comentarios_Internos,
                 //Comentarios_Cliente :self.evento.Comentarios_Cliente,
                 //Comentarios_Guia:self.evento.Comentarios_Guia,
                 //Transporte :self.evento.Transporte,
                 //hotel_id :[0,''],
                 //ciudad_id :[0,''],
                 //Total_Representante :self.evento.Total_Representante,
                 //message:self.evento.message,
                 //numero_pax :self.evento.numero_pax,
                 //evento_id : [0,''],
                 //Servicio_Gastos :self.evento.Servicio_Gastos,
                 //tarjeta_eur :this.evento.tarjeta_eur,
                 //tarjeta_rub :this.evento.tarjeta_rub,
                 //tarjeta_usd :this.evento.tarjeta_usd,
                 //is_traslado :self.evento.is_traslado,
                 //is_guia:self.evento.is_guia,
                 gastostoursline_ids:[6, 0, self.evento.gastostoursline_ids]

            };*/
            /*
            var existing_value_id = [69,70,71];
'value_ids'=>array(array(6,0,array($existing_value_id)))*/
            //var campos = {"gastostoursline_ids":[6,0,[69,70,71,101,105,106,107]]}
            var campos = {
                gastostoursline_ids: [[0, 0, [101]]],
                Comentarios_Chofer: self.evento.Comentarios_Chofer
            };
            console.log(JSON.stringify(campos));
            //console.log('ID:' + this.evento.id)
            //console.log('usd:' + campos.gasto_usd)
            self.getDatos.write('rusia.eventos', self.evento.id, campos).then(function (res) {
                console.log('save event ok');
                self.cargar = false;
                resolve();
            }, function (fail) {
                console.log('error saving event');
                reject();
            });
        });
        return promise;
    };
    EventoPage.prototype.initializeCategories = function () {
        // Select it by defaut
        //console.log(this.categories)
        this.selectedCategory = this.categories[0];
        this.selectedCategory.visible = true;
        // Check which arrows should be shown
        this.showLeftButton = false;
        this.showRightButton = this.categories.length > 3;
    };
    EventoPage.prototype.filterData = function (categoryId) {
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
        this.navCtrl.push(GatosTourPage, { gasto: item, ver_segmento: this.editable });
    };
    EventoPage.prototype.agregarGasto = function () {
        var self = this;
        var profileModal = this.modalCtrl.create(GatosTourPage, { gasto: null, ver_segmento: this.editable, eventos_id: this.evento.id });
        profileModal.onDidDismiss(function (data) {
            if (data > 0) {
                self.getDatos.cargarGastos();
                self.initEvento();
            }
        });
        profileModal.present();
    };
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], EventoPage.prototype, "slides", void 0);
    EventoPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-evento',
            templateUrl: 'evento.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider, ModalController])
    ], EventoPage);
    return EventoPage;
}());
export { EventoPage };
//# sourceMappingURL=evento.js.map