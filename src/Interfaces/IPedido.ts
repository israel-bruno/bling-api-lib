import IClientePedido from "../bling-api-lib/modules/Pedidos/IClientePedido";

//modelo de pedido retornado pelo Bling
export default interface IPedido {
  desconto: string;
  observacoes: string;
  observacaointerna: string;
  data: string;
  numero: string;
  numeroOrdemCompra: string;
  vendedor: string;
  valorfrete: string;
  outrasdespesas: string;
  totalprodutos: string;
  totalvenda: string;
  situacao: string;
  dataSaida: string;
  loja: string;
  numeroPedidoLoja: string;
  tipoIntegracao: string;
  cliente: IClientePedido;
  transporte: Object;
  itens: Object[];
  parcelas: Object[];
}
