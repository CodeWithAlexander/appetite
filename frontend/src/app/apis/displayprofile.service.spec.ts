import { TestBed } from '@angular/core/testing';

import { DisplayprofileService } from './displayprofile.service';

describe('DisplayprofileService', () => {
  let service: DisplayprofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayprofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
