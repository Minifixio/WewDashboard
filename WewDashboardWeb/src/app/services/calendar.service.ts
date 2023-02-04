import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { BehaviorSubject, interval } from 'rxjs';
import { CalEvent, DayEvents } from '../models/Calendar';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  // Update calendar every hours
  private calendarInterval = interval(1000*10)

  public calendarTodaySubject!: BehaviorSubject<CalEvent[]>
  public calendarThreeDaysSubject!: BehaviorSubject<DayEvents[]>

  constructor(
    private apiService: ApiService
  ) { }

  async getTodayEvents(): Promise<CalEvent[]> {
    const res = await this.apiService.get<CalEvent[]>("calendar", "day")
    return res
  }

  async getThreeDaysEvents(): Promise<DayEvents[]> {
    const res = await this.apiService.get<DayEvents[]>("calendar", "3days")
    return res
  }

  private async initCalendarTodaySubject() {
    const todayEvents = await this.getTodayEvents()
    this.calendarTodaySubject = new BehaviorSubject(todayEvents)

    this.calendarInterval.subscribe(async () => {
      const todayEvents = await this.getTodayEvents()
      this.calendarTodaySubject.next(todayEvents)
    })
  }

  async getCalendarTodaySubject(): Promise<BehaviorSubject<CalEvent[]>> {
    if (!this.calendarTodaySubject) {
      await this.initCalendarTodaySubject()
    } 
    return this.calendarTodaySubject
  }

  private async initCalendarThreeDaysSubject() {
    const threeDaysEvents = await this.getThreeDaysEvents()
    this.calendarThreeDaysSubject = new BehaviorSubject(threeDaysEvents)

    this.calendarInterval.subscribe(async () => {
      const threeDaysEvents = await this.getThreeDaysEvents()
      this.calendarThreeDaysSubject.next(threeDaysEvents)
    })
  }

  async getCalendarThreeDaysSubject(): Promise<BehaviorSubject<DayEvents[]>> {
    if (!this.calendarTodaySubject) {
      await this.initCalendarThreeDaysSubject()
    } 
    return this.calendarThreeDaysSubject
  }

  calEventToCalendarEvent(event: CalEvent) {
    var res = {} as CalendarEvent
    res.title = event.title
    res.end = new Date(event.end)
    res.start = new Date(event.start)
    res.meta = ""
    if (event.description) { res.meta += event.description }
    if (event.description) { res.meta += event.location }
    return res
  }

  toCalendarEventArray(events: CalEvent[]): CalendarEvent[] {
    var res: CalendarEvent[] = []
    for (let event of events) {
      res.push(this.calEventToCalendarEvent(event))
    }
    return res
  }
}
