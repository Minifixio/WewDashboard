import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { myLat, myLon } from 'src/app/credentials';
import { DayForecast, WeekForecast } from 'src/app/models/Meteo';
import { ErrorsService } from 'src/app/services/errors.service';
import { MeteoService } from 'src/app/services/meteo.service';
import { MeteoCardTodayComponent } from '../meteo-card-today/meteo-card-today.component';
import { MeteoCardComponent } from '../meteo-card/meteo-card.component';


@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {

  currentForecast = {} as DayForecast;

  fiveDaysForecast = {} as WeekForecast;

  nextForecast = {} as DayForecast[]

  lon: number = myLon
  lat: number = myLat

  @ViewChild('meteoCard', {static: true})
  meteoCard!: MeteoCardComponent

  @ViewChild('meteoCardToday', {static: true})
  meteoCardToday!: MeteoCardTodayComponent

  constructor(
    private meteoService: MeteoService,
    private errorsService: ErrorsService
  ) { }

  async ngOnInit(): Promise<void> {
    console.log('meteo component init')
    
    this.meteoService.getCurrentForecast(this.lon, this.lat).then((res) => {
      if (res==null) {
        this.errorsService.promptError('can\'t display current forecast in meteo component')
      } else {
        this.currentForecast = res 
      }
    })

    this.meteoService.getFiveDaysForecast(this.lon, this.lat).then((res) => {
      if (res==null) {
        this.errorsService.promptError('can\'t display forecast in meteo component')
      } else {
        this.fiveDaysForecast = res 

        // Next forecast is the forecast for the current day since getCurrentForecast returns only information for the instant moment 
        // but not for te following hours of the day
        if (this.fiveDaysForecast.day1.length < 5) {
          this.nextForecast = Array.from([...this.fiveDaysForecast.day1, ...this.fiveDaysForecast.day2.slice(0, 5-this.fiveDaysForecast.day1.length)])
        } else {
          this.nextForecast = this.fiveDaysForecast.day1
        }
      }
    })


  }
}
