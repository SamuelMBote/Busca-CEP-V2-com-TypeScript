import IPrevisao from "./IPrevisao";


export default interface IClimaTempo {
  cidade_uf: string;
  cidade: string;
  condicao_codigo: string;
  condicao_slug: string;
  data: string;
  descricao: string;
  hora: string;
  nascerSol: string;
  previsao: IPrevisao[];
  porSol: string;
  temperatura: number;
  umidade: number;
  velocidadeVento: string;
}
