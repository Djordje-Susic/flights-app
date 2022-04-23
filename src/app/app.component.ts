import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Airport } from './shared/models/airport.model';
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
  //airports: Airport[] = [];
  airportMap: {[key: string]: string} = {};
  selectedAirport: string = 'OSL';
  flightsByAirport: {[key: string]: Flight[]} = {};
  isLoading = true;

  constructor(
    private flydataService: FlydataService,
    private airportService: AirportService,
  ) { }

  ngOnInit(): void {
    forkJoin(
      {
        airportRequest: this.airportService.getAll(),
        flightsRequest: this.flydataService.getAllRelated(this.selectedAirport)
      }
    ).subscribe(
      ({airportRequest, flightsRequest})=> {
        for (const airport of airportRequest) {
          Object.assign(this.airportMap, {[airport.code]: airport.name})
        }

        this.flightsByAirport = flightsRequest;

        // console.log(this.flightsByAirport);

        this.isLoading = false;
      },
      error => console.log(error)
    );
  }

  onAirportChange(airportCode: string){
    this.isLoading = true;
    this.flydataService.getAllRelated(airportCode).subscribe(
      result => {
        this.flightsByAirport = result;
        this.selectedAirport = airportCode;
        this.isLoading = false;
        // console.log(this.flightsByAirport);
      },
      error => console.log(error)
    );
  }

  // ngOnInit(): void {
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

  //       const uniqueCodes = this.flydataService.getUniqueAirportCodesFromFlightArr(this.flightsByAirport[this.selectedAirport]);
  //       const observables = uniqueCodes.reduce((o, key) => ({ ...o, [key]: this.flydataService.getAirportFlightsData(key)}), {})

  //       forkJoin(observables).subscribe(responses => {
  //         uniqueCodes.forEach(code => {
  //           Object.assign(this.flightsByAirport, {[code]: responses[code]});
  //         });

  //         // console.log(this.flightsByAirport);

  //         this.isLoading = false;
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
