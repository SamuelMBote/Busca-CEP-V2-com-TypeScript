export default function consultaAPI(cep: string, opcao: string): Promise<any> {
  let retorno: Promise<any> = fetch(`https://viacep.com.br/ws/${cep}/${opcao}/`)
    .then((resposta) => {
      let dadosRecebidos: Promise<any>;
      if (resposta.ok && opcao == 'json') {
        dadosRecebidos = resposta.json();
        return dadosRecebidos;
      } else if (resposta.ok && opcao == 'xml') {
        dadosRecebidos = resposta.text();
        return dadosRecebidos;
      } else if (resposta.ok && opcao == 'jsonp') {
        throw new TypeError('Ainda não conseguimos tratar esse resultado');
      }
    })
    .then((dadosRecebidos) => {
      return (retorno = dadosRecebidos);
    })
    .catch((erro) => console.log(erro))
    .finally(() => retorno);
  console.log(retorno);
  return retorno;
}
