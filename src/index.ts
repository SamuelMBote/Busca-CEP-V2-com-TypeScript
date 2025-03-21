import './scss/buscaCEP.scss';


import ControlesBusca from './cep/classes/ControlesBusca';
import ExibeTela from './cep/classes/ExibeTela';
import ClimaTempo from './cep/classes/ClimaTempo';


const Tela = new ExibeTela();

new ControlesBusca(Tela);

async function exibeClima() {
  const exibeClimaTempo: HTMLSpanElement = document.querySelector('#climaTempo');
  const painelClimaTempo: HTMLDivElement = document.querySelector('#painelClima');

  const clima = await ClimaTempo.build()

  exibeClimaTempo.innerText = `${clima.temperatura}ºC`;
  painelClimaTempo;

  painelClimaTempo.querySelector(
    '#temperatura',
  ).innerHTML = `${clima.temperatura}ºC`;
  painelClimaTempo.querySelector('#cidade_uf').innerHTML = `${clima.cidade_uf}`;
  painelClimaTempo.querySelector('#descricao').innerHTML = `${clima.descricao}`;

  clima.previsao.forEach((dia) => {
    const div = document.createElement('div');
    div.classList.add('column');

    div.innerHTML = `<p class="bd-notification is-info">${dia.diaSemana} ${dia.data}</p>
        <div class="columns is-mobile">
          <div class="column">
          <p class="bd-notification is-info">${dia.descricao}</p>
          <p class="bd-notification is-info">${dia.condicao}</p>
          </div>
          <div class="column">
            <p class="bd-notification is-info">Máx: ${dia.maxima}ºC</p>
            <p class="bd-notification is-info">Mín: ${dia.minima}ºC</p>
          </div>
        </div>`;
    painelClimaTempo.querySelector('#previsao').innerHTML += div.outerHTML;
  });
}
exibeClima()
