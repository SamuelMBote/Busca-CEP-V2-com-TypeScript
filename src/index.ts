
import './scss/buscaCEP.scss';
import ControlesBusca from './cep/classes/ControlesBusca';
import CEP from './cep/classes/CEP';
import ICEP from './cep/interfaces/ICEP';
import Tela from './cep/classes/Tela';

const teste = new ControlesBusca();
let samuel: ICEP = {
  cep: '01001-000',
  logradouro: 'Praça da Sé',
  complemento: 'lado ímpar',
  bairro: 'Sé',
  localidade: 'São Paulo',
  uf: 'SP',
  ibge: 3550308,
  gia: 1004,
  ddd: 11,
  siafi: 7107,
};
const novoCEP = new CEP(samuel);
console.log(novoCEP);

const tela = new Tela(samuel);
