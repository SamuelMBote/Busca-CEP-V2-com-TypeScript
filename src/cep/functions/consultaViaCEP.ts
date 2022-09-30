import CEP from '../classes/CEP';
import ExibeTela from '../classes/ExibeTela';
import ICEP from '../interfaces/ICEP';

export default function consultaAPI(
  cep: string,
  opcao: string,
  Tela: ExibeTela,
) {
  fetch(`https://viacep.com.br/ws/${cep}/${opcao}/`)
    .then((resultado) => {
      let retornoBusca: Promise<any>;
      let CEP: ICEP;
      if (resultado.ok && opcao == 'json') {
        retornoBusca = resultado.json();
      } else if (resultado.ok && opcao == 'xml') {
        retornoBusca = resultado.text();
      } else if (resultado.ok && opcao == 'jsonp') {
        console.log('Dados ainda nao podem ser tratados');
      }
      return retornoBusca;
    })
    .then((retornoBusca) => {
      let CEPRetornado: ICEP;
      let xml: XMLDocument;
      if (opcao == 'json') {
        CEPRetornado = retornoBusca;
        retornoBusca.erro ? (CEPRetornado.erro = true) : CEPRetornado;
      } else if (opcao == 'xml') {
        xml = new window.DOMParser().parseFromString(retornoBusca, 'text/xml');
        CEPRetornado = {
          cep: xml.documentElement.querySelector('cep').innerHTML,
          logradouro: xml.documentElement.querySelector('logradouro').innerHTML,
          complemento:
            xml.documentElement.querySelector('complemento').innerHTML,
          bairro: xml.documentElement.querySelector('bairro').innerHTML,
          localidade: xml.documentElement.querySelector('localidade').innerHTML,
          uf: xml.documentElement.querySelector('uf').innerHTML,
          ibge: Number(xml.documentElement.querySelector('ibge').innerHTML),
          gia: Number(xml.documentElement.querySelector('gia').innerHTML),
          ddd: Number(xml.documentElement.querySelector('ddd').innerHTML),
          siafi: Number(xml.documentElement.querySelector('siafi').innerHTML),
          erro: xml.documentElement.querySelector('erro') ? true : false,
        };
      }
      return CEPRetornado;
    })
    .then((CEPRetornado: ICEP) => {
      let listaCEPSBuscados: ICEP[] = JSON.parse(
        localStorage.getItem('cepsBuscadosAnterior'),
      );
      listaCEPSBuscados ? listaCEPSBuscados : (listaCEPSBuscados = []);
      const novoCEP = new CEP(CEPRetornado);
      Tela.onClick(novoCEP);

      listaCEPSBuscados.push(novoCEP);

      localStorage.setItem(
        'cepsBuscadosAnterior',
        JSON.stringify(listaCEPSBuscados),
      );
      return;
    })
    .catch((e) => {
      throw new Error('Erro na Busca');
    })
    .finally(() => {});
}
