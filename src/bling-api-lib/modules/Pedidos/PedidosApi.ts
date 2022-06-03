import ApiClient from "../../../ApiClient";

import {
  IPedidosApi,
  IGetPedidoParams,
  IGetPedidosParams,
} from "./IPedidosApi";

import IPedido from "../../../Interfaces/IPedido";

export default class PedidosApi implements IPedidosApi {
  private apikey: string;

  //inicializa objeto
  constructor(apikey: string) {
    this.apikey = apikey;
  }

  // Busca por todos os pedidos na api
  async getPedidos({ filters = {} }: IGetPedidosParams): Promise<IPedido[]> {
    let response = await ApiClient.get("/pedidos/json", {
      apikey: this.apikey,
      filters: ApiClient.filtersStringfy(filters),
    });

    //o retorno maximo de pedidos e 100 por requisicao, esse trecho itera sobre todas as paginas
    if (response.retorno.pedidos.length === 100) {
      var pedidos: IPedido[] = [];

      let page = 2;

      while (!response.retorno.hasOwnProperty("erros")) {
        pedidos.push(
          ...response.retorno.pedidos.map((pedido: any) => pedido.pedido)
        );
        //aguarda 334ms para nao ser bloqueado
        await ApiClient.sleep(334);
        try {
          response = await ApiClient.get(`/pedidos/page=${page}/json`, {
            apikey: this.apikey,
            filters: ApiClient.filtersStringfy(filters),
          });
        } catch (e: any) {
          response = { retorno: { erros: [] } };
        }
        page++;
      }

      return pedidos;
    }
    //mapeia pedidos de pedidos: [{pedido:{}}, {pedido:{}}...] para pedidos:[{}, {}, ....]
    return response.retorno.pedidos.map((pedido: any) => pedido.pedido);
  }

  // busca por um pedido específico
  async getPedido({
    numero,
    filters = {},
  }: IGetPedidoParams): Promise<IPedido> {
    const response = await ApiClient.get(`/pedido/${numero}/json/`, {
      apikey: this.apikey,
      filters: ApiClient.filtersStringfy(filters),
    });

    return response.retorno.pedidos[0].pedido;
  }
}
