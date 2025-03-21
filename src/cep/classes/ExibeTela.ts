import { dataHora, periodoDia } from '../functions/dataHora';
import ICEP from '../interfaces/ICEP';
import modalInit from '../functions/modalInit';
import IMensagem from '../interfaces/IMensagem';
import ClimaTempo from './ClimaTempo';
import IClimaTempo from '../interfaces/IClimaTempo';



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
  private clima: IClimaTempo;
  private periodo: HTMLElement;
  private painelClimaTempo: HTMLDivElement;
  constructor() {

    this.dataHora();
    this.adicionaCampos();
    modalInit();

    this.exibeItemHistorico.bind(this);
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

    this.periodo = document.querySelector('html');
   
    return;
  }
  public mostraCEPSelecionado(cep: ICEP) {
    this.exibeCEP.innerText = cep.cep;
    this.exibeLogradouro.value = cep.logradouro;
    this.exibeComplemento.value = cep.complemento;
    this.exibeBairro.value = cep.bairro;
    this.exibeLocalidade.value = cep.localidade;
    this.exibeUF.value = cep.uf;
    this.exibeIBGE.value = cep.ibge;
    this.exibeGIA.value = cep.gia;
    this.exibeDDD.value = cep.ddd;
    this.exibeSIAFI.value = cep.siafi;
    return cep;
  }
  private excluiItemHistorico(Event: MouseEvent, elemento: HTMLAnchorElement) {
    const elementoLista = JSON.parse(
      localStorage.getItem('cepsBuscadosAnterior'),
    );
    const itemSelecionado = elemento.getAttribute('index');
    elementoLista[itemSelecionado] = null;
    elemento.remove();
    localStorage.setItem('cepsBuscadosAnterior', JSON.stringify(elementoLista));
  }
  private exibeItemHistorico(
    Event: MouseEvent,
    elemento: HTMLAnchorElement,
  ): ICEP {
    const idx = elemento.getAttribute('Index');
    const listaCEPs: ICEP[] = JSON.parse(
      localStorage.getItem('cepsBuscadosAnterior'),
    );
    return this.mostraCEPSelecionado(listaCEPs[idx]);
  }
  private listarAnteriores(cep: ICEP, index: number): HTMLElement {
    const panelBlock: HTMLAnchorElement = document.createElement('a');
    panelBlock.setAttribute('Index', index.toString());
    panelBlock.classList.add('panel-block');
    panelBlock.innerHTML = `${cep.cep}: ${cep.logradouro}, ${cep.bairro} - ${cep.localidade}, ${cep.uf}`;
    panelBlock.addEventListener('click', (Event: MouseEvent) => {
      this.exibeItemHistorico(Event, panelBlock);
    });
    panelBlock.addEventListener('dblclick', (Event: MouseEvent) => {
      this.excluiItemHistorico(Event, panelBlock);
    });
    return this.listaBuscados.appendChild(panelBlock);
  }

  private dataHora() {
    const verifica = setInterval(() => {
      this.exibeDataHora.innerText = dataHora();
      this.periodo.dataset.theme = periodoDia();
    }, 1000);
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

  public onClick(novoCEP: ICEP, index: number) {
    this.mostraCEPSelecionado(novoCEP);
    this.listarAnteriores(novoCEP, index);
  }

  public onInit() {
    this.adicionaCampos();
    this.exibeDataHora.innerText = dataHora();
    this.periodo.dataset.theme = periodoDia();
    let listaCEPSBuscados: ICEP[] = JSON.parse(
      localStorage.getItem('cepsBuscadosAnterior'),
    );
    listaCEPSBuscados ? listaCEPSBuscados : (listaCEPSBuscados = []);
    if (listaCEPSBuscados && listaCEPSBuscados.length >= 1) {
      listaCEPSBuscados.forEach((cep, index) => {
        if (cep) return this.listarAnteriores(cep, index);
      });
      const ultimoItemBuscado = listaCEPSBuscados.length - 1;
      this.mostraCEPSelecionado(listaCEPSBuscados[ultimoItemBuscado]);
    }
  }
}
