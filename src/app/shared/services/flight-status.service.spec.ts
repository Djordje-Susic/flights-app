import { TestBed } from '@angular/core/testing';

import { FlightStatusService } from './flight-status.service';

describe('FlightStatusService', () => {
  let service: FlightStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
