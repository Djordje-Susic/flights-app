import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AirportService } from './shared/services/airport.service';
import { FlydataService } from './shared/services/flydata.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Flights';
  isLoading = true;

  constructor(
    private flydataService: FlydataService,
    private airportService: AirportService,
  ) { }

  ngOnInit(): void {
    forkJoin(
      [
        this.airportService.getAll(),
        this.flydataService.getAll()
      ]
    ).subscribe(responses=> {
        console.log(responses[0]);
        console.log(responses[1]);
        this.isLoading = false;
      }
    );
  }
}
