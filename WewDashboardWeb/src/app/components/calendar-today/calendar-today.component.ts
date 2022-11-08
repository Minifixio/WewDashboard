import { Component, NgZone, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { CalendarEvent } from 'src/app/models/Calendar';
declare var gapi: any;

@Component({
  selector: 'app-calendar-today',
  templateUrl: './calendar-today.component.html',
  styleUrls: ['./calendar-today.component.css']
})
export class CalendarComponentToday implements OnInit {

  todayEvents = {} as Promise<CalendarEvent[]>

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.todayEvents = this.apiService.get("calendar", "24hours")
  }

}