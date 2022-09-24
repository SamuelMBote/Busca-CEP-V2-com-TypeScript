import ICEP from '../interfaces/ICEP';
const listaCEP: ICEP[] = [
  {
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
  },
  {
    cep: '32370-190',
    logradouro: 'Rua AB',
    complemento: 'lado ímpar',
    bairro: 'Sé',
    localidade: 'São Paulo',
    uf: 'SP',
    ibge: 3550308,
    gia: 1004,
    ddd: 11,
    siafi: 7107,
  },
  {
    cep: '00001-000',
    logradouro: 'Rua dos Bobos Numero Zero',
    complemento: 'lado ímpar',
    bairro: 'Sé',
    localidade: 'São Paulo',
    uf: 'SP',
    ibge: 3550308,
    gia: 1004,
    ddd: 11,
    siafi: 7107,
  },
];
export default class Tela {
  private exibeCEP: HTMLParagraphElement;
  private exibeLogradouro: HTMLInputElement;
  private exibeComplemento: HTMLInputElement;
  private exibeBairro: HTMLInputElement;
  private exibeLocalidade: HTMLInputElement;
  private exibeUF: HTMLInputElement;
  private exibeIBGE: HTMLInputElement;
  private exibeGIA: HTMLInputElement;
  private exibeDDD: HTMLInputElement;
  private exibeSIAFI: HTMLInputElement;
  private listaBuscados: HTMLElement;
  constructor(cep: ICEP) {
    this.adicionaCampos();
    this.mostraCEPSelecionado(cep);
    this.listaCEP(listaCEP);
    this.adicionaEventoLista();
  }

  private adicionaCampos(): void {
    this.exibeCEP = document.querySelector('#exibeCEP');
    this.exibeLogradouro = document.querySelector('#logradouro');
    this.exibeComplemento = document.querySelector('#complemento');
    this.exibeBairro = document.querySelector('#bairro');
    this.exibeLocalidade = document.querySelector('#localidade');
    this.exibeUF = document.querySelector('#uf');
    this.exibeIBGE = document.querySelector('#ibge');
    this.exibeGIA = document.querySelector('#gia');
    this.exibeDDD = document.querySelector('#ddd');
    this.exibeSIAFI = document.querySelector('#siafi');
    this.listaBuscados = document.querySelector('#listaBuscados');
    return;
  }
  private mostraCEPSelecionado(cep: ICEP) {
    this.exibeCEP.innerText = cep.cep;
    this.exibeLogradouro.value = cep.logradouro;
    this.exibeComplemento.value = cep.complemento;
    this.exibeBairro.value = cep.bairro;
    this.exibeLocalidade.value = cep.localidade;
    this.exibeUF.value = cep.uf;
    this.exibeIBGE.value = cep.ibge.toString();
    this.exibeGIA.value = cep.gia.toString();
    this.exibeDDD.value = cep.ddd.toString();
    this.exibeSIAFI.value = cep.siafi.toString();
  }
  private listaCEP(lista: ICEP[]) {
    lista.forEach((cep) => {
      const panelBlock = document.createElement('a');
      panelBlock.classList.add('panel-block');
      panelBlock.innerText = `${cep.cep}`;
      return this.listaBuscados.appendChild(panelBlock);
    });
  }

  adicionaEventoLista(): void {
    const ceps = this.listaBuscados.querySelectorAll('a');
    ceps[0].classList.add('is-active');
  }
}
