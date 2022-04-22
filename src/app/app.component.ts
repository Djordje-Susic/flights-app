import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Airport } from './shared/models/airport.model';
import { AirportService } from './shared/services/airport.service';
import { FlydataService } from './shared/services/flydata.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Flights';
  airports: Airport[] = [];
  airportMap: {[key: string]: string} = {};
  selectedAirport: string = 'OSL';
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
        this.airports = responses[0];
        for (const airport of this.airports) {
          Object.assign(this.airportMap, {[airport.code]: airport.name})
        }
        // this.selectedAirport = this.airports[0].code;

        console.log(responses[1]);
        this.isLoading = false;
      }
    );
  }

  onAirportChange(airportCode: string){
    this.selectedAirport = airportCode;
  }
}
