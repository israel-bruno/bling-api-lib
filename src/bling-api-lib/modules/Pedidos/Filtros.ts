import IPedido from "../../../Interfaces/IPedido";

interface IFiltrosBling {
  dataEmissao?: string;
  dataAlteracao?: string;
  dataPrevista?: string;
  idSituacao?: string;
  idContato?: string;
}

interface IFiltrosCustom extends IFiltrosBling {
  withPhoneNumber?: Boolean;
}

class Filtros {
  static filter(pedidos: IPedido[], filters: IFiltrosCustom): IPedido[] {
    let filtered: IPedido[] = pedidos;

    if (filters.hasOwnProperty("withPhoneNumber")) {
      filtered = this.filterWithPhoneNumber(
        filtered,
        filters.withPhoneNumber as boolean
      );
    }

    return filtered;
  }

  static filterWithPhoneNumber(
    pedidos: IPedido[],
    withPhoneNumber: boolean
  ): IPedido[] {
    if (!withPhoneNumber) return pedidos;

    const filtered = pedidos.filter((pedido) => {
      return pedido.cliente.fone || pedido.cliente.celular;
    });

    return pedidos;
  }
}

export { IFiltrosBling, IFiltrosCustom, Filtros };
