import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { CalEvent } from 'src/app/models/Calendar';
import { CalendarEvent } from 'angular-calendar';
import { CalendarService } from 'src/app/services/calendar.service';
import { Observable } from 'rxjs';
import { Logger } from 'src/app/services/logger';
declare var gapi: any;

@Component({
  selector: 'app-calendar-today',
  templateUrl: './calendar-today.component.html',
  styleUrls: ['./calendar-today.component.css']
})
export class CalendarTodayComponent implements OnInit {

  todayEvents!: CalEvent[]
  viewDate: Date = new Date()
  nowHour: number = new Date().getHours()
  dayEndHour: number = 23
  dayStartHour: number = 7
  logger = new Logger("calendar-today-component")
  hourSegmentHeight: number = 0

  @ViewChild('calendarDiv') calendarDiv: ElementRef | undefined

  constructor(
    public calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.logger.log('meteo today init')
    this.calendarService.getCalendarTodaySubject().then(res => {
      res.asObservable().subscribe(todayEvents => {
        this.todayEvents = todayEvents
      })
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.hourSegmentHeight = (this.calendarDiv?.nativeElement.offsetHeight / ((this.dayEndHour - this.dayStartHour + 1)))-3
    }, 0)
  }

  onResize(event: any) {
    this.hourSegmentHeight = (this.calendarDiv?.nativeElement.offsetHeight / ((this.dayEndHour - this.dayStartHour + 1)))-3
  }
 
  logUnknownObjectFromView(obj: any) {
    console.log(obj)
    return null
  }
}