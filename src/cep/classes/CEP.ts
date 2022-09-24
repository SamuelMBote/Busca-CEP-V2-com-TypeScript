import ICEP from '../interfaces/ICEP';
import consultaAPI from '../functions/consultaAPI';

export default class CEP implements ICEP {
  public consultaRetornada: Promise<string | object>;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: number;
  gia: number;
  ddd: number;
  siafi: number;
  erro?: boolean;
  constructor(informacoes: ICEP) {
    this.cep = informacoes.erro ? 'NÃO EXISTE' : informacoes.cep;
    this.logradouro = informacoes.erro ? 'NÃO EXISTE' : informacoes.logradouro;
    this.complemento = informacoes.erro
      ? 'NÃO EXISTE'
      : informacoes.complemento;
    this.bairro = informacoes.erro ? 'NÃO EXISTE' : informacoes.bairro;
    this.localidade = informacoes.erro ? 'NÃO EXISTE' : informacoes.localidade;
    this.uf = informacoes.erro ? 'NÃO EXISTE' : informacoes.uf;
    this.ibge = informacoes.erro ? 0 : informacoes.ibge;
    this.gia = informacoes.erro ? 0 : informacoes.gia;
    this.ddd = informacoes.erro ? 0 : informacoes.ddd;
    this.siafi = informacoes.erro ? 0 : informacoes.siafi;
  }
}
