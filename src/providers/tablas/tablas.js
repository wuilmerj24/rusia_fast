var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
/*
  Generated class for the TablasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var TablasProvider = /** @class */ (function () {
    function TablasProvider() {
        this.tbl_solicitud_odoo = [
            "usuario_id",
            "name",
            "servicio_id",
            "tipo",
            "salario",
            "fecha",
            "observaciones_solicitud",
            "ciudad_id"
        ];
        this.tbl_solicitud = "CREATE TABLE IF NOT EXISTS solicitud(" +
            " id INTEGER PRIMARY KEY," +
            " usuario_id VARCHAR(255)," +
            " name VARCHAR(255)," +
            " servicio_id VARCHAR(255)," +
            " tipo VARCHAR(20)," +
            " salario VARCHAR(10)," +
            " fecha VARCHAR(20), " +
            " observaciones_solicitud TEXT," +
            " ciudad_id VARCHAR(255));";
        this.tbl_gastos = "CREATE TABLE IF NOT EXISTS gastostoursline(" +
            " id INTEGER PRIMARY KEY," +
            " concepto_gasto_id VARCHAR(255)," +
            " tipo_moneda VARCHAR(20)," +
            " Total VARCHAR(20)," +
            " fecha VARCHAR(20)," +
            " ciudad_id VARCHAR(50)," +
            " observaciones TEXT, " +
            " usuario_id VARCHAR(255)," +
            " evento_padre VARCHAR(50)," +
            " eventos_id VARCHAR(5));";
        this.tbl_attachment = "CREATE TABLE IF NOT EXISTS attachment(" +
            " id INTEGER PRIMARY KEY," +
            " file_size VARCHAR(20)," +
            " cliente_id VARCHAR(20)," +
            " is_cliente VARCHAR(10)," +
            " eventos_id VARCHAR(20)," +
            " name VARCHAR(255));";
        this.tbl_attachment_odoo = [
            "id",
            "file_size",
            "name",
            "cliente_id",
            "eventos_id",
            "is_cliente"
        ];
        this.tbl_gastos_odoo = [
            "id",
            "tipo_moneda",
            "fecha",
            "ciudad_id",
            "usuario_id",
            "concepto_gasto_id",
            "observaciones",
            "Total",
            "evento_padre",
            "eventos_id"
        ];
        this.tbl_user = "CREATE TABLE IF NOT EXISTS user(" +
            " id INTEGER PRIMARY KEY," +
            " usuario VARCHAR(255)," +
            " pwd VARCHAR(20)," +
            " bd VARCHAR(20)," +
            " tipo_usuario VARCHAR(20)," +
            " gastos_users_ids  VARCHAR(255)," +
            " company_id VARCHAR(255)," +
            " ciudades VARCHAR(255)," +
            " fax VARCHAR(20)," +
            " is_correo VARCHAR(255)," +
            " name VARCHAR(255)," +
            " eventos_ids VARCHAR(255)," +
            " state VARCHAR(20)," +
            " email VARCHAR(255)," +
            " active VARCHAR(20)," +
            " reps_gastos_ids VARCHAR(255)," +
            " login VARCHAR(255)," +
            " phone VARCHAR(20)," +
            " mobile VARCHAR(20));";
        this.tbl_user_odoo = ["email",
            "is_chofer",
            "is_guia",
            "is_rep",
            "is_client",
            "is_root",
            "is_general",
            "is_traslados",
            "gastos_users_ids",
            "company_id",
            "ciudades",
            "fax",
            "is_correo",
            "name",
            "eventos_ids",
            "state",
            "email",
            "active",
            "reps_gastos_ids",
            "login",
            "phone",
            "mobile"];
        this.tbl_gastos_ciudad_odoo = ["dia", "evento_id", "fecha_pago_reserva", "Total_Beneficios", "tarjeta_usd_pos", "tarjeta_usd", "tarjeta_rub", "Total_Pagado_Web", "tarjeta_eur_pos", "Total_Tarjeta", "Total_Paypal", "Total_Rub", "Total_Representante", "Total_Pago_Clientes", "gasto_usd", "concepto_id", "gasto_paypal", "Total_Usd", "tarjeta_eur", "gasto_rub", "gasto_eur", "Total_Euros", "display_name", "__last_update"];
        this.tbl_gastos_ciudad = "CREATE TABLE IF NOT EXISTS gastosciudad(" +
            " id INTEGER PRIMARY KEY," +
            " fecha_pago_reserva VARCHAR(20)," +
            " Total_Beneficios VARCHAR(20)," +
            " tarjeta_usd_pos VARCHAR(20)," +
            " tarjeta_usd VARCHAR(20)," +
            " tarjeta_rub VARCHAR(20)," +
            " Total_Pagado_Web VARCHAR(20)," +
            " tarjeta_eur_pos VARCHAR(20)," +
            " Total_Tarjeta VARCHAR(20)," +
            " Total_Paypal VARCHAR(20)," +
            " Total_Rub VARCHAR(20)," +
            " Total_Representante VARCHAR(20)," +
            " Total_Pago_Clientes VARCHAR(20)," +
            " gasto_usd VARCHAR(20)," +
            " concepto_id VARCHAR(255)," +
            " gasto_paypal VARCHAR(20)," +
            " Total_Usd VARCHAR(20)," +
            " tarjeta_eur VARCHAR(20)," +
            " gasto_rub VARCHAR(20)," +
            " gasto_eur VARCHAR(20)," +
            " Total_Euros VARCHAR(20)," +
            " dia VARCHAR(20)," +
            " evento_id VARCHAR(255)," +
            " display_name VARCHAR(255));";
        this.tbl_eventos = "CREATE TABLE IF NOT EXISTS eventos(" +
            " id INTEGER PRIMARY KEY," +
            " cliente_id_tmp VARCHAR(255)," +
            " cliente_id VARCHAR(20)," +
            " representante_id VARCHAR(255)," +
            " Fecha_Inicio VARCHAR(20)," +
            " Fecha_Fin VARCHAR(20)," +
            " hora_inicio VARCHAR(10)," +
            " hora_final VARCHAR(10)," +
            " hora_chofer VARCHAR(10)," +
            " name VARCHAR(255)," +
            " is_padre VARCHAR(5)," +
            " is_traslado VARCHAR(5)," +
            " is_guia VARCHAR(5)," +
            " fecha_padre VARCHAR(20)," +
            " guia_id VARCHAR(255)," +
            " chofer_id VARCHAR(255)," +
            " chofer_id_tmp VARCHAR(20)," +
            " gasto_rub VARCHAR(10)," +
            " gasto_eur VARCHAR(10)," +
            " gasto_usd VARCHAR(10)," +
            " gasto_paypal VARCHAR(10)," +
            " Comentarios_Chofer TEXT," +
            " Comentarios_Internos TEXT," +
            " Comentarios_Cliente TEXT," +
            " Comentarios_Guia TEXT," +
            " Transporte VARCHAR(255)," +
            " hotel_id VARCHAR(255)," +
            " ciudad_id VARCHAR(255)," +
            " Total_Representante VARCHAR(25)," +
            " message TEXT," +
            " numero_pax VARCHAR(5)," +
            " evento_id VARCHAR(100)," +
            " Servicio_Gastos VARCHAR(10)," +
            " tarjeta_eur VARCHAR(10)," +
            " tarjeta_rub VARCHAR(10)," +
            " tarjeta_usd VARCHAR(10)," +
            " guia_id_tmp VARCHAR(5)," +
            " gastos_ids VARCHAR(255)," +
            " servicio_id VARCHAR(255)," +
            " observaciones_solicitud TEXT," +
            " salario VARCHAR(10)," +
            " gastostoursline_ids VARCHAR(255));";
        this.tbl_eventos_odoo = ["Comentarios_Chofer",
            "Total_Beneficios",
            "tarjeta_usd_pos",
            "servicio_id",
            "salario",
            "observaciones_solicitud",
            "Transporte",
            "is_traslado",
            "is_guia",
            "hotel_id",
            "ciudad_id",
            "Servicio_Gastos",
            "message",
            "numero_pax",
            "Total_Rub",
            "tarjeta_usd",
            "tarjeta_rub",
            "Total_Pagado_Web",
            "gastostoursline_ids",
            "evento_ids",
            "evento_id",
            "tarjeta_eur_pos",
            "Comentarios_Internos",
            "is_padre",
            "Total_Tarjeta",
            "Total_Pago_Clientes",
            "Total_Paypal",
            "Total_Representante",
            "representante_id",
            "Comentarios_Cliente",
            "gastos_ids",
            "Comentarios_Guia",
            "gasto_usd",
            "documentos_ids",
            "gastos_reps_ids",
            "Datos_Cliente_id",
            "Total_Euros",
            "name",
            "Total_Usd",
            "tarjeta_eur",
            "gasto_rub",
            "gasto_eur",
            "gasto_paypal",
            "display_name",
            "__last_update",
            "fecha_padre",
            "guia_id",
            "chofer_id",
            "Fecha_Inicio",
            "Fecha_Fin",
            "hora_inicio",
            "hora_final",
            "is_adjudicado",
            "hora_chofer"];
        /*constructor() {
            console.log('Hello TablasProvider Provider');
        }*/
        this.tbl_gastostours = "CREATE TABLE IF NOT EXISTS gastostours(" +
            " id INTEGER PRIMARY KEY," +
            " name VARCHAR(255)," +
            " ciudades VARCHAR(255));";
        /*private tbl_gastostours = "CREATE TABLE IF NOT EXISTS gastostours("+
        " id INTEGER PRIMARY KEY,"+
        " name VARCHAR(255),"
        " ciudades VARCHAR(255));";*/
        this.tbl_gastostours_odoo = ["id", "name", "ciudades"];
    }
    Object.defineProperty(TablasProvider.prototype, "Tbl_gastostours_odoo", {
        get: function () {
            return this.tbl_gastostours_odoo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TablasProvider.prototype, "Tbl_gastostours", {
        get: function () {
            return this.tbl_gastostours;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TablasProvider.prototype, "Tbl_user_odoo", {
        get: function () {
            return this.tbl_user_odoo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TablasProvider.prototype, "Tbl_gastos_odoo", {
        get: function () {
            return this.tbl_gastos_odoo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TablasProvider.prototype, "Tbl_eventos_odoo", {
        get: function () {
            return this.tbl_eventos_odoo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TablasProvider.prototype, "Tbl_gastos", {
        get: function () {
            return this.tbl_gastos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TablasProvider.prototype, "Tbl_gastos_ciudad_odoo", {
        get: function () {
            return this.tbl_gastos_ciudad_odoo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TablasProvider.prototype, "Tbl_gastos_ciudad", {
        get: function () {
            return this.tbl_gastos_ciudad;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TablasProvider.prototype, "Tbl_user", {
        get: function () {
            return this.tbl_user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TablasProvider.prototype, "Tbl_eventos", {
        get: function () {
            return this.tbl_eventos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TablasProvider.prototype, "Tbl_attachment_odoo", {
        get: function () {
            return this.tbl_attachment_odoo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TablasProvider.prototype, "Tbl_attachment", {
        get: function () {
            return this.tbl_attachment;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TablasProvider.prototype, "Tbl_solicitud", {
        get: function () {
            return this.tbl_solicitud;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TablasProvider.prototype, "Tbl_solicitud_odoo", {
        get: function () {
            return this.tbl_solicitud_odoo;
        },
        enumerable: true,
        configurable: true
    });
    TablasProvider = __decorate([
        Injectable()
    ], TablasProvider);
    return TablasProvider;
}());
export { TablasProvider };
//# sourceMappingURL=tablas.js.map