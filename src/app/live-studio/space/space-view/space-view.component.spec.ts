import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceViewComponent } from './space-view.component';

describe('SpaceViewComponent', () => {
  let component: SpaceViewComponent;
  let fixture: ComponentFixture<SpaceViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaceViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
