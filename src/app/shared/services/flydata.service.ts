import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, switchMap, concatMap,  take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as xml2js from 'xml2js';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlydataService {
  public serverUrl = environment.flyDataServer;
  ;

  constructor(
    private http: HttpClient
  ) { }

  getAll(airportCode: string) {
    return this.http.get(`${this.serverUrl}/XmlFeed.asp?TimeFrom=1&TimeTo=24&airport=${airportCode}&lastUpdate=2022-04-20T15:00:00Z`, {
      headers: new HttpHeaders().set('Accept', 'text/xml'),
      responseType: 'text'
    }).pipe(
      take(1),
      concatMap(response => this.parseXML(response))
    );
  }

  // store xml data into array variable
  parseXML(data: string) {
    return new Promise<Flight[]>(resolve => {
      let
        k: string | number,
        arr: Flight[] = [],
        parser = new xml2js.Parser({
            trim: true,
            explicitArray: false
          });
      parser.parseString(data, function (err: any, result: any) {
        // resolve(result);

        const obj = result.airport.flights;

        // console.log(result);
        for (k in obj.flight) {
          const item = {
            ...obj.flight[k],
            uniqueID: obj.flight[k].$.uniqueID,
          };
          delete item.$;
          arr.push(item);
        }
        //console.log(arr);
        // TODO refactor
        const domestic = arr.filter(flight => {
          return flight.dom_int == 'D';
        });
        resolve(domestic);
      });
    });
  }
}
