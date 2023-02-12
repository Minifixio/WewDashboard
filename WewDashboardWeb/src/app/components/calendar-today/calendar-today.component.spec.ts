import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarTodayComponent } from './calendar-today.component';

describe('CalendarComponent', () => {
  let component: CalendarTodayComponent;
  let fixture: ComponentFixture<CalendarTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarTodayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
