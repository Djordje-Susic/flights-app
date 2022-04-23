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
  flights: Flight[] = [];
  isLoading = true;

  constructor(
    private flydataService: FlydataService,
    private airportService: AirportService,
  ) { }

  ngOnInit(): void {
    forkJoin(
      [
        this.airportService.getAll(),
        this.flydataService.getAll(this.selectedAirport)
      ]
    ).subscribe(responses=> {
        for (const airport of responses[0]) {
          Object.assign(this.airportMap, {[airport.code]: airport.name})
        }

        this.flights = responses[1];

        console.log(this.flydataService.getUniqueAirportCodesFromFlightArr(this.flights))

        this.isLoading = false;
      }
    );
  }

  onAirportChange(airportCode: string){
    this.selectedAirport = airportCode;
    this.flydataService.getAll(this.selectedAirport).subscribe(result => {
      this.flights = result;
    });
  }
}
