import PedidosApi from "./bling-api-lib/modules/Pedidos/PedidosApi";

const pedidos = new PedidosApi("your api key");

async function main(): Promise<void> {
  const response = await pedidos.getPedidos({
    filters: { dataEmissao: "[02/06/2022 TO 03/06/2022]", idSituacao: "[9]" },
  });
}

main();
