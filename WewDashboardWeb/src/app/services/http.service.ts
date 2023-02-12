import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorsService } from './errors.service';
import * as meteo_config from '../../assets/config/meteo_config.json';
import { MeteoConfig } from '../models/MeteoConfig';

const meteoConfig = (meteo_config as MeteoConfig)

interface Param {
  name: string
  value: string
}

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  constructor(
    private http: HttpClient,
    private error: ErrorsService
  ) { }

  async getOpenWeatherMap<T>(type: string, version: string, tag: string,  params: Param[]) {
    const paramsUrl = params.map((param) => {return `${param.name}=${param.value}` }).join('&')
    const url = `https://api.openweathermap.org/${type}/${version}/${tag}?${paramsUrl}&appid=${meteoConfig.openWeatherMapApiKey}&units=metric&lang=en`
    console.log(url)
    try {
      return this.http.get<T>(url).toPromise()
    } catch(e) {
      this.error.promptError('error with OpenWeatherMap API : ' + e)
      throw e
    }
  }
}