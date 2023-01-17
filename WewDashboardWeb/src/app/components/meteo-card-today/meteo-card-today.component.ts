import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DayForecast } from 'src/app/models/Meteo';
import { MeteoService } from 'src/app/services/meteo.service';

@Component({
  selector: 'app-meteo-card-today',
  templateUrl: './meteo-card-today.component.html',
  styleUrls: ['./meteo-card-today.component.css']
})
export class MeteoCardTodayComponent implements OnInit {

  @Input() nextForecast!: DayForecast[] | null;

  @Input() currentWeather!: DayForecast | null;

  @ViewChild('todayCardDiv') todayCardDiv: ElementRef | undefined;
  @ViewChild('primaryInfosDiv') primaryInfosDiv: ElementRef | undefined;

  rowHeight: string = "10px"

  constructor(
    private meteoService: MeteoService
  ) { }

  ngOnInit(): void {
    // this.currentWeather$?.subscribe((forecast) => {this.currentWeather = forecast})
    // this.nextForecast$?.subscribe((forecast) => {this.nextForecast = forecast})
    
    this.meteoService.getDailyForecastSubject().then(res => {
      res.asObservable().subscribe(forecast => {
        this.currentWeather = forecast
      })
    })

    this.meteoService.getFiveDaysForecastSubject().then(res => {
      res.asObservable().subscribe(forecast => {
        if (forecast!.day1.length < 5) {
          this.nextForecast = Array.from([...forecast!.day1, ...forecast!.day2.slice(0, 5-forecast!.day1.length)])
        } else {
          this.nextForecast = forecast!.day1
        }
      })
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.rowHeight = (this.nextForecast?.length ? (((this.todayCardDiv?.nativeElement.offsetHeight - this.primaryInfosDiv?.nativeElement.offsetHeight) / this.nextForecast.length) - 2 ) : 1).toString()+'px'
    }, 0)
  }

  onResize(event: any) {
    this.rowHeight = (this.nextForecast?.length ? (((this.todayCardDiv?.nativeElement.offsetHeight - this.primaryInfosDiv?.nativeElement.offsetHeight) / this.nextForecast.length) - 2 ) : 1).toString()+'px'
  }

  getWeatherIconURL(id:string) {
    return this.meteoService.getWeatherIconURL(id)
  }

  arrayFromArrayOfObject(el: DayForecast[]) {
    return Array.from(el)
  }

}
