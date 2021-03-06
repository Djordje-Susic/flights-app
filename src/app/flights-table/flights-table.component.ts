import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FlightDirectionCode } from '../shared/enums/flight-direction-code';
import { Flight } from '../shared/models/flight.model';
import { AirlineService } from '../shared/services/airline.service';
import { AirportService } from '../shared/services/airport.service';
import { FlightStatusService } from '../shared/services/flight-status.service';

@Component({
  selector: 'app-flights-table',
  templateUrl: './flights-table.component.html',
  styleUrls: ['./flights-table.component.css']
})
export class FlightsTableComponent implements OnInit, OnChanges {
  @Input() flights!: {[key: string]: Flight[]};
  @Input() selectedAirportCode!: string;
  airportMap: {[key: string]: string} = {};
  flightStatusMap: {[key: string]: {statusTextEn: string, icon: any}} = {};
  airlineMap: {[key: string]: string} = {};

  data: any = []

  constructor(
    private airportService : AirportService,
    private flightStatusService : FlightStatusService,
    private airlineService : AirlineService
  ) { }

  ngOnInit(): void {
    this.airportService.getMap().subscribe(data => {this.airportMap = data});
    this.flightStatusService.getMap().subscribe(data => {this.flightStatusMap = data});
    this.airlineService.getMap().subscribe(data => {this.airlineMap = data});
  }

  ngOnChanges(): void {
    this.data = this.flights[this.selectedAirportCode].map(flight => {
      let departure_schedule_time, arrival_schedule_time;

      const otherTime = this.flights[flight.airport]?.find(elem => {
        return (
          elem.flight_id === flight.flight_id &&
          elem.arr_dep !== flight.arr_dep
        );
      })?.schedule_time;

      if(flight.arr_dep === FlightDirectionCode.DEPARTURE) {
        arrival_schedule_time = otherTime;
        departure_schedule_time = flight.schedule_time;
      }else if(flight.arr_dep === FlightDirectionCode.ARRIVAL){
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
