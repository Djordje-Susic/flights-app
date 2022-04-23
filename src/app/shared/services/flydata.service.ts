import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, switchMap, concatMap,  take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as xml2js from 'xml2js';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlydataService {
  public serverUrl = environment.flyDataServer;

  constructor(
    private http: HttpClient
  ) { }

  getAll(airportCode: string) {
    return this.http.get(`${this.serverUrl}/XmlFeed.asp?TimeFrom=1&TimeTo=24&airport=${airportCode}&lastUpdate=2022-04-20T15:00:00Z`, {
      headers: new HttpHeaders().set('Accept', 'text/xml'),
      responseType: 'text'
    }).pipe(
      take(1),
      concatMap(response => this.parseXML(response)),
      map(response => this.parseFlights(response)),
      map(response => this.filterDomesticFlights(response)),
    );
  }

  parseXML(data: string): Promise<any> {
    return new Promise<any>(resolve => {
      const parser = new xml2js.Parser({
        trim: true,
        explicitArray: false
      });
      parser.parseString(data, function (err: any, result: any) {
        resolve(result);
      });
    });
  }

  parseFlights(data: any): Flight[] {
    const arr: Flight[] = [];

    const obj = data.airport.flights;

    for (let k in obj.flight) {
      const item = {
        ...obj.flight[k],
        uniqueID: obj.flight[k].$.uniqueID,
      };
      delete item.$;

      if(obj.flight[k].status){
        item.status = {...obj.flight[k].status.$}
      }

      arr.push(item);
    }

    return arr;
  }

  filterDomesticFlights(data: Flight[]): Flight[] {
    const domestic = data.filter(flight => {
      return flight.dom_int.toUpperCase() == 'D';
    });
    return domestic;
  }

  getUniqueAirportCodesFromFlightArr(flights : Flight[]): Array<string> {
    const arr = flights.map(flight=> {
      return flight.airport;
    });

    return [...new Set(arr)];
  }


}
