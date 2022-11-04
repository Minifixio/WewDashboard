import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoCardComponent } from './meteo-card.component';

describe('MeteoCardComponent', () => {
  let component: MeteoCardComponent;
  let fixture: ComponentFixture<MeteoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeteoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
