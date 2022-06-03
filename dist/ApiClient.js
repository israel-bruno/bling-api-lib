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
const axios_1 = __importDefault(require("axios"));
const base_url = "https://bling.com.br/Api/v2";
class ApiClient /* implements IApiClient */ {
    //a api aceita 3 requisicoes por segundo, essa funcao pode ser usada para controlar isso
    static sleep(miliseconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const limit = Date.now() + miliseconds;
            while (Date.now() < limit) {
                //wait
            }
        });
    }
    //recebe um objeto e retorna uma querystring no formato '?param1=1&param2=2...'
    static queryStringfy(data) {
        let str = [];
        for (let atr in data) {
            if (data.hasOwnProperty(atr)) {
                str.push(encodeURIComponent(atr) + "=" + encodeURIComponent(data[atr]));
            }
        }
        return "?" + str.join("&");
    }
    //converte filters para o modelo usado pela api -> "filters=dataEmissao[dd/mm/yyyy TO dd/mm/yyyy];dataAlteracao[...""
    static filtersStringfy(filters) {
        let str = [];
        for (let atr in filters) {
            if (filters.hasOwnProperty(atr)) {
                str.push(atr + filters[atr]);
            }
        }
        return str.join(";");
    }
    //realiza requisicao get
    static get(path, getParams) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = ApiClient.queryStringfy(getParams);
            const full_url = base_url + path + queryString;
            try {
                var response = yield axios_1.default.get(full_url);
                yield ApiClient.checkError(response.data);
                return response.data;
            }
            catch (error) {
                yield ApiClient.checkError(error.response.data);
                return error.response.data;
            }
        });
    }
    static checkError(response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (response.retorno.erros) {
                if (!response.retorno.erros.hasOwnProperty("erro")) {
                    const erros = response.retorno.erros;
                    throw new Error(erros[0].erro.msg);
                }
                const erro = response.retorno.erros;
                throw new Error(erro.erro.msg);
            }
        });
    }
}
exports.default = ApiClient;
