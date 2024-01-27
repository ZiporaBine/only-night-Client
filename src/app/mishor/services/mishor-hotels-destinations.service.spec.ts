import { TestBed } from '@angular/core/testing';

import { MishorHotelsDestinationsService } from './mishor-hotels-destinations.service';

describe('MishorHotelsDestinationsService', () => {
  let service: MishorHotelsDestinationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MishorHotelsDestinationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
