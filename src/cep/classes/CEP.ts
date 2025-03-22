import ICEP from '../interfaces/ICEP';

export default class CEP implements ICEP {
  private dados;
  private opcao: 'json' | 'xml' | 'jsonp';
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;

  constructor(cep: string, opcao: 'json' | 'xml' | 'jsonp') {
    this.cep = cep; this.opcao = opcao
    this.build()
    // this.cep = informacoes.erro ? 'NÃO EXISTE' : informacoes.cep;
    // this.logradouro = informacoes.erro ? 'NÃO EXISTE' : informacoes.logradouro;
    // this.complemento = informacoes.erro
    //   ? 'NÃO EXISTE'
    //   : informacoes.complemento;
    // this.bairro = informacoes.erro ? 'NÃO EXISTE' : informacoes.bairro;
    // this.localidade = informacoes.erro ? 'NÃO EXISTE' : informacoes.localidade;
    // this.uf = informacoes.erro ? 'NÃO EXISTE' : informacoes.uf;
    // this.ibge = informacoes.erro ? 'NÃO EXISTE' : informacoes.ibge;
    // this.gia = informacoes.erro ? 'NÃO EXISTE' : informacoes.gia;
    // this.ddd = informacoes.erro ? 'NÃO EXISTE' : informacoes.ddd;
    // this.siafi = informacoes.erro ? 'NÃO EXISTE' : informacoes.siafi;
  }

  private async consultaAPI(cep: string, opcao: 'json' | 'xml' | 'jsonp') {

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/${opcao}/`)
      let dados = null
      if (res.status === 200 && res.ok) {
        switch (opcao) {
          case 'json':
            dados = await res.json()
            break;
          case 'xml':
            dados = await res.text()
            break;
          case 'jsonp':
            throw new Error('Ainda nao é possível trazer dados com essa opçao')
            break;
          default:
            dados = await res.json()
            break;
        }
      } else {
        throw new Error('Não foi possível buscar informações do CEP')
      }
      return dados
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
      return null
    }
  }

  private retornoJSON(dados: ICEP) {
    this.cep = dados.cep
    this.logradouro = dados.logradouro
    this.complemento = dados.complemento
    this.bairro = dados.bairro
    this.localidade = dados.localidade
    this.uf = dados.uf
    this.ibge = dados.ibge
    this.gia = dados.gia
    this.ddd = dados.ddd
    this.siafi = dados.siafi
    this.erro = dados.erro

  }
  private retornoXML(dados) {
    let xml: XMLDocument = new window.DOMParser().parseFromString(dados, 'text/xml');
    this.cep = xml.documentElement.querySelector('cep').innerHTML;
    this.logradouro = xml.documentElement.querySelector('logradouro').innerHTML;
    this.complemento = xml.documentElement.querySelector('complemento').innerHTML;
    this.bairro = xml.documentElement.querySelector('bairro').innerHTML;
    this.localidade = xml.documentElement.querySelector('localidade').innerHTML;
    this.uf = xml.documentElement.querySelector('uf').innerHTML;
    this.ibge = xml.documentElement.querySelector('ibge').innerHTML;
    this.gia = xml.documentElement.querySelector('gia').innerHTML;
    this.ddd = xml.documentElement.querySelector('ddd').innerHTML;
    this.siafi = xml.documentElement.querySelector('siafi').innerHTML;
    this.erro = xml.documentElement.querySelector('erro') ? true : false;


  }

  private async build() {

    this.dados = await this.consultaAPI(this.cep, 'json')
    if (this.opcao === 'json')
      this.retornoJSON(this.dados)
    if (this.opcao === 'xml')
      this.retornoXML(this.dados)

  }
}

//   .then((CEPRetornado: ICEP) => {
//   let listaCEPSBuscados: ICEP[] = JSON.parse(
//     localStorage.getItem('cepsBuscadosAnterior'),
//   );
//   listaCEPSBuscados ? listaCEPSBuscados : (listaCEPSBuscados = []);
//   const novoCEP = new CEP(CEPRetornado);
//   listaCEPSBuscados.push(novoCEP);

//   localStorage.setItem(
//     'cepsBuscadosAnterior',
//     JSON.stringify(listaCEPSBuscados),
//   );
//   return listaCEPSBuscados;
// })
//   .then((listaCEPBusados) => {
//     const ultimoItem: number = listaCEPBusados.length - 1;
//     Tela.onClick(listaCEPBusados[ultimoItem], ultimoItem);
//   })


