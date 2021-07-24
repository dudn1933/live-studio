import { TestBed } from '@angular/core/testing';

import { LiveStudioService } from './live-studio.service';

describe('LiveStudioService', () => {
  let service: LiveStudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveStudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
