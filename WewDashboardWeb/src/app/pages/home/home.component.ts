import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CalendarThreedaysComponent } from 'src/app/components/calendar-threedays/calendar-threedays.component';
import { CalendarTodayComponent } from 'src/app/components/calendar-today/calendar-today.component';
import { MeteoComponent } from 'src/app/components/meteo/meteo.component';
import { TasksComponent } from 'src/app/components/tasks/tasks.component';
import { DayEvents } from 'src/app/models/Calendar';
import { MeteoService } from 'src/app/services/meteo.service';

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

  @ViewChild('todoTasks', {static: true})
  todoTasks!: TasksComponent
  
  constructor(
    private meteoService: MeteoService
  ) { }

  ngOnInit(): void {
    console.log('home page init')
  }

}
