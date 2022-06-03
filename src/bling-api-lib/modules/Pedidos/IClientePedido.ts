export default interface IClientePedido {
  id: string;
  nome: string;
  cnpj: string | null;
  ie: string | null;
  rg: string;
  endereco: string | null;
  numero: string | null;
  complemento: string | null;
  cidade: string | null;
  bairro: string | null;
  cep: string | null;
  uf: string | null;
  email: string | null;
  celular: string | null;
  fone: string | null;
}
