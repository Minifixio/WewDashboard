import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';
import { MeteoComponent } from 'src/app/components/meteo/meteo.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('meteoCards', {static: true})
  meteoCards!: MeteoComponent

  @ViewChild('calendar', {static: true})
  calendar!: CalendarComponent
  
  constructor() { }

  ngOnInit(): void {
    console.log('home page init')
  }

}
