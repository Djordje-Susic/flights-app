import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription, of, forkJoin, Observable } from 'rxjs';
import { map, mergeMap, switchMap, concatMap,  take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Flight } from '../models/flight.model';
import { XmlParserService } from './xml-parser.service';

@Injectable({
  providedIn: 'root'
})
export class FlydataService {

  constructor(
    private http: HttpClient,
    private xmlParserService: XmlParserService,
  ) { }

  private gerUrl(airportCode: string): string{
    return `${environment.flyDataServer}/XmlFeed.asp?TimeFrom=1&TimeTo=24&airport=${airportCode}&lastUpdate=${new Date().toISOString().substr(0,10)}`;
  }

  getAirportFlightsData(airportCode: string){
    return this.http.get(this.gerUrl(airportCode), {
      headers: new HttpHeaders().set('Accept', 'text/xml'),
      responseType: 'text'
    }).pipe(
      take(1),
      concatMap(response => this.xmlParserService.parseXML(response)),
      map(response => this.parseFlights(response)),
      map(response => this.filterDomesticFlights(response)),
    );
  }

  getAirportFlightsDataWithWebWorker(airportCode: string): Observable<any>{
    return new Observable(subscriber => {
      const worker = new Worker(new URL('../../workers/fetch.worker', import.meta.url));
      worker.onmessage = ({ data }) => {
        subscriber.next(data);
        subscriber.complete();
        worker.terminate();
      }
      worker.postMessage(this.gerUrl(airportCode));
    }).pipe(
      concatMap(response => this.xmlParserService.parseXML(<string>response)),
      map(response => this.parseFlights(response)),
      map(response => this.filterDomesticFlights(response)),
    );
  }

  getAllRelated(airportCode: string){
    return this.getAirportFlightsDataWithWebWorker(airportCode).pipe(
      take(1),
      map(response => {
        return {
          [airportCode]: response
        };
      }),
      mergeMap(response => {
        const uniqueAirportCodes = this.getUniqueAirportCodesFromFlightArr(response[airportCode]);

        if(uniqueAirportCodes.length === 0){
          return of(response);
        }

        const observables = uniqueAirportCodes.reduce((o, key) => ({ ...o, [key]: this.getAirportFlightsDataWithWebWorker(key)}), {})

        return forkJoin(observables).pipe(map(responses => {
          uniqueAirportCodes.forEach(code => {
            Object.assign(response, {[code]: responses[code]});
          });
          return response;
        }));
      })
    );
  }

  private parseFlights(data: any): Flight[] {
    const arr: Flight[] = [];

    const obj = data.airport.flights;

    // When there is no flights return empty array
    if(obj.flight === undefined){
      return arr;
    }

    // When only one flight is present obj.flight will be of type object instead of array
    // I convert it to array so further code doesn't break
    if(!Array.isArray(obj.flight)){
      obj.flight = [obj.flight];
    }

    // proccess array of flights
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
    const arr = flights.map(({airport})=> airport);

    return [...new Set(arr)];
  }
}
