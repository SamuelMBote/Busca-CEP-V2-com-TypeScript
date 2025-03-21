import './scss/buscaCEP.scss';


import ControlesBusca from './cep/classes/ControlesBusca';
import ExibeTela from './cep/classes/ExibeTela';
import ClimaTempo from './cep/classes/ClimaTempo';


const Clima = await ClimaTempo.build()

const tema = document.querySelector('[data-theme]')

