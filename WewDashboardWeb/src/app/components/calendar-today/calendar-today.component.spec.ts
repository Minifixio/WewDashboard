import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponentToday } from './calendar-today.component';

describe('CalendarComponent', () => {
  let component: CalendarComponentToday;
  let fixture: ComponentFixture<CalendarComponentToday>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarComponentToday ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponentToday);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
