import { TestBed } from '@angular/core/testing';

import { AddcredentialsService } from './addcredentials.service';

describe('AddcredentialsService', () => {
  let service: AddcredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddcredentialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
