"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlingApi = void 0;
const PedidosApi_1 = require("./modules/Pedidos/PedidosApi");
class BlingApi {
    constructor(apikey) {
        this.pedidosApi = new PedidosApi_1.PedidosApi(apikey);
    }
}
exports.BlingApi = BlingApi;
