import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { FlydataService } from './flydata.service';
import { XmlParserService } from './xml-parser.service';

describe('FlydataService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: FlydataService;
  let xmlParserService: XmlParserService;

  const flightsXml = `
    <?xml version="1.0" encoding="iso-8859-1"?>
    <airport xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:noNamespaceSchemaLocation="http://flydata.avinor.no/XmlFeed.xsd"
            name="BDU">
        <flights lastUpdate="2022-04-26T11:53:37Z">
            <flight uniqueID="10582719">
                <airline>SK</airline>
                <flight_id>SK393</flight_id>
                <dom_int>D</dom_int>
                <schedule_time>2022-04-26T14:30:00Z</schedule_time>
                <arr_dep>A</arr_dep>
                <airport>OSL</airport>
                <status code="A" time="2022-04-26T14:32:00Z"/>
            </flight>
            <flight uniqueID="10582731">
                <airline>SK</airline>
                <flight_id>SK396</flight_id>
                <dom_int>D</dom_int>
                <schedule_time>2022-04-26T15:00:00Z</schedule_time>
                <arr_dep>D</arr_dep>
                <airport>OSL</airport>
            </flight>
            <flight uniqueID="10585229">
                <airline>SK</airline>
                <flight_id>SK392</flight_id>
                <dom_int>D</dom_int>
                <schedule_time>2022-04-27T04:30:00Z</schedule_time>
                <arr_dep>D</arr_dep>
                <airport>OSL</airport>
            </flight>
            <flight uniqueID="10585228">
                <airline>SK</airline>
                <flight_id>SK391</flight_id>
                <dom_int>D</dom_int>
                <schedule_time>2022-04-27T08:45:00Z</schedule_time>
                <arr_dep>A</arr_dep>
                <airport>OSL</airport>
            </flight>
            <flight uniqueID="10585233">
                <airline>SK</airline>
                <flight_id>SK394</flight_id>
                <dom_int>D</dom_int>
                <schedule_time>2022-04-27T09:15:00Z</schedule_time>
                <arr_dep>D</arr_dep>
                <airport>OSL</airport>
            </flight>
        </flights>
    </airport>
  `;

  const expectedFlights: any = [
    {
      airline: "SK",
  ​​    airport: "OSL",
      arr_dep: "A",
      dom_int: "D",
      flight_id: "SK393",
      schedule_time: "2022-04-26T14:30:00Z",
      uniqueID: "10582719",
      status: {
        code: "A",
        time: "2022-04-26T14:32:00Z"
      }
    },
    {
      airline: "SK",
      airport: "OSL",
      arr_dep: "D",
      dom_int: "D",
      flight_id: "SK396",
      schedule_time: "2022-04-26T15:00:00Z",
      uniqueID: "10582731",
    },
    {
      airline: "SK",
      airport: "OSL",
      ​​arr_dep: "D",
      ​​dom_int: "D",
      ​​flight_id: "SK392",
      ​​schedule_time: "2022-04-27T04:30:00Z",
      ​​uniqueID: "10585229",
    },
    {
      airline: "SK",
      ​​airport: "OSL",
      ​​arr_dep: "A",
      ​​dom_int: "D",
      ​​flight_id: "SK391",
      ​​schedule_time: "2022-04-27T08:45:00Z",
      ​​uniqueID: "10585228",
    },
    {
      airline: "SK",
      ​​airport: "OSL",
      ​​arr_dep: "D",
      ​​dom_int: "D",
      ​​flight_id: "SK394",
      ​​schedule_time: "2022-04-27T09:15:00Z",
      ​​uniqueID: "10585233",
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    xmlParserService = TestBed.inject(XmlParserService);
    service = new FlydataService(httpClientSpy, xmlParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAll should return flights airlines array (HttpClient called once)', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(flightsXml));

    service.getAirportFlightsData('BDU').subscribe({
      next: airlines => {
        expect(airlines)
          .withContext('expected airlines')
          .toEqual(expectedFlights);
        done();
      },
      error: done.fail
    });

    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('#getUniqueAirportCodesFromFlightArr should return unique airport codes from flights array', () => {
    const flightsArr: any = [... expectedFlights];

    flightsArr[1] = {...flightsArr[1], airport: 'ALF'};
    flightsArr[3] = {...flightsArr[3], airport: 'AAG'};

    expect(service.getUniqueAirportCodesFromFlightArr(flightsArr)).toEqual(['OSL', 'ALF', 'AAG']);
  });

  it('#filterDomesticFlights should return only domestic flights', () => {
    const flightsArr: any = [... expectedFlights];

    flightsArr[1] = {...flightsArr[1], dom_int: 'I'};
    flightsArr[3] = {...flightsArr[3], dom_int: 'S'};

    expect(service.filterDomesticFlights(flightsArr).length).toEqual(3);
  });
});
