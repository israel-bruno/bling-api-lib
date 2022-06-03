import IRetornoBling from "./Interfaces/IRetornoBling";
export default class ApiClient {
    static sleep(miliseconds: number): Promise<void>;
    static queryStringfy(data: any): string;
    static filtersStringfy(filters: any): string;
    static get(path: string, getParams: object): Promise<IRetornoBling>;
    static checkError(response: IRetornoBling): Promise<void>;
}
