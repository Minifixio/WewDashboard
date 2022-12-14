import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor() { }

  promptError(message: string) {
    console.log(`[ERROR] - ${message}`)
  }
}
