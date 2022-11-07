import { Component, NgZone, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
declare var gapi: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.get("calendar", "24hours").then(val => console.log(val))
  }

}