import IClimaTempo from '../interfaces/IClimaTempo';
import ILocal from '../interfaces/ILocal';
import IPrevisao from '../interfaces/IPrevisao';

export default class ClimaTempo {
  constructor() {}

  public buscaIP() {
    fetch(
      'https://api.hgbrasil.com/geoip?format=json-cors&key=5dc085d0&address=remote&precision=false',
    )
      .then((resposta) => resposta.json())
      .then((localizacao) => {
        localStorage.setItem('localizacao', JSON.stringify(localizacao));
      })
      .catch((e) => {
        throw new Error('Localizaçao não Encontrada');
      })
      .finally(() => {
        const dadosLocal = JSON.parse(localStorage.getItem('localizacao'));

        const meuLocal: ILocal = {
          cidade: dadosLocal.results.city,
          uf: dadosLocal.results.region,
          sigla_uf: dadosLocal.results.region_code,
          pais: dadosLocal.results.country.name,
          sigla_pais: dadosLocal.results.country.code,
          woeid: dadosLocal.results.woeid,
        };
        this.buscaClicaTempo(meuLocal);
      });
  }

  public buscaClicaTempo(local: ILocal) {
    fetch(
      `https://api.hgbrasil.com/weather?format=json-cors&key=5dc085d0&woeid=${local.woeid}`,
    )
      .then((resposta) => resposta.json())
      .then((dadosWeather) => {
        const forecast: IPrevisao[] = [];
        dadosWeather.results.forecast.forEach((previsao: any) => {
          const resultado: IPrevisao = {
            condicao: previsao.condition,
            data: previsao.date,
            descricao: previsao.description,
            maxima: previsao.max,
            minima: previsao.min,
            diaSemana: previsao.weekday,
          };
          return forecast.push(previsao);
        });

        const ClimaTempo: IClimaTempo = {
          cidade_uf: dadosWeather.results.city,
          cidade: dadosWeather.results.city_name,
          condicao_codigo: dadosWeather.results.condition_code,
          condicao_slug: dadosWeather.results.condition_slug,
          previsao: forecast,
          umidade: dadosWeather.results.humidity,
          nascerSol: dadosWeather.results.sunrise,
          porSol: dadosWeather.results.sunset,
          temperatura: dadosWeather.results.temp,
          hora: dadosWeather.results.time,
          velocidadeVento: dadosWeather.results.wind_speedy,
          data: dadosWeather.results.date,
          descricao: dadosWeather.results.description,
        };
        return ClimaTempo;
      })
      .then((ClimaTempo) => {
        localStorage.setItem('clima', JSON.stringify(ClimaTempo));
      })
      .catch((Error) => {
        throw new Error('Não foi possivel buscar o clima');
      })
      .finally(() => {
        const Clima = JSON.parse(localStorage.getItem('clima'));
      });
  }
}
