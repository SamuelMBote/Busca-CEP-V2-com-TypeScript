import ICEP from '../interfaces/ICEP';

export default class ExibeTela {
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

  constructor() {
    this.adicionaCampos();
    this.exibeClimaTempo();
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
    return cep;
  }
  public limparCEPSelecionado() {
    this.exibeCEP.innerText = '';
    this.exibeLogradouro.value = '';
    this.exibeComplemento.value = '';
    this.exibeBairro.value = '';
    this.exibeLocalidade.value = '';
    this.exibeUF.value = '';
    this.exibeIBGE.value = '';
    this.exibeGIA.value = '';
    this.exibeDDD.value = '';
    this.exibeSIAFI.value = '';
    return;
  }
  private listarAnteriores(cep: ICEP) {
    const panelBlock = document.createElement('a');
    panelBlock.classList.add('panel-block');
    panelBlock.innerText = cep.cep;
    panelBlock.addEventListener('dblclick', (Event) => {
      const item = Event;
      console.log(item);
    });
    this.listaBuscados.appendChild(panelBlock);
    return;
  }

  private exibeClimaTempo() {
    function teste() {
      console.log('teste');
    }
    const verificacao = setInterval(() => {
      teste();
    }, 1000);
  }

  onClick(novoCEP: ICEP) {
    this.mostraCEPSelecionado(novoCEP);
    this.listarAnteriores(novoCEP);
  }
  onInit() {
    let listaCEPSBuscados: ICEP[] = JSON.parse(
      localStorage.getItem('cepsBuscadosAnterior'),
    );
    listaCEPSBuscados ? listaCEPSBuscados : (listaCEPSBuscados = []);
    if (listaCEPSBuscados && listaCEPSBuscados.length >= 1) {
      listaCEPSBuscados.reverse().forEach((cep) => {
        return this.listarAnteriores(cep);
      });
      const ultimoItemBuscado = listaCEPSBuscados.length - 1;
      this.mostraCEPSelecionado(listaCEPSBuscados[ultimoItemBuscado]);
    }
  }
}
