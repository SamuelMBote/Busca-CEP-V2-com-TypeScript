import ICEP from '../interfaces/ICEP';
import ExibeTela from './ExibeTela';
import consultaAPI from '../functions/consultaAPI';

const tela = new ExibeTela();

export default class ControlesBusca {
  public opcoesBusca: string[];
  private botaoCEP: HTMLButtonElement = document.querySelector('#buscar');
  private cepInput: HTMLInputElement = document.querySelector('#cep');
  private selectOpcao: HTMLSelectElement =
    document.querySelector('#opcoesBusca');
  private cepBuscado: ICEP[];
  private deletaTodos: HTMLButtonElement =
    document.querySelector('#deletaTodos');
  private listaBuscados: NodeListOf<HTMLAnchorElement>;
  constructor() {
    this.opcoesBusca = ['json', 'jsonp', 'xml'];
    this.preencheSelectOpcoes();
    this.eventoBotaoBuscarCEP();
    this.eventoInputCEP();
    this.deletaAnteriores();
  }

  private preencheSelectOpcoes() {
    this.opcoesBusca.forEach((opcao) => {
      let option: HTMLOptGroupElement = document.createElement('option');
      option.setAttribute('value', opcao.toString().toLowerCase());
      option.innerText = opcao.toString().toUpperCase();
      this.selectOpcao.appendChild(option);
    });
    this.selectOpcao[0].setAttribute('selected', '');
  }

  private eventoInputCEP(): void {
    this.cepInput.addEventListener('keyup', () => {
      this.cepInput.value = this.cepInput.value.replace(/([^0-9])/gi, '');
      const arrayCEP = Array.from(this.cepInput.value);
      arrayCEP.length >= 6 ? arrayCEP.splice(5, 0, '-') : arrayCEP;
      this.cepInput.value = String(arrayCEP.join(''));
    });
  }

  private eventoBotaoBuscarCEP(): void {
    this.botaoCEP.addEventListener('click', () => {
      const cep = this.cepInput.value;
      const opcao = this.selectOpcao.value;

      if (cep && cep.replace(/([^0-9])/gi, '').length == 8) {
        consultaAPI(cep.replace(/([^0-9])/gi, ''), opcao);
      } else {
        this.mensagemErro('Insira um CEP válido');
      }
    });
  }

  private mensagemErro(mensagem: string) {
    window.alert(mensagem);
    navigator.vibrate(300);
  }

  private deletaAnteriores() {
    this.deletaTodos.addEventListener('click', () => {
      localStorage.clear();
      this.listaBuscados = document.querySelectorAll('a.panel-block');
      this.listaBuscados.forEach((item) => {
        item.remove();
      });
      this.mensagemErro('Todos os CEPs buscados foram deletados');
    });
  }
}
