import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMap, map, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Airline } from '../models/airline.model';
import { XmlParserService } from './xml-parser.service';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {

  private airlines?: Airline[];

  constructor(
    private http: HttpClient,
    private xmlParserService: XmlParserService,
  ) { }

  getAll(): Observable<Airline[]>{
    return this.airlines ?
      of(this.airlines) :
      this.getAllFromServer();
  }

  getMap(): Observable<{[key: string]: string}>{
    return this.getAll().pipe(
      map(airlines => {
        return airlines.reduce((o, airline)=> ({...o, [airline.code.toUpperCase()]: airline.name}), {})
      })
    );
  }

  private getAllFromServer(){
    return this.http.get(`${environment.flyDataServer}/airlineNames.asp`, {
      headers: new HttpHeaders().set('Accept', 'text/xml'),
      responseType: 'text'
    }).pipe(
      take(1),
      concatMap(response => this.xmlParserService.parseXML(response)),
      map(response => this.parseAirlines(response)),
      tap(response => {this.airlines = response})
    );
  }

  parseAirlines(data: any): Airline[] {
    const arr: Airline[] = [];

    const obj = data.airlineNames;

    // proccess array of airlines
    for (let item in obj.airlineName) {
      const airline = {
        ...obj.airlineName[item].$,
      };

      arr.push(airline);
    }
    return arr;
  }
}
