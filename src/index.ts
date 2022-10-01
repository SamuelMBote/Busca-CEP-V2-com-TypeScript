import './scss/buscaCEP.scss';
/*
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

import {library, dom} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);
dom.i2svg();
*/
import ControlesBusca from './cep/classes/ControlesBusca';
import ExibeTela from './cep/classes/ExibeTela';

const Tela = new ExibeTela();

new ControlesBusca(Tela);
