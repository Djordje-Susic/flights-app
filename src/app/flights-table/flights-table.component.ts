import { Component, Input, OnInit } from '@angular/core';
import { Flight } from '../shared/models/flight.model';

@Component({
  selector: 'app-flights-table',
  templateUrl: './flights-table.component.html',
  styleUrls: ['./flights-table.component.css']
})
export class FlightsTableComponent implements OnInit {
  @Input() flights!: Flight[];
  @Input() airportMap!: {[key: string]: string};

  constructor() { }

  ngOnInit(): void {
  }

}
