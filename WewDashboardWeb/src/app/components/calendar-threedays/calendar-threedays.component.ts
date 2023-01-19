import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { DayEvents } from 'src/app/models/Calendar';
import { ApiService } from 'src/app/services/api.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { Logger } from 'src/app/services/logger';

@Component({
  selector: 'app-calendar-threedays',
  templateUrl: './calendar-threedays.component.html',
  styleUrls: ['./calendar-threedays.component.css']
})
export class CalendarThreedaysComponent implements OnInit {

  threeDaysEvents!: DayEvents[]
  dayEndHour: number = 21
  dayStartHour: number = 8
  today = new Date()
  logger = new Logger("calendar-threedays-component")

  hourSegmentHeight: number = 0
  hourSegments = 1
  customDayView="customDayView"
  @ViewChild('calendarThreeDaysDiv') calendarThreeDaysDiv: ElementRef | undefined;
  @ViewChildren('calendarDayViewDiv') calendarDayViewDiv: QueryList<ElementRef> | undefined;

  constructor(
    private apiService: ApiService,
    public calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.logger.log('meteo 3 days init')
    this.calendarService.getCalendarThreeDaysSubject().then(res => {
      res.asObservable().subscribe(threeDaysEvents => {
        this.threeDaysEvents = threeDaysEvents
        setTimeout(() => this.changeCalendarBackground(), 0)
      })
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.hourSegmentHeight = (this.calendarThreeDaysDiv?.nativeElement.offsetHeight / ((this.dayEndHour - this.dayStartHour + 1)))-2
    }, 0)
  }

  changeCalendarBackground() {
    // Trying to edit calendar CSS the hard way
    this.calendarDayViewDiv?.toArray().forEach(el => {
      el.nativeElement.firstChild.firstChild.firstChild.style.backgroundColor = 'transparent'
      el.nativeElement.firstChild.firstChild.firstChild.style.borderColor = 'transparent'
      el.nativeElement.firstChild.firstChild.firstChild.children[1].style.borderColor = 'transparent'
      const hourSegments = el.nativeElement.firstChild.firstChild.firstChild.children[1].children[0].children[0].children
      Array.prototype.forEach.call(hourSegments, e => e.style.backgroundColor = 'transparent')
    })
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
    this.hourSegmentHeight = (this.calendarThreeDaysDiv?.nativeElement.offsetHeight / ((this.dayEndHour - this.dayStartHour + 1)))-2
  }

  returnDateFormat(dateStr: string): Date {
    return new Date(dateStr)
  }

}
