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

  it('#getMap should return status map',
    (done: DoneFn) => {
    service.getMap().subscribe(value => {
      expect(typeof value).toEqual('object');
      expect(typeof value.A).toEqual('object');
      expect(typeof value.A.statusTextEn).toEqual('string');
      expect(typeof value.C).toEqual('object');
      expect(typeof value.C.statusTextEn).toEqual('string');
      expect(typeof value.D).toEqual('object');
      expect(typeof value.D.statusTextEn).toEqual('string');
      expect(typeof value.E).toEqual('object');
      expect(typeof value.E.statusTextEn).toEqual('string');
      expect(typeof value.N).toEqual('object');
      expect(typeof value.N.statusTextEn).toEqual('string');
      done();
    });
  });

});
