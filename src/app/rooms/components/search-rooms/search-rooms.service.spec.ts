import { TestBed } from '@angular/core/testing';

import { SearchRoomsService } from './search-rooms.service';

describe('SearchRoomsService', () => {
  let service: SearchRoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchRoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
