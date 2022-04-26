import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { Flight } from './shared/models/flight.model';
import { AirlineService } from './shared/services/airline.service';
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
    private airlineService : AirlineService
  ) { }

  ngOnInit(): void {
    const startTime: Date = new Date;
    forkJoin(
      {
        airportRequest: this.airportService.getMap(),
        flightsRequest: this.flydataService.getAllRelated(this.selectedAirport),
        airlinesRequest: this.airlineService.getMap()
      }
    ).subscribe(
      ({airportRequest, flightsRequest})=> {
        this.airportMap = airportRequest;
        this.flightsByAirport = flightsRequest;

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

        console.log('Airports loaded:', (new Date).getTime() - startTime.getTime(), 'ms');
      },
      error => console.log(error)
    );
  }
}
