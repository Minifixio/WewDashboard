import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { Observable } from 'rxjs';
import { DayForecast, WeekForecast } from 'src/app/models/Meteo';
import { MeteoService } from 'src/app/services/meteo.service';

@Component({
  selector: 'app-meteo-card',
  templateUrl: './meteo-card.component.html',
  styleUrls: ['./meteo-card.component.css']
})
export class MeteoCardComponent implements OnInit {

  rowHeight: string = "10px"
  @ViewChild('cardDiv') cardDiv: ElementRef | undefined;

  @Input() dayForecast: DayForecast[] | undefined;
  @Input() dayNumber!: number

  constructor(
    private meteoService: MeteoService
  ) { }

  ngOnInit(): void {
    this.meteoService.getFiveDaysForecastSubject().then(res => {
      res.asObservable().subscribe(forecast => {
        type ObjectKey = keyof typeof forecast;
        const key = `day${this.dayNumber}` as ObjectKey
        this.dayForecast = forecast![key]
      })
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.rowHeight = (this.cardDiv?.nativeElement.offsetHeight / 8 - 5).toString()+'px' 
    }, 0)
  }

  onResize(event: any) {
    this.rowHeight = (this.cardDiv?.nativeElement.offsetHeight / 8 - 5).toString()+'px' 
  }

  ngOnChanges() {
    setTimeout(() => {
      this.rowHeight = (this.cardDiv?.nativeElement.offsetHeight / 8 - 5).toString()+'px' 
    }, 0)  
  }

  getWeatherIconURL(id:string) {
    return this.meteoService.getWeatherIconURL(id)
  }

  getDateTitleFromEpoch(dt: number) {
    const date = new Date(dt)
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric'})
  }
}
