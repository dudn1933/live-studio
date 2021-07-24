import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcgWaveformComponent } from './ecg-waveform.component';

describe('EcgWaveformComponent', () => {
  let component: EcgWaveformComponent;
  let fixture: ComponentFixture<EcgWaveformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcgWaveformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcgWaveformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
