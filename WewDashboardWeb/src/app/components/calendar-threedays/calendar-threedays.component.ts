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
  dayEndHour: number = 23
  dayStartHour: number = 7
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
    this.apiService.get<DayEvents[]>("calendar", "3days").then((res) => {
      console.log(res)
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.hourSegmentHeight = (this.calendarThreeDaysDiv?.nativeElement.offsetHeight / ((this.dayEndHour - this.dayStartHour + 1)))-1
    }, 0)
  }

  onResize(event: any) {
    this.hourSegmentHeight = (this.calendarThreeDaysDiv?.nativeElement.offsetHeight / ((this.dayEndHour - this.dayStartHour + 1)))-1
  }

  returnDateFormat(dateStr: string): Date {
    return new Date(dateStr)
  }

}
