import ExibeTela from './ExibeTela';
import consultaAPI from '../functions/consultaViaCEP';
import ICEP from '../interfaces/ICEP';
export default class ControlesBusca {
  public opcoesBusca: string[];
  private botaoCEP: HTMLButtonElement;
  private cepInput: HTMLInputElement;
  private selectOpcao: HTMLSelectElement;
  private deletaTodos: HTMLButtonElement;
  private listaBuscados: NodeListOf<HTMLAnchorElement>;
  private limpaTela: HTMLButtonElement;
  private tela: ExibeTela;
  private triggerClimaHora: HTMLDivElement;
  private painelClimaHora: HTMLDivElement;

  constructor(Tela: ExibeTela) {
    this.tela = Tela;
    this.tela.onInit();
    this.opcoesBusca = ['json', 'jsonp', 'xml'];
    this.preencheSelectOpcoes();
    this.eventoInputCEP();
    this.eventoBotaoBuscarCEP();
    this.deletaAnteriores();
    this.eventoLimparTela();
    this.mostrarDetalhesClimaHorario();
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
        consultaAPI(cep.replace(/([^0-9])/gi, ''), opcao, this.tela);
        this.cepInput.value = '';
        this.cepInput.focus();
      } else {
        this.tela.mensagem({
          conteudo: 'Insira um CEP válido',
          titulo: 'CEP incorreto!',
          tipo: 'erro',
        });
      }
    });
  }

  private eventoLimparTela() {
    this.limpaTela = document.querySelector('#limpaTela');
    this.limpaTela.addEventListener('click', () => {
      const limpeza: ICEP = {
        cep: null,
        logradouro: null,
        complemento: null,
        bairro: null,
        localidade: null,
        uf: null,
        ibge: null,
        gia: null,
        ddd: null,
        siafi: null,
      };
      this.tela.mostraCEPSelecionado(limpeza);
    });
  }

  private deletaAnteriores() {
    this.deletaTodos = document.querySelector('#deletaTodos');
    this.deletaTodos.addEventListener('click', () => {
      localStorage.clear();
      this.listaBuscados = document.querySelectorAll('a.panel-block');
      this.listaBuscados.forEach((item) => {
        item.remove();
        this.tela.mensagem({
          conteudo: 'Todos os dados foram apagados',
          titulo: 'Histórico removido com Sucesso',
          tipo: 'sucesso',
        });
      });
    });
  }

  private mostrarDetalhesClimaHorario() {
    this.triggerClimaHora = document.querySelector('#triggerClimaHora');
    this.painelClimaHora = document.querySelector('#painelClimaHora');
    this.triggerClimaHora.addEventListener('click', () => {
      this.painelClimaHora.classList.toggle('is-active');
    });
  }
}
