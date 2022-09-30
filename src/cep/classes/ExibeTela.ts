import dataHora from '../functions/dataHora';
import ICEP from '../interfaces/ICEP';
import modalInit from '../functions/modalInit';
import IMensagem from '../interfaces/IMensagem';

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
  private exibeDataHora: HTMLSpanElement;
  private exibeClimaTempo: HTMLSpanElement;
  private geolocalizacao: WindowLocalStorage;
  private consultaClima: WindowLocalStorage;

  constructor() {
    this.dataHora();
    this.adicionaCampos();
    modalInit();

    this.exibeClima.bind(this);
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
    this.exibeDataHora = document.querySelector('#dataHora');
    this.exibeClimaTempo = document.querySelector('#climaTempo');
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

  private listarAnteriores(cep: ICEP): HTMLElement {
    const panelBlock = document.createElement('a');
    panelBlock.classList.add('panel-block');
    panelBlock.innerText = cep.cep;
    panelBlock.addEventListener('dblclick', (Event) => {
      const item = Event;
      console.log(item);
    });
    return this.listaBuscados.appendChild(panelBlock);
  }

  private dataHora() {
    const verificacao = setInterval(
      () => (this.exibeDataHora.innerText = dataHora()),
      1000,
    );
  }

  exibeClima() {
    const Clima = JSON.parse(localStorage.getItem('clima'));
    this.exibeClimaTempo.innerText = `${Clima.temperatura}ºC`;
  }

  public mensagem(Mensagem: IMensagem) {
    const tipo: string = Mensagem.tipo;
    let classe: string;
    const modal: HTMLDivElement = document.querySelector('#modalAviso');
    const modalTitle: HTMLParagraphElement =
      modal.querySelector('#tituloMensagem');
    const modalContent: HTMLParagraphElement =
      modal.querySelector('#modalMensagem');
    const modalMessage = modal.querySelector('.message');

    switch (tipo) {
      case 'erro':
        classe = 'is-danger';

        break;
      case 'aviso':
        classe = 'is-warning';
        break;
      case 'sucesso':
        classe = 'is-success';
        break;
      case 'info':
        classe = 'is-info';
        break;
    }
    modal.classList.add('is-active');

    while (modalMessage.classList.length > 0) {
      modalMessage.classList.remove(modalMessage.classList.item(0));
    }
    modalMessage.classList.add('message', classe);

    modalTitle.innerText = Mensagem.titulo;
    modalContent.innerText = Mensagem.conteudo;

    navigator.vibrate(300);
  }

  public onClick(novoCEP: ICEP) {
    this.mostraCEPSelecionado(novoCEP);
    this.listarAnteriores(novoCEP);
  }

  public onInit() {
    this.adicionaCampos();
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
