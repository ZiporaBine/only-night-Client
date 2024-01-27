import { TestBed } from '@angular/core/testing';

import { MishorHotelsService } from './mishor-hotels.service';

describe('MishorHotelsService', () => {
  let service: MishorHotelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MishorHotelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
