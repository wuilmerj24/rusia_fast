var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
var SolicitarAdminPage = /** @class */ (function () {
    function SolicitarAdminPage(navCtrl, navParams, getDatos) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.solicitudes = [];
        this.cargar = false;
        this.initSolicitar();
    }
    SolicitarAdminPage.prototype.initSolicitar = function () {
        var self = this;
        self.solicitudes = [];
        self.cargar = true;
        this.getDatos.ejecutarSQL('SELECT * FROM solicitud ORDER BY id DESC').then(function (solicitudes) {
            for (var i = 0; i < solicitudes.rows.length; i++) {
                var solicitud = solicitudes.rows.item(i);
                //console.log(JSON.stringify(solicitud))
                //var tmp_evento_id = JSON.parse(evento.evento_id);
                //var tmp_cliente_id = JSON.parse(evento.cliente_id);
                //var tmp_representante_id = JSON.parse(evento.representante_id);
                var tmp_servicio_id = JSON.parse(solicitud.servicio_id);
                var tmp_usuario_id = JSON.parse(solicitud.usuario_id);
                var tmp_name = JSON.parse(solicitud.name);
                var tmp_ciudad_id = JSON.parse(solicitud.ciudad_id);
                solicitud = solicitud;
                //evento.evento_id = tmp_evento_id;
                //evento.cliente_id = tmp_cliente_id;
                //evento.representante_id = tmp_representante_id;
                solicitud.servicio_id = tmp_servicio_id;
                solicitud.usuario_id = tmp_usuario_id;
                solicitud.name = tmp_name;
                solicitud.ciudad_id = tmp_ciudad_id;
                self.solicitudes.push(solicitud);
            }
            self.cargar = false;
        }, function () {
            console.log('Error Reservas');
        });
    };
    SolicitarAdminPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SolicitarAdminPage');
    };
    SolicitarAdminPage.prototype.crearSolicitud = function (solicitud) {
        return __awaiter(this, void 0, void 0, function () {
            var self, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.cargar = true;
                        self = this;
                        if (!(solicitud.id != null)) return [3 /*break*/, 5];
                        console.log('solicitud ' + solicitud.id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, self.getDatos.call('rusia.solicitud.eventos', 'get_aceptar', [solicitud.id])];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, self.getDatos.cargarSolicitudes(true)];
                    case 3:
                        _a.sent();
                        self.initSolicitar();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.log('error en aceptar');
                        self.cargar = false;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SolicitarAdminPage.prototype.borrarSolicitud = function (solicitud) {
        return __awaiter(this, void 0, void 0, function () {
            var self, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.cargar = true;
                        self = this;
                        if (!(solicitud.id != null)) return [3 /*break*/, 5];
                        console.log('solicitud ' + solicitud.id);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, self.getDatos.call('rusia.solicitud.eventos', 'get_rechazar', [solicitud.id])];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, self.getDatos.cargarSolicitudes(true)];
                    case 3:
                        _a.sent();
                        self.initSolicitar();
                        return [3 /*break*/, 5];
                    case 4:
                        e_2 = _a.sent();
                        console.log('error en rechazar');
                        self.cargar = false;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SolicitarAdminPage = __decorate([
        Component({
            selector: 'page-solicitar-admin',
            templateUrl: 'solicitar-admin.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider])
    ], SolicitarAdminPage);
    return SolicitarAdminPage;
}());
export { SolicitarAdminPage };
//# sourceMappingURL=solicitar-admin.js.map