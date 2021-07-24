import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespirationWaveformComponent } from './respiration-waveform.component';

describe('RespirationWaveformComponent', () => {
  let component: RespirationWaveformComponent;
  let fixture: ComponentFixture<RespirationWaveformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RespirationWaveformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RespirationWaveformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
