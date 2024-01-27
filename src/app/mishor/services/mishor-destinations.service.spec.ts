import { TestBed } from '@angular/core/testing';

import { MishorDestinationsService } from './mishor-destinations.service';

describe('MishorDestinationsService', () => {
  let service: MishorDestinationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MishorDestinationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
