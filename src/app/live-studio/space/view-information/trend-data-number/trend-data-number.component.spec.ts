import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendDataNumberComponent } from './trend-data-number.component';

describe('TrendDataNumberComponent', () => {
  let component: TrendDataNumberComponent;
  let fixture: ComponentFixture<TrendDataNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrendDataNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendDataNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
