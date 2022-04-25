import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { Flight } from './shared/models/flight.model';
import { AirportService } from './shared/services/airport.service';
import { FlydataService } from './shared/services/flydata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Flights';
  airportMap: {[key: string]: string} = {};
  flightsByAirport: {[key: string]: Flight[]} = {};
  selectedAirport: string = 'OSL';
  isLoading = true;

  constructor(
    private flydataService: FlydataService,
    private airportService: AirportService,
  ) { }

  ngOnInit(): void {
    const startTime: Date = new Date;
    forkJoin(
      {
        airportRequest: this.airportService.getMap(),
        flightsRequest: this.flydataService.getAllRelated(this.selectedAirport)
      }
    ).subscribe(
      ({airportRequest, flightsRequest})=> {
        this.airportMap = airportRequest;
        this.flightsByAirport = flightsRequest;

        // console.log(this.flightsByAirport);
        console.log('All airports loaded:', (new Date).getTime() - startTime.getTime(), 'ms');
        this.isLoading = false;
      },
      error => console.log(error)
    );
  }

  onAirportChange(airportCode: string){
    const startTime: Date = new Date;
    this.isLoading = true;
    this.flydataService.getAllRelated(airportCode).subscribe(
      result => {
        this.flightsByAirport = result;
        this.selectedAirport = airportCode;
        this.isLoading = false;
        // console.log(this.flightsByAirport);
        console.log('Airports loaded:', (new Date).getTime() - startTime.getTime(), 'ms');
      },
      error => console.log(error)
    );
  }

  // ngOnInit(): void {
  //   const startTime: Date = new Date;
  //   forkJoin(
  //     [
  //       this.airportService.getAll(),
  //       this.flydataService.getAirportFlightsData(this.selectedAirport)
  //     ]
  //   ).subscribe(responses=> {
  //       for (const airport of responses[0]) {
  //         Object.assign(this.airportMap, {[airport.code]: airport.name})
  //       }

  //       this.flightsByAirport = {[this.selectedAirport]: responses[1]};
  //       this.isLoading = false;
  //       const uniqueCodes = this.flydataService.getUniqueAirportCodesFromFlightArr(this.flightsByAirport[this.selectedAirport]);
  //       const observables = uniqueCodes.reduce((o, key) => ({ ...o, [key]:
  //         // Option 1
  //         // this.flydataService.getAirportFlightsData(key)

  //         // Option 2
  //         this.flydataService.getAirportFlightsData(key)
  //       }), {})

  //       forkJoin(observables).subscribe(responses => {
  //         uniqueCodes.forEach(code => {
  //           Object.assign(this.flightsByAirport, {[code]: responses[code]});
  //         });

  //         // console.log(this.flightsByAirport);

  //         console.log('All airports loaded:', (new Date).getTime() - startTime.getTime(), 'ms');

  //         this.flightsByAirport = {... this.flightsByAirport}
  //       });
  //     }
  //   );
  // }

  // onAirportChange(airportCode: string){
  //   this.flydataService.getAirportFlightsData(airportCode).subscribe(result => {
  //     // this.flightsByAirport = { [airportCode]: result};
  //     // this.selectedAirport = airportCode;
  //     // console.log(airportCode)

  //     const uniqueCodes = this.flydataService.getUniqueAirportCodesFromFlightArr(this.flightsByAirport[airportCode]);

  //     const observables = uniqueCodes.reduce((o, key) => ({ ...o, [key]: this.flydataService.getAirportFlightsData(key)}), {})

  //     forkJoin(observables).subscribe(responses => {
  //       uniqueCodes.forEach(code => {
  //         Object.assign(this.flightsByAirport, {[code]: responses[code]});
  //       });
  //       this.flightsByAirport = { [airportCode]: result};
  //       this.selectedAirport = airportCode;
  //     });

  //   });
  // }
}
