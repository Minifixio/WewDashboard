import { Component, OnInit } from '@angular/core';
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

  constructor(
    private apiService: ApiService,
    public calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.threeDaysEvents = this.apiService.get<DayEvents[]>("calendar", "3days")
  }

  returnDateFormat(dateStr: string): Date {
    return new Date(dateStr)
  }

}
