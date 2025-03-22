import ExibeTela from './ExibeTela';

import ICEP from '../interfaces/ICEP';
export default class ControlesBusca {

  private cepInput: HTMLInputElement;
  private selectOpcao: HTMLSelectElement;
  private deletaTodos: HTMLButtonElement;
  private listaBuscados: NodeListOf<HTMLAnchorElement>;
  private limpaTela: HTMLButtonElement;
  private Tela: ExibeTela;
  private triggerClimaHora: HTMLDivElement;
  private painelClimaHora: HTMLDivElement;

  constructor(Tela: ExibeTela) {
    this.Tela = Tela;
    this.Tela.onInit();
    this.eventoInputCEP();
    // this.eventoBotaoBuscarCEP();
    this.deletaAnteriores();
    this.eventoLimparTela();
    this.mostrarDetalhesClimaHorario();
  }



  private eventoInputCEP(): void {
    this.cepInput = document.querySelector('#cep');
    this.cepInput.addEventListener('keyup', () => {
      let cep = this.cepInput.value.replace(/\D/g, ''); // Remove tudo que não for número

      if (cep.length > 5) {
        cep = `${cep.slice(0, 5)}-${cep.slice(5, 8)}`; // Insere o hífen na posição correta
      }

      this.cepInput.value = cep;
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
      this.Tela.mostraCEPSelecionado(limpeza);
    });
  }

  private deletaAnteriores() {
    this.deletaTodos = document.querySelector('#deletaTodos');
    this.deletaTodos.addEventListener('click', () => {
      localStorage.clear();
      this.listaBuscados = document.querySelectorAll('a.panel-block');
      this.listaBuscados.forEach((item) => {
        item.remove();
        this.Tela.mensagem({
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
