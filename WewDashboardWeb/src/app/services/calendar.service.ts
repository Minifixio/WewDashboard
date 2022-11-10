import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { CalEvent } from '../models/Calendar';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }

  calEventToCalendarEvent(event: CalEvent) {
    var res= {} as CalendarEvent
    res.title = event.title
    res.end = new Date(event.end)
    res.start = new Date(event.start)
    res.meta = event.description + event.location
    return res
  }
}
