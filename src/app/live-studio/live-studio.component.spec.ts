import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveStudioComponent } from './live-studio.component';

describe('LiveStudioComponent', () => {
  let component: LiveStudioComponent;
  let fixture: ComponentFixture<LiveStudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveStudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
