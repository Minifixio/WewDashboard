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

  dailyForecastSubject!: Promise<BehaviorSubject<DayForecast | null>>
  fiveDaysForecastSubject!: Promise<BehaviorSubject<WeekForecast | null>>
  lon: number = myLon
  lat: number = myLat
  fiveDaysForecast!: Promise<WeekForecast | null>

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
    this.dailyForecastSubject = this.meteoService.getDailyForecastSubject()
    this.fiveDaysForecastSubject = this.meteoService.getFiveDaysForecastSubject() 

    this.fiveDaysForecast = this.meteoService.getFiveDaysForecast(this.lon, this.lat)
  }
}
