import './scss/buscaCEP.scss';
import ControlesBusca from './cep/classes/ControlesBusca';
import consultaAPI from './cep/functions/consultaAPI';
import ExibeTela from './cep/classes/ExibeTela';
new ControlesBusca();
const tela = new ExibeTela();
tela.onInit();
