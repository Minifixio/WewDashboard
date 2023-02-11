import { Injectable } from '@angular/core';
import { CityData, DayForecast, DayForecastJSON, WeekForecast, WeekForecastJSON } from '../models/Meteo';
import { ErrorsService } from './errors.service';
import { HttpService } from './http.service';
import { Logger } from './logger';
import { BehaviorSubject, interval } from 'rxjs';
import * as meteo_config from '../../assets/config/meteo_config.json';
import { MeteoConfig } from '../models/MeteoConfig';

const meteoConfig = (meteo_config as MeteoConfig)

@Injectable({
  providedIn: 'root'
})
export class MeteoService {

  private logger = new Logger('meteo-service')

  // 2 hours interval to get daily forecast
  private dailyForecastInterval = interval(1000*60*60*2)

  // 12 hours interval to get daily forecast
  private fiveDaysForecastInterval = interval(1000*60*60*12)

  public dailyForecastSubject!: BehaviorSubject<DayForecast | null>
  public fiveDaysForecastSubject!: BehaviorSubject<WeekForecast | null>

  constructor (
    private httpService: HttpService,
    private errorsService: ErrorsService,
  ) { }
  
  async initDailyForecastSubject(lon: number, lat: number) {
    const forecast = await this.getCurrentForecast(lon, lat)
    this.dailyForecastSubject = new BehaviorSubject(forecast)

    this.dailyForecastInterval.subscribe(async () => {
      const forecast = await this.getCurrentForecast(lon, lat)
      this.dailyForecastSubject.next(forecast)
    })
    return this.dailyForecastSubject
  }

  async initFiveDaysForecastSubject(lon: number, lat: number) {
    const forecast = await this.getFiveDaysForecast(lon, lat)
    this.fiveDaysForecastSubject = new BehaviorSubject(forecast)
    
    this.fiveDaysForecastInterval.subscribe(async () => {
      const forecast = await this.getFiveDaysForecast(lon, lat)
      this.fiveDaysForecastSubject.next(forecast)
    })
    return this.fiveDaysForecastSubject
  }

  async getDailyForecastSubject(): Promise<BehaviorSubject<DayForecast | null>> {
    if(!this.dailyForecastSubject) {
      const res = await this.initDailyForecastSubject(meteoConfig.myLon, meteoConfig.myLat)
      return res
    } else {
      return new Promise((resolve) => {resolve(this.dailyForecastSubject)})
    }
  }

  async getFiveDaysForecastSubject(): Promise<BehaviorSubject<WeekForecast | null>> {
    if(!this.fiveDaysForecastSubject) {
      const res = await this.initFiveDaysForecastSubject(meteoConfig.myLon, meteoConfig.myLat)
      return res
    } else {
      return new Promise((resolve) => {resolve(this.fiveDaysForecastSubject)})
    }
  }

  async formatDayForecast(json: DayForecastJSON , lon: number = 0, lat: number = 0) {
      var dayForecast = {} as DayForecast

      if (lon==0 && lat==0) {
        dayForecast.city = await this.cityFromCoords(json.coord.lon, json.coord.lat)
      } else {
        dayForecast.city = await this.cityFromCoords(lon, lat)
      }

      dayForecast.main = json.weather[0].main
      dayForecast.description = json.weather[0].description
      dayForecast.icon = json.weather[0].icon
      dayForecast.temp = json.main.temp
      dayForecast.temp_min = json.main.temp_min
      dayForecast.temp_max = json.main.temp_max
      dayForecast.cloudiness = json.clouds.all
      dayForecast.date_unix = json.dt
      dayForecast.rain = {
        last_hour: json.rain ? Object.values(json.rain)[0] : null, 
        last_three_hours: json.rain ? Object.values(json.rain)[1] : null 
      }
      dayForecast.wind_speed = json.wind.speed
      dayForecast.rain_prob = json.pop ? json.pop : null

      return dayForecast
  }

  async formatFiveDaysForecast(json: WeekForecastJSON, lon: number, lat: number): Promise<WeekForecast> {
      var fiveDaysForecast: DayForecast[][] = [[], [], [], [], [], []]
      const refDate = new Date(json.list[0].dt * 1000)
      var refDay = refDate.getDate()
      var daysCount = 0

      for (const forecast of json.list) {
          const forecastDate = new Date(forecast.dt * 1000)
          const forecastDay = forecastDate.getDate()

          if (forecastDay != refDay) {
              daysCount += 1
              refDay = forecastDay
          }
          var formattedDayForecast = await this.formatDayForecast(forecast, lon, lat)
          fiveDaysForecast[daysCount].push(formattedDayForecast)
      }

      var result = {} as WeekForecast
      result.day1 = fiveDaysForecast[0]
      result.day2 = fiveDaysForecast[1]
      result.day3 = fiveDaysForecast[2]
      result.day4 = fiveDaysForecast[3]
      result.day5 = fiveDaysForecast[4]
      result.day6 = fiveDaysForecast[5]

      return result
  }

  async cityFromCoords(lon: number, lat: number): Promise<string> {
      return this.httpService.getOpenWeatherMap<CityData[]>(
          'geo',
          '1.0',
          'reverse',
          [{ name: 'lon', value: lat.toString() }, { name: 'lat', value: lon.toString() }]
      ).then((obj) => {
          return obj[0].name
      }).catch(e => {
          this.errorsService.promptError('error with geo API : ' + e);
          return 'error with geo API'
      });
  }

  async getCurrentForecast(lon: number, lat: number): Promise<DayForecast | null> {
    this.logger.log('getting current forecast')
    return this.httpService.getOpenWeatherMap<DayForecastJSON>(
      'data',
      '2.5',
      'weather',
      [{ name: 'lon', value: lat.toString() }, { name: 'lat', value: lon.toString() }]
    ).then(obj => {
      return this.formatDayForecast(obj)
    }).catch(e => {
      this.errorsService.promptError('error with current weather API : ' + e);
      return null
    })
  }

  async getFiveDaysForecast(lon: number, lat: number): Promise<WeekForecast | null> {
    this.logger.log('getting five days forecast')
    return this.httpService.getOpenWeatherMap<WeekForecastJSON>(
      'data',
      '2.5',
      'forecast',
      [{ name: 'lon', value: lat.toString() }, { name: 'lat', value: lon.toString() }]
    ).then(obj => {
      return this.formatFiveDaysForecast(obj, lon, lat)
    }).catch(e => {
      this.errorsService.promptError('error with five days forecast API : ' + e);
      return null
    })
  }

  getWeatherIconURL(id: string) {
    return `https://openweathermap.org/img/wn/${id}@2x.png`
  }
}