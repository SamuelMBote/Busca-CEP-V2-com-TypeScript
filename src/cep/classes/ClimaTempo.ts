
import IClimaTempo from '../interfaces/IClimaTempo';
import ILocal from '../interfaces/ILocal';
import IPrevisao from '../interfaces/IPrevisao';
interface ResponseAPIPrevisao {
  cloudiness: number
  condition: string
  date: string
  description: string
  full_date: string
  humidity: number
  max: number
  min: number
  moon_phase: string
  rain: number
  rain_probability: number
  sunrise: string
  sunset: string
  weekday: string
  wind_speedy: string
}
interface ResponseAPIClima {
  cid: string
  city: string
  city_name: string
  cloudiness: number
  condition_code: string
  condition_slug: string
  cref: string
  currently: string
  date: string
  description: string
  forecast: ResponseAPIPrevisao[]
  humidity: number
  img_id: string
  moon_phase: string
  rain: number
  sunrise: string
  sunset: string
  temp: number
  time: string
  timezone: string
  wind_cardinal: string
  wind_direction: number
  wind_speedy: string
}
interface ResponseAPIIP {
  address: string
  city: string
  continent: string
  continent_code: string
  country: {
    name: string,
    code: string,
    capital: string,
    flag: {
      png_16: string
      svg: string
    },
    calling_code: string
  }
  country_name: string
  latitude: number
  longitude: number
  region: string
  region_code: string
  type: string
  woeid: number
}
export default class ClimaTempo {
  private static dados: ResponseAPIClima | null;
  private static ip: ResponseAPIIP | null;
  public static clima: IClimaTempo
  constructor() {
    return ClimaTempo.clima
  }

  private static async buscaIP(): Promise<ResponseAPIIP | null> {
    try {
      const res = await fetch(
        'https://api.hgbrasil.com/geoip?format=json-cors&key=5dc085d0&address=remote&precision=false',
      )

      const localizacao = await res.json()
      if (res.status == 200 && res.ok) {

        return localizacao.results
      } else throw new Error('Erro ao buscar dados da localizacao')
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
      return null
    }
  }

  private static async buscaDados(local: ResponseAPIIP): Promise<ResponseAPIClima | null> {
    try {
      const res = await fetch(
        `https://api.hgbrasil.com/weather?format=json-cors&key=5dc085d0&woeid=${local.woeid}`,
      )
      if (res.status == 200 && res.ok) {
        const climaTempo = await res.json()

        return climaTempo.results
      } else {
        throw new Error('Erro ao buscar dados da localizacao')
      }

    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
      return null
    }
  }

  private static climaTempo(dados: ResponseAPIClima): IClimaTempo {

    const forecast: IPrevisao[] = dados.forecast.map((previsao: ResponseAPIPrevisao) => {

      const dados: IPrevisao = { condicao: previsao.condition, data: previsao.full_date, descricao: previsao.description, diaSemana: previsao.weekday, maxima: previsao.max, minima: previsao.min }
      return dados;
    });

    return {
      cidade_uf: dados.city,
      cidade: dados.city_name,
      condicao_codigo: dados.condition_code,
      condicao_slug: dados.condition_slug,
      previsao: forecast,
      umidade: dados.humidity,
      nascerSol: dados.sunrise,
      porSol: dados.sunset,
      temperatura: dados.temp,
      hora: dados.time,
      velocidadeVento: dados.wind_speedy,
      data: dados.date,
      descricao: dados.description,
    };
  }


  public static async build() {
    this.ip = await this.buscaIP()
    if (this.ip) {
      this.dados = await this.buscaDados(this.ip);
    }
    this.clima = this.climaTempo(this.dados)

    return new this()
  }
}
