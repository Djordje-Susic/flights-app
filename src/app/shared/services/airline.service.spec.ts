import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AirlineService } from './airline.service';
import { XmlParserService } from './xml-parser.service';

describe('AirlineService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: AirlineService;
  let xmlParserService: XmlParserService;
  const airlineNames = `
    <?xml version="1.0" encoding="iso-8859-1"?>
    <airlineNames xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://flydata.avinor.no/airlineNames.xsd">
        <airlineName code="AA" name="American Airlines"/>
        <airlineName code="AAF" name="Aigle Azur"/>
        <airlineName code="AAG" name="Atlantic Airlines"/>
        <airlineName code="AAT" name="Austrian Airtransport"/>
        <airlineName code="AB" name="Air Berlin"/>
    </airlineNames>
  `;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    xmlParserService = TestBed.inject(XmlParserService);
    service = new AirlineService(httpClientSpy, xmlParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAll should return expected airlines array (HttpClient called once)', (done: DoneFn) => {
    const expectedAirlines = [
      { code: 'AA', name: 'American Airlines' },
      { code: 'AAF', name: 'Aigle Azur' },
      { code: 'AAG', name: 'Atlantic Airlines' },
      { code: 'AAT', name: 'Austrian Airtransport' },
      { code: 'AB', name: 'Air Berlin' },
    ];

    httpClientSpy.get.and.returnValue(of(airlineNames));

    service.getAll().subscribe({
      next: airlines => {
        expect(airlines)
          .withContext('expected airlines')
          .toEqual(expectedAirlines);
        done();
      },
      error: done.fail
    });

    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('#getMap should return expected airlines array (HttpClient called once)', (done: DoneFn) => {
    const expectedAirlines = {
      'AA': 'American Airlines',
      'AAF': 'Aigle Azur',
      'AAG': 'Atlantic Airlines',
      'AAT': 'Austrian Airtransport',
      'AB': 'Air Berlin',
    };

    httpClientSpy.get.and.returnValue(of(airlineNames));

    service.getMap().subscribe({
      next: airlines => {
        expect(airlines)
          .withContext('expected airlines')
          .toEqual(expectedAirlines);
        done();
      },
      error: done.fail
    });

    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });
});
