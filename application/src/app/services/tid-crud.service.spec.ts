import { TestBed } from '@angular/core/testing';

import { TIDCRUDService } from './tid-crud.service';

describe('TIDCRUDService', () => {
  let service: TIDCRUDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TIDCRUDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
