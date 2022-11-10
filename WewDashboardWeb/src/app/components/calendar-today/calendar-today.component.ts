import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { CalEvent } from 'src/app/models/Calendar';
import { CalendarEvent } from 'angular-calendar';
import { CalendarService } from 'src/app/services/calendar.service';
declare var gapi: any;

@Component({
  selector: 'app-calendar-today',
  templateUrl: './calendar-today.component.html',
  styleUrls: ['./calendar-today.component.css']
})
export class CalendarComponentToday implements OnInit {

  todayEvents = {} as Promise<CalEvent[]>
  viewDate: Date = new Date()
  nowHour: number = new Date().getHours()
  dayEndHour: number = 23
  dayStartHour: number = 7

  hourSegmentHeight: number = 0
  @ViewChild('calendarDiv') calendarDiv: ElementRef | undefined;

  constructor(
    private apiService: ApiService,
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.todayEvents = this.apiService.get("calendar", "24hours")
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.hourSegmentHeight = (this.calendarDiv?.nativeElement.offsetHeight / ((this.dayEndHour - this.dayStartHour + 1)*2))
      console.log(this.calendarDiv) 
    }, 0)
  }

  onResize(event: any) {
    console.log(this.calendarDiv?.nativeElement.offsetHeight)
    this.hourSegmentHeight = (this.calendarDiv?.nativeElement.offsetHeight / ((this.dayEndHour - this.dayStartHour + 1)*2))
  }

  toCalendarEvent(events: CalEvent[]): CalendarEvent[] {
    var res: CalendarEvent[] = []
    for (let event of events) {
      res.push(this.calendarService.calEventToCalendarEvent(event))
    }
    return res
  }

}