import IPedido from "../../../Interfaces/IPedido";
import { IFiltrosBling, IFiltrosCustom } from "./Filtros";

interface IGetPedidosParams {
  filters?: IFiltrosBling;
}

interface IGetPedidoParams {
  numero: string;
  filters?: IFiltrosBling;
}

interface IPedidosApi {
  getPedidos({}: IGetPedidosParams): Promise<IPedido[]>;
  getPedido({}: IGetPedidoParams): Promise<IPedido>;
}

export { IPedidosApi, IGetPedidoParams, IGetPedidosParams };
