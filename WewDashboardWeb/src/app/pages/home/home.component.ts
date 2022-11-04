import { Component, OnInit, ViewChild } from '@angular/core';
import { MeteoComponent } from 'src/app/components/meteo/meteo.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('meteoCards', {static: true})
  meteoCards!: MeteoComponent
  
  constructor() { }

  ngOnInit(): void {
    console.log('home page init')
  }

}
