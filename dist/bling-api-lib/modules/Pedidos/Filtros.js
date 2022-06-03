"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filtros = void 0;
class Filtros {
    static filter(pedidos, filters) {
        let filtered = pedidos;
        if (filters.hasOwnProperty("withPhoneNumber")) {
            filtered = this.filterWithPhoneNumber(filtered, filters.withPhoneNumber);
        }
        return filtered;
    }
    static filterWithPhoneNumber(pedidos, withPhoneNumber) {
        if (!withPhoneNumber)
            return pedidos;
        const filtered = pedidos.filter((pedido) => {
            return pedido.cliente.fone || pedido.cliente.celular;
        });
        return pedidos;
    }
}
exports.Filtros = Filtros;
