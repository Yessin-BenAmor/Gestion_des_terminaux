import { TestBed } from '@angular/core/testing';

import { TerminalTypesCrudService } from './terminal-types-crud.service';

describe('TerminalTypesCrudService', () => {
  let service: TerminalTypesCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerminalTypesCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
