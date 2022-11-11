import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarThreedaysComponent } from 'src/app/components/calendar-threedays/calendar-threedays.component';
import { CalendarTodayComponent } from 'src/app/components/calendar-today/calendar-today.component';
import { MeteoComponent } from 'src/app/components/meteo/meteo.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('meteoCards', {static: true})
  meteoCards!: MeteoComponent

  @ViewChild('calendarToday', {static: true})
  calendarToday!: CalendarTodayComponent

  @ViewChild('calendarThreeDays', {static: true})
  calendarThreeDays!: CalendarThreedaysComponent
  
  constructor() { }

  ngOnInit(): void {
    console.log('home page init')
  }

}
