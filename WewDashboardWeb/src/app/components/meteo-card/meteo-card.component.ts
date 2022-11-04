import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { DayForecast } from 'src/app/models/Meteo';
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

  constructor(
    private meteoService: MeteoService
  ) { }

  ngOnInit(): void {
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
    const options = { weekday: "long", year: 'numeric', month: 'long', day: 'numeric' }
    const date = new Date(dt)
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric'})

  }
}
