import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  port = 3000

  constructor(
    private http: HttpClient
  ) { }

  async get<T>(service: string, endpoint: string) {
    const url = `http://localhost:${this.port}/api/${service}/${endpoint}`
    return this.http.get<T>(url).toPromise()
  }
}
