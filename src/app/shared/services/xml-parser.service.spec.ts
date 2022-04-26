import { TestBed } from '@angular/core/testing';

import { XmlParserService } from './xml-parser.service';

describe('XmlParserService', () => {
  let service: XmlParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmlParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#parseXML should return value from a promise',
    (done: DoneFn) => {
    service.parseXML(xmlAirportData).then(value => {
      expect(value).toBeTruthy();
      expect(typeof value).toEqual('object');
      done();
    });
  });

  it('#parseXML should return valid data',
    (done: DoneFn) => {
    service.parseXML(xmlAirportData).then(value => {
      expect(value).toBeTruthy();
      expect(typeof value).toEqual('object');
      expect(typeof value.airport).toEqual('object');
      expect(typeof value.airport.$).toEqual('object');
      expect(value.airport.$.name).toEqual('ALF');
      expect(typeof value.airport.flights).toEqual('object');
      expect(Array.isArray(value.airport.flights.flight)).toBeTrue();

      const flightArr = value.airport.flights.flight;

      expect(flightArr.length).toBe(3);

      // Testing first item data
      expect(typeof flightArr[0].$).toEqual('object');
      expect(flightArr[0].$.uniqueID).toEqual('10582499');
      expect(flightArr[0].airline).toEqual('WF');
      expect(flightArr[0].flight_id).toEqual('WF932');
      expect(flightArr[0].schedule_time).toEqual('2022-04-26T09:30:00Z');
      expect(flightArr[0].arr_dep).toEqual('A');
      expect(flightArr[0].airport).toEqual('TOS');
      expect(typeof flightArr[0].status).toEqual('object');
      expect(typeof flightArr[0].status.$).toEqual('object');
      expect(flightArr[0].status.$.code).toEqual('E');
      expect(flightArr[0].status.$.time).toEqual('2022-04-26T09:27:00Z');

      done();
    });
  });
});

let xmlAirportData = `<?xml version="1.0" encoding="iso-8859-1"?>
<airport xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="http://flydata.avinor.no/XmlFeed.xsd"
         name="ALF">
    <flights lastUpdate="2022-04-26T08:55:47Z">
        <flight uniqueID="10582499">
            <airline>WF</airline>
            <flight_id>WF932</flight_id>
            <dom_int>D</dom_int>
            <schedule_time>2022-04-26T09:30:00Z</schedule_time>
            <arr_dep>A</arr_dep>
            <airport>TOS</airport>
            <status code="E" time="2022-04-26T09:27:00Z"/>
        </flight>
        <flight uniqueID="10582039">
            <airline>DY</airline>
            <flight_id>DY320</flight_id>
            <dom_int>D</dom_int>
            <schedule_time>2022-04-26T09:30:00Z</schedule_time>
            <arr_dep>A</arr_dep>
            <airport>OSL</airport>
            <status code="E" time="2022-04-26T09:19:00Z"/>
        </flight>
        <flight uniqueID="10583155">
            <airline>SK</airline>
            <flight_id>SK4546</flight_id>
            <dom_int>D</dom_int>
            <schedule_time>2022-04-26T11:55:00Z</schedule_time>
            <arr_dep>A</arr_dep>
            <airport>OSL</airport>
        </flight>
    </flights>
</airport>`;
