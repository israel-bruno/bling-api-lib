import { IPedidosApi } from "./modules/Pedidos/IPedidosApi";
import { PedidosApi } from "./modules/Pedidos/PedidosApi";

export class BlingApi {
  pedidosApi: IPedidosApi;

  constructor(apikey: string) {
    this.pedidosApi = new PedidosApi(apikey);
  }
}
