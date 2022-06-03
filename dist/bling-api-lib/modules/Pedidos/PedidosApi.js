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
const ApiClient_1 = __importDefault(require("../../../ApiClient"));
class PedidosApi {
    //inicializa objeto
    constructor(apikey) {
        this.apikey = apikey;
    }
    // Busca por todos os pedidos na api
    getPedidos({ filters = {} }) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield ApiClient_1.default.get("/pedidos/json", {
                apikey: this.apikey,
                filters: ApiClient_1.default.filtersStringfy(filters),
            });
            //o retorno maximo de pedidos e 100 por requisicao, esse trecho itera sobre todas as paginas
            if (response.retorno.pedidos.length === 100) {
                var pedidos = [];
                let page = 2;
                while (!response.retorno.hasOwnProperty("erros")) {
                    pedidos.push(...response.retorno.pedidos.map((pedido) => pedido.pedido));
                    //aguarda 334ms para nao ser bloqueado
                    yield ApiClient_1.default.sleep(334);
                    try {
                        response = yield ApiClient_1.default.get(`/pedidos/page=${page}/json`, {
                            apikey: this.apikey,
                            filters: ApiClient_1.default.filtersStringfy(filters),
                        });
                    }
                    catch (e) {
                        response = { retorno: { erros: [] } };
                    }
                    page++;
                }
                return pedidos;
            }
            //mapeia pedidos de pedidos: [{pedido:{}}, {pedido:{}}...] para pedidos:[{}, {}, ....]
            return response.retorno.pedidos.map((pedido) => pedido.pedido);
        });
    }
    // busca por um pedido específico
    getPedido({ numero, filters = {}, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield ApiClient_1.default.get(`/pedido/${numero}/json/`, {
                apikey: this.apikey,
                filters: ApiClient_1.default.filtersStringfy(filters),
            });
            return response.retorno.pedidos[0].pedido;
        });
    }
}
exports.default = PedidosApi;
