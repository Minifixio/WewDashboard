import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarTodayComponent } from './components/calendar-today/calendar-today.component';
import { HomeComponent } from './pages/home/home.component';
import { MeteoCardComponent } from './components/meteo-card/meteo-card.component';
import { MeteoComponent } from './components/meteo/meteo.component';
import { HttpClientModule } from '@angular/common/http';
import { MeteoCardTodayComponent } from './components/meteo-card-today/meteo-card-today.component';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarThreedaysComponent } from './components/calendar-threedays/calendar-threedays.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarTodayComponent,
    HomeComponent,
    MeteoComponent,
    MeteoCardComponent,
    MeteoCardTodayComponent,
    CalendarThreedaysComponent
  ],
  imports: [
    AppRoutingModule,
    MatGridListModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
