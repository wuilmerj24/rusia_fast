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
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { GetDatosProvider } from '../../providers/get-datos/get-datos';
import { DetallesReservaPage } from '../../pages/detalles-reserva//detalles-reserva';
var SolicitarDetallePage = /** @class */ (function () {
    function SolicitarDetallePage(navCtrl, navParams, getDatos, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.getDatos = getDatos;
        this.toastCtrl = toastCtrl;
        this.editable = false;
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
            servicio_id: [0, ''],
            salario: '',
            observaciones_solicitud: '',
        };
        this.cargar = true;
        this.evento_cal = this.navParams.get('evento');
        this.initSolitarDetalles();
    }
    SolicitarDetallePage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad SolicitarDetallePage');
    };
    SolicitarDetallePage.prototype.adjustTextarea = function (event) {
        var textarea = event.target;
        textarea.style.overflow = 'hidden';
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
        return;
    };
    SolicitarDetallePage.prototype.editar = function () {
        if (!this.editable) {
            this.editable = true;
        }
        else {
            this.editable = false;
        }
    };
    SolicitarDetallePage.prototype.initSolitarDetalles = function () {
        var self = this;
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
            var tmp_servicio_id = JSON.parse(evento.servicio_id);
            self.evento = evento;
            self.evento.evento_id = tmp_evento_id;
            self.evento.cliente_id = tmp_cliente_id;
            self.evento.representante_id = tmp_representante_id;
            self.evento.guia_id = tmp_guia_id;
            self.evento.chofer_id = tmp_chofer_id;
            self.evento.hotel_id = tmp_hotel_id;
            self.evento.ciudad_id = tmp_ciudad_id;
            self.evento.servicio_id = tmp_servicio_id;
            self.cargar = false;
        }, function (fail) {
            console.log('Fail load evento');
        });
    };
    SolicitarDetallePage.prototype.abrirReserva = function () {
        //console.log('entro');
        // 
        this.navCtrl.push(DetallesReservaPage, { evento: this.evento, permisos: 'is_guia', padre: false });
    };
    SolicitarDetallePage.prototype.guardar = function () {
        var self = this;
        self.cargar = true;
        if (self.editable) {
            var campos = {
                salario: self.evento.salario,
                observaciones_solicitud: self.evento.observaciones_solicitud,
                numero_pax: self.evento.numero_pax,
            };
            //console.log('ID:' + this.evento.id)
            //console.log('usd:' + campos.gasto_usd)
            self.getDatos.write('rusia.eventos', self.evento.id, campos).then(function (res) {
                self.getDatos.cargarCalendario(true, false, false, false).then(function (res) {
                    console.log('Update complete');
                    self.initSolitarDetalles();
                }, function (fail) {
                    console.log('Error loading cgastos');
                });
            }, function (fail) {
                console.log('error saving event');
                self.cargar = false;
            });
        }
    };
    SolicitarDetallePage.prototype.solicitar = function () {
        var self = this;
        self.cargar = true;
        //console.log("tomarlo directamente");
        //console.log(JSON.stringify(self.getDatos.usr));
        var usr = self.getDatos.usr;
        var metodo = '';
        if (usr.tipo_usuario == "is_guia") {
            metodo = 'get_solicitar_servicio_guia';
        }
        else if (usr.tipo_usuario == "is_chofer") {
            metodo = 'get_solicitar_servicio_chofer';
        }
        //console.log(metodo);
        self.getDatos.call('rusia.eventos', metodo, [self.evento.id]).then(function (res) {
            console.log('save event ok');
            self.presentToast();
            self.cargar = false;
        }, function (fail) {
            console.log('error saving event');
            self.cargar = false;
        });
        /*self.getDatos.ejecutarSQL("SELECT * FROM user WHERE usuario IS NOT NULL").then(
            (usrs: {rows})=>{

                var usr = usrs.rows.item(0);

                console.log(JSON.stringify(usr));

                var metodo = '';
                if(usr.tipo_usuario == "is_guia"){
                    metodo = 'get_solicitar_servicio_guia';

                }else if(usr.tipo_usuario == "is_chofer"){
                    metodo = 'get_solicitar_servicio_chofer';
                }
                console.log(metodo);

                self.getDatos.call('rusia.eventos', metodo, [self.evento.id]).then(
                    res=>{
                        console.log('save event ok');
                        self.presentToast();
                        self.cargar = false;
                    },
                    fail=>{
                        console.log('error saving event');
                        self.cargar = false;
                    }
                );

            },
            fails=>{

            }
        );*/
    };
    SolicitarDetallePage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Solicitud enviada!',
            duration: 2000,
            position: 'top'
        });
        /*toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });*/
        toast.present();
    };
    SolicitarDetallePage = __decorate([
        Component({
            selector: 'page-solicitar-detalle',
            templateUrl: 'solicitar-detalle.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, GetDatosProvider, ToastController])
    ], SolicitarDetallePage);
    return SolicitarDetallePage;
}());
export { SolicitarDetallePage };
//# sourceMappingURL=solicitar-detalle.js.map