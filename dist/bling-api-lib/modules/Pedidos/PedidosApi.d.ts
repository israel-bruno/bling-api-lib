import { IPedidosApi, IGetPedidoParams, IGetPedidosParams } from "./IPedidosApi";
import IPedido from "../../../Interfaces/IPedido";
export declare class PedidosApi implements IPedidosApi {
    private apikey;
    constructor(apikey: string);
    getPedidos({ filters }: IGetPedidosParams): Promise<IPedido[]>;
    getPedido({ numero, filters, }: IGetPedidoParams): Promise<IPedido>;
}
