import axios, { AxiosResponse } from "axios";
import IBlingErros from "./Interfaces/IBlingErros";

import IRetornoBling from "./Interfaces/IRetornoBling";

const base_url = "https://bling.com.br/Api/v2";

interface IApiClient {
  base_url: string;
  queryStringfy(data: any): string;
  get(path: string, getParams: any): Promise<AxiosResponse>;
  post(path: string, postParams: any): Promise<AxiosResponse>;
  put(path: string, putParams: any): Promise<AxiosResponse>;
  delete(path: string, deleteParams: any): Promise<AxiosResponse>;
}

export default class ApiClient /* implements IApiClient */ {
  //a api aceita 3 requisicoes por segundo, essa funcao pode ser usada para controlar isso
  static async sleep(miliseconds: number): Promise<void> {
    const limit = Date.now() + miliseconds;
    while (Date.now() < limit) {
      //wait
    }
  }

  //recebe um objeto e retorna uma querystring no formato '?param1=1&param2=2...'
  static queryStringfy(data: any): string {
    let str = [];
    for (let atr in data) {
      if (data.hasOwnProperty(atr)) {
        str.push(encodeURIComponent(atr) + "=" + encodeURIComponent(data[atr]));
      }
    }
    return "?" + str.join("&");
  }

  //converte filters para o modelo usado pela api -> "filters=dataEmissao[dd/mm/yyyy TO dd/mm/yyyy];dataAlteracao[...""
  static filtersStringfy(filters: any): string {
    let str = [];
    for (let atr in filters) {
      if (filters.hasOwnProperty(atr)) {
        str.push(atr + filters[atr]);
      }
    }
    return str.join(";");
  }

  //realiza requisicao get
  static async get(path: string, getParams: object): Promise<IRetornoBling> {
    const queryString = ApiClient.queryStringfy(getParams);

    const full_url = base_url + path + queryString;

    try {
      var response = await axios.get<IRetornoBling>(full_url);
      await ApiClient.checkError(response.data);
      return response.data;
    } catch (error: any) {
      await ApiClient.checkError(error.response.data as IRetornoBling);
      return error.response.data as IRetornoBling;
    }
  }

  static async checkError(response: IRetornoBling): Promise<void> {
    if (response.retorno.erros) {
      if (!response.retorno.erros.hasOwnProperty("erro")) {
        const erros = response.retorno.erros as IBlingErros[];
        throw new Error(erros[0].erro.msg);
      }
      const erro = response.retorno.erros as IBlingErros;
      throw new Error(erro.erro.msg);
    }
  }
}
