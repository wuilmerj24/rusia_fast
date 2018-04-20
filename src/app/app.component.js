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
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CalendarioPage } from '../pages/calendario/calendario';
import { ChoferPage } from '../pages/chofer/chofer';
import { ConfiPage } from '../pages/confi/confi';
import { GuiaPage } from '../pages/guia/guia';
import { GananciasPage } from '../pages/ganancias/ganancias';
import { ReservasPage } from '../pages/reservas/reservas';
import { AcercaPage } from '../pages/acerca/acerca';
import { LoginPage } from '../pages/login/login';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Calendario', component: CalendarioPage },
            { title: 'Chofer adjudicado', component: ChoferPage },
            { title: 'Guia adjudicado', component: GuiaPage },
            { title: 'Reservas', component: ReservasPage },
            { title: 'Ganancias', component: GananciasPage },
            { title: 'Configuración', component: ConfiPage },
            { title: 'Acerca de', component: AcercaPage },
            { title: 'Salir', component: 'salir' },
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.rootPage = LoginPage;
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.component == 'salir') {
            this.nav.setRoot(LoginPage, { operacion: 'salir' });
        }
        else {
            this.nav.setRoot(page.component);
        }
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map