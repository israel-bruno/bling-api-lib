import IBlingErros from "../Interfaces/IBlingErros";
import IRetornoBling from "../Interfaces/IRetornoBling";

export default class RetornoBling implements IRetornoBling {
  retorno: { erros?: IBlingErros | IBlingErros[]; pedidos?: any };

  constructor() {
    this.retorno = { erros: [] };
  }
}
