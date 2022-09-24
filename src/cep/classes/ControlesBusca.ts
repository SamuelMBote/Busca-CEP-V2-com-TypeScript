import CEP from './CEP';

export default class ControlesBusca {
  public opcoesBusca: string[];
  private botaoCEP: HTMLButtonElement = document.querySelector('#buscar');
  private cepInput: HTMLInputElement = document.querySelector('#cep');
  private selectOpcao: HTMLSelectElement =
    document.querySelector('#opcoesBusca');

  constructor() {
    this.opcoesBusca = ['json', 'jsonp', 'xml'];
    this.preencheSelectOpcoes();
    this.adicionaEventosCEP();
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

  private adicionaEventosCEP(): void {
    this.botaoCEP.addEventListener('click', () => {
      let cep = this.cepInput.value;
      if (cep && cep.replace(/([^0-9])/gi, '').length == 8) {
      } else {
        this.mensagemErro('Insira um CEP válido');
      }
    });

    this.cepInput.addEventListener('keyup', () => {
      this.cepInput.value = this.cepInput.value.replace(/([^0-9])/gi, '');
      const arrayCEP = Array.from(this.cepInput.value);
      arrayCEP.splice(5, 0, '-');
      this.cepInput.value = String(arrayCEP.join(''));
    });
  }

  private mensagemErro(mensagem: string) {
    window.alert(mensagem);
    navigator.vibrate(300);
  }
}
