import { TestBed } from '@angular/core/testing';

import { OptiondService } from './optiond.service';

describe('OptiondService', () => {
  let service: OptiondService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptiondService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
