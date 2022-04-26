import { TestBed } from '@angular/core/testing';

import { AirportService } from './airport.service';

describe('AirportService', () => {
  let service: AirportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAll should return array',
    (done: DoneFn) => {
    service.getAll().subscribe(airports => {
      expect(Array.isArray(airports)).toBeTrue();
      done();
    });
  });

  it('airport array should have elements',
    (done: DoneFn) => {
    service.getAll().subscribe(airports => {
      expect(airports.length > 0).toBeTrue();
      done();
    });
  });

  it('#getAll should return valid airport data',
    (done: DoneFn) => {
    service.getAll().subscribe(airports => {
      airports.forEach(airport => {
        expect(typeof airport.code).toEqual('string');
        expect(typeof airport.name).toEqual('string');
      });
      done();
    });
  });

  it('#getMap should return object',
    (done: DoneFn) => {
    service.getMap().subscribe(airportMap => {
      expect(typeof airportMap).toEqual('object');
      done();
    });
  });

  it('map object should have keys',
    (done: DoneFn) => {
    service.getMap().subscribe(airportMap => {
      expect(Object.keys(airportMap).length > 0).toBeTrue();
      done();
    });
  });

  it('#getMap should return valid status map data',
    (done: DoneFn) => {
    service.getMap().subscribe(airportMap => {
      for(let key in airportMap){
        expect(typeof key).toEqual('string');
        expect(typeof airportMap[key]).toEqual('string');
      }
      done();
    });
  });

});
