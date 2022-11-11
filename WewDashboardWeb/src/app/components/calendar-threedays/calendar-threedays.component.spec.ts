import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarThreedaysComponent } from './calendar-threedays.component';

describe('CalendarThreedaysComponent', () => {
  let component: CalendarThreedaysComponent;
  let fixture: ComponentFixture<CalendarThreedaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarThreedaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarThreedaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
