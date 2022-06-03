import IBlingErros from "./IBlingErros";
export default interface IRetornoBling {
    retorno: {
        erros?: IBlingErros | IBlingErros[];
        pedidos?: any;
    };
}
