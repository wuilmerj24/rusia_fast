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
import { IonicPage, Slides, NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
var EventoPage = /** @class */ (function () {
    function EventoPage(navCtrl, navParams, getDatos) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.categories = [{ id: 1, name: 'Resumen', visible: false },
            { id: 2, name: 'Descripción', visible: false },
            { id: 3, name: 'Gastos', visible: false },
            { id: 4, name: 'Documentos', visible: false },
            { id: 5, name: 'Comentarios', visible: false }];
        this.evento = { id: 0,
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
            tarjeta_usd: '' };
        this.editable = false;
        this.evento_cal = this.navParams.get('evento');
        var self = this;
        this.getDatos.getTable('SELECT * FROM eventos_root WHERE id = ' + this.evento_cal.id).then(function (eventos) {
            var tmp_evento_id = JSON.parse(eventos.rows.item(0).evento_id);
            var tmp_cliente_id = JSON.parse(eventos.rows.item(0).cliente_id);
            var tmp_representante_id = JSON.parse(eventos.rows.item(0).representante_id);
            var tmp_guia_id = JSON.parse(eventos.rows.item(0).guia_id);
            var tmp_chofer_id = JSON.parse(eventos.rows.item(0).chofer_id);
            var tmp_hotel_id = JSON.parse(eventos.rows.item(0).hotel_id);
            var tmp_ciudad_id = JSON.parse(eventos.rows.item(0).ciudad_id);
            console.log(tmp_evento_id[1]);
            self.evento = eventos.rows.item(0);
            self.evento.evento_id = tmp_evento_id;
            self.evento.cliente_id =
                self.evento.
                    self.evento.
                    self.evento.
                    self.evento.
            ;
            //console.log(eventos.rows.item(0).evento_id);
            //console.log( JSON.parse(eventos.rows.item(0).evento_id));
        }, function (fail) {
            console.log('Fail load evento');
        });
        this.initializeCategories();
    }
    EventoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EventoPage');
    };
    EventoPage.prototype.initializeCategories = function () {
        // Select it by defaut
        console.log(this.categories);
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
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider])
    ], EventoPage);
    return EventoPage;
}());
export { EventoPage };
//# sourceMappingURL=evento.js.map