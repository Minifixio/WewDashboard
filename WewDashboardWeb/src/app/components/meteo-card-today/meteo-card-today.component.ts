import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DayForecast } from 'src/app/models/Meteo';
import { MeteoService } from 'src/app/services/meteo.service';

@Component({
  selector: 'app-meteo-card-today',
  templateUrl: './meteo-card-today.component.html',
  styleUrls: ['./meteo-card-today.component.css']
})
export class MeteoCardTodayComponent implements OnInit {

  @Input() nextForecast: DayForecast[] | undefined;
  @Input() currentWeather: DayForecast | undefined;
  @ViewChild('todayCardDiv') todayCardDiv: ElementRef | undefined;
  @ViewChild('primaryInfosDiv') primaryInfosDiv: ElementRef | undefined;

  rowHeight: string = "10px"

  constructor(
    private meteoService: MeteoService
  ) { }

  ngOnInit(): void {
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
