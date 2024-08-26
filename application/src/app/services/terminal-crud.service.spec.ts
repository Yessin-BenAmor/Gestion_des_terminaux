import { TestBed } from '@angular/core/testing';

import { TerminalCrudService } from './terminal-crud.service';

describe('TerminalCrudService', () => {
  let service: TerminalCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminalCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
