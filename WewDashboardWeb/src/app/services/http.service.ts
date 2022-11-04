import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { openWeatherMapApiKey } from '../credentials';
import { ErrorsService } from './errors.service';

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
    const url = `https://api.openweathermap.org/${type}/${version}/${tag}?${paramsUrl}&appid=${openWeatherMapApiKey}&units=metric&lang=en`
    try {
      return await this.http.get<T>(url).toPromise()
    } catch(e) {
      this.error.promptError('error with OpenWeatherMap API : ' + e)
      throw e
    }
  }
}
