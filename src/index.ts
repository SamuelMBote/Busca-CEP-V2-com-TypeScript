import './scss/buscaCEP.scss';
import ControlesBusca from './cep/classes/ControlesBusca';
import ExibeTela from './cep/classes/ExibeTela';
new ControlesBusca();
const tela = new ExibeTela();
tela.onInit();
