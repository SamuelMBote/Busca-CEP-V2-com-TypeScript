import CEP from "./CEP";
import ClimaTempo from "./ClimaTempo";
import ControlesBusca from "./ControlesBusca";
import ExibeTela from "./ExibeTela";

export default class Main {
  constructor() {
    new ClimaTempo()

    const Tela = new ExibeTela();

    new ControlesBusca(Tela);
  }
}
