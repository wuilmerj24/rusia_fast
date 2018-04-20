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
import { IonicPage, Slides, NavController, NavParams, ViewController } from 'ionic-angular';
/**
 * Generated class for the DetallesReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DetallesReservaPage = /** @class */ (function () {
    function DetallesReservaPage(viewCtrl, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.categories = [{ id: 1, name: 'Resumen', visible: false },
            { id: 2, name: 'Descripción', visible: false },
            { id: 3, name: 'Documentos', visible: false },
            { id: 4, name: 'Costos Generales', visible: false },
            { id: 5, name: 'Costos por ciudad', visible: false },
            { id: 6, name: 'Gatos extras', visible: false },
            { id: 7, name: 'Comentarios', visible: false }];
        this.editable = false;
        this.reserva = this.navParams.get('reserva');
        this.initializeCategories();
    }
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
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], DetallesReservaPage.prototype, "slides", void 0);
    DetallesReservaPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-detalles-reserva',
            templateUrl: 'detalles-reserva.html',
        }),
        __metadata("design:paramtypes", [ViewController, NavController, NavParams])
    ], DetallesReservaPage);
    return DetallesReservaPage;
}());
export { DetallesReservaPage };
//# sourceMappingURL=detalles-reserva.js.map