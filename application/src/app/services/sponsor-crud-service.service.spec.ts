import { TestBed } from '@angular/core/testing';

import { SponsorCrudServiceService } from './sponsor-crud-service.service';

describe('SponsorCrudServiceService', () => {
  let service: SponsorCrudServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SponsorCrudServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
