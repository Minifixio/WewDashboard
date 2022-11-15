import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DayEvents } from 'src/app/models/Calendar';
import { ApiService } from 'src/app/services/api.service';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-calendar-threedays',
  templateUrl: './calendar-threedays.component.html',
  styleUrls: ['./calendar-threedays.component.css']
})
export class CalendarThreedaysComponent implements OnInit {

  threeDaysEvents = {} as Promise<DayEvents[]>
  dayEndHour: number = 21
  dayStartHour: number = 8
  today = new Date()

  hourSegmentHeight: number = 0
  hourSegments = 1
  customDayView="customDayView"
  @ViewChild('calendarThreeDaysDiv') calendarThreeDaysDiv: ElementRef | undefined;

  constructor(
    private apiService: ApiService,
    public calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.threeDaysEvents = this.apiService.get<DayEvents[]>("calendar", "3days")
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.hourSegmentHeight = (this.calendarThreeDaysDiv?.nativeElement.offsetHeight / ((this.dayEndHour - this.dayStartHour + 1)))-1
    }, 0)
  }

  async logEvents(daysPromise: Promise<DayEvents[]> ) {
    let days = await daysPromise
    for(let day of days) {
      console.log(day)
    }
  }

  async getDayStartHour() {
    let days = await this.threeDaysEvents;
    let dayStartHour = 24
    days.forEach(day => {
      day.events.forEach(event => {
        const eventStartHour = new Date(event.start).getHours()
        if(eventStartHour < dayStartHour) {
          dayStartHour = eventStartHour
        }
      })
    })
    this.dayStartHour = dayStartHour
  }

  async getDayEndHour() {
    let days = await this.threeDaysEvents;
    let dayEndHour = 0
    days.forEach(day => {
      day.events.forEach(event => {
        const eventEndHour = new Date(event.end).getHours()
        if(eventEndHour > dayEndHour) {
          dayEndHour = eventEndHour
        }
      })
    })
    this.dayEndHour = dayEndHour
  }

  onResize(event: any) {
    this.hourSegmentHeight = (this.calendarThreeDaysDiv?.nativeElement.offsetHeight / ((this.dayEndHour - this.dayStartHour + 1)))-1
  }

  returnDateFormat(dateStr: string): Date {
    return new Date(dateStr)
  }

}
