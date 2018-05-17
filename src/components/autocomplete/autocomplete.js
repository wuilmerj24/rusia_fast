var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
/**
 * Generated class for the AutocompleteComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var AutocompleteComponent = /** @class */ (function () {
    function AutocompleteComponent() {
        //@Input('default') default;
        this.onselect = new EventEmitter;
        this.lista = [];
        this.lista_visible = false;
        //lista2 = [];
        this.buscar = '';
        this.id = 0;
        //console.log('Hello AutocompleteComponent Component');
        //this.text = 'Hello World';
        //this.buscar = this.default;
    }
    AutocompleteComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        console.log('defaul value is:');
        console.log(this.default.length);
        if (this.default.length > 0) {
            setTimeout(function () {
                _this.buscar = _this.default[1];
                _this.id = _this.default[0];
            }, 0);
        }
    };
    AutocompleteComponent.prototype.onKey = function (e) {
        //console.log(e);
        if (this.buscar.length > 0) {
            console.log('entro en el key ');
            this.lista_visible = true;
            this.lista = [];
            for (var key in this.lista2) {
                //console.log(JSON.stringify(this.lista2[key]));
                //console.log(String(this.lista2[key].name).toLowerCase());
                if (String(this.lista2[key].name).toLowerCase().includes(this.buscar.toLowerCase())) {
                    this.lista.push(this.lista2[key]);
                }
            }
        }
        else {
            this.lista_visible = false;
        }
    };
    /*onCancel(e) {
        console.log(e);
        console.log('Si esta cancelando');
        this.lista_visible = false;
        this.lista = [];
    }*/
    AutocompleteComponent.prototype.selectItem = function (valor) {
        this.lista_visible = false;
        this.buscar = valor.name;
        this.id = valor.id;
        console.log(this.id);
        this.onselect.emit(this.id);
    };
    __decorate([
        Input('lista'),
        __metadata("design:type", Array)
    ], AutocompleteComponent.prototype, "lista2", void 0);
    __decorate([
        Input('default'),
        __metadata("design:type", Array)
    ], AutocompleteComponent.prototype, "default", void 0);
    __decorate([
        Input('placeholder'),
        __metadata("design:type", Object)
    ], AutocompleteComponent.prototype, "placeholder", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AutocompleteComponent.prototype, "onselect", void 0);
    AutocompleteComponent = __decorate([
        Component({
            selector: 'autocomplete',
            templateUrl: 'autocomplete.html'
        }),
        __metadata("design:paramtypes", [])
    ], AutocompleteComponent);
    return AutocompleteComponent;
}());
export { AutocompleteComponent };
//# sourceMappingURL=autocomplete.js.map