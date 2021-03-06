var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the ChoferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChoferPage = /** @class */ (function () {
    function ChoferPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cargar = false;
        this.viewTitle = '';
        this.calendar = {
            eventSource: [],
            mode: 'month',
            currentDate: new Date(),
            formatDayHeader: 'E',
            noEventsLabel: 'Sin Eventos',
            formatMonthTitle: 'MMMM yyyy',
            allDayLabel: 'Todo el día',
            formatWeekTitle: 'MMMM yyyy, Se $n'
        };
    }
    ChoferPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChoferPage');
    };
    ChoferPage.prototype.onViewTitleChanged = function (title) {
        this.viewTitle = title;
    };
    ChoferPage = __decorate([
        Component({
            selector: 'page-chofer',
            templateUrl: 'chofer.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], ChoferPage);
    return ChoferPage;
}());
export { ChoferPage };
//# sourceMappingURL=chofer.js.map