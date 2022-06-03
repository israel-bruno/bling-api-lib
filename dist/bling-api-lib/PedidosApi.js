"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiClient_1 = __importDefault(require("../ApiClient"));
class PedidosApi {
    //inicializa objeto
    constructor(apikey) {
        this.apikey = apikey;
    }
    // Busca por todos os pedidos na api
    getPedidos({ filtros = {} }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield ApiClient_1.default.get("/pedidos/json", Object.assign({ apikey: this.apikey }, filtros));
            return response.retorno.pedidos;
        });
    }
    // busca por um pedido específico
    getPedido({ numero, filtros = {}, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield ApiClient_1.default.get(`/pedido/${numero}/json/`, Object.assign({ apikey: this.apikey }, filtros));
            return response.retorno.pedidos[0].pedido;
        });
    }
}
exports.default = PedidosApi;
