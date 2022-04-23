import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Flight } from '../shared/models/flight.model';

@Component({
  selector: 'app-flights-table',
  templateUrl: './flights-table.component.html',
  styleUrls: ['./flights-table.component.css']
})
export class FlightsTableComponent implements OnInit, OnChanges {
  @Input() flights!: {[key: string]: Flight[]};
  @Input() selectedAirportCode!: string;
  @Input() airportMap!: {[key: string]: string};

  data: any = []

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.data = this.flights[this.selectedAirportCode].map(flight => {
      let departure_schedule_time, arrival_schedule_time;

      const otherTime = this.flights[flight.airport].find(elem => {
        return elem.flight_id === flight.flight_id;
      })?.schedule_time;

      if(flight.arr_dep === 'D') {
        arrival_schedule_time = otherTime;
        departure_schedule_time = flight.schedule_time;
      }else if(flight.arr_dep === 'A'){
        arrival_schedule_time = flight.schedule_time;
        departure_schedule_time = otherTime;
      }

      return {
        ...flight,
        departure_schedule_time,
        arrival_schedule_time
      }
    });
  }

}
