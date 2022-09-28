import ICEP from '../interfaces/ICEP';
import ExibeTela from './ExibeTela';
import consultaAPI from '../functions/consultaAPI';

const tela = new ExibeTela();

export default class ControlesBusca {
  public opcoesBusca: string[];
  private botaoCEP: HTMLButtonElement;
  private cepInput: HTMLInputElement;
  private selectOpcao: HTMLSelectElement;
  private deletaTodos: HTMLButtonElement;
  private listaBuscados: NodeListOf<HTMLAnchorElement>;
  private limpaTela: HTMLButtonElement;
  
  constructor() {
    this.opcoesBusca = ['json', 'jsonp', 'xml'];
    this.preencheSelectOpcoes();
    this.eventoBotaoBuscarCEP();
    this.eventoInputCEP();
    this.deletaAnteriores();
    this.eventoLimparTela();
  }

  private preencheSelectOpcoes() {
    this.selectOpcao = document.querySelector('#opcoesBusca');
    this.opcoesBusca.forEach((opcao) => {
      let option: HTMLOptGroupElement = document.createElement('option');
      option.setAttribute('value', opcao.toString().toLowerCase());
      option.innerText = opcao.toString().toUpperCase();
      this.selectOpcao.appendChild(option);
    });
    this.selectOpcao[0].setAttribute('selected', '');
  }

  private eventoInputCEP(): void {
    this.cepInput = document.querySelector('#cep');
    this.cepInput.addEventListener('keyup', () => {
      this.cepInput.value = this.cepInput.value.replace(/([^0-9])/gi, '');
      const arrayCEP = Array.from(this.cepInput.value);
      arrayCEP.length >= 6 ? arrayCEP.splice(5, 0, '-') : arrayCEP;
      this.cepInput.value = String(arrayCEP.join(''));
    });
  }

  private eventoBotaoBuscarCEP(): void {
    this.botaoCEP = document.querySelector('#buscar');
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

  private eventoLimparTela() {
    this.limpaTela = document.querySelector('#limpaTela');
    this.limpaTela.addEventListener('click', () => {
      const camposInformacao: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('input');
      camposInformacao.forEach((item) => {
        item.value = '';
      });
    });
  }

  private mensagemErro(mensagem: string) {
    window.alert(mensagem);
    navigator.vibrate(300);
  }

  private deletaAnteriores() {
    this.deletaTodos = document.querySelector('#deletaTodos');
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
