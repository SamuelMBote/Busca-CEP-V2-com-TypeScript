import './scss/buscaCEP.scss';
import ControlesBusca from './cep/classes/ControlesBusca';
import ExibeTela from './cep/classes/ExibeTela';

const Tela = new ExibeTela();

new ControlesBusca(Tela);
