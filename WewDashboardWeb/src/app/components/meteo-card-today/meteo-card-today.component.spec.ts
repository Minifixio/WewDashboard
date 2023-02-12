import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoCardTodayComponent } from './meteo-card-today.component';

describe('MeteoCardTodayComponent', () => {
  let component: MeteoCardTodayComponent;
  let fixture: ComponentFixture<MeteoCardTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeteoCardTodayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteoCardTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
