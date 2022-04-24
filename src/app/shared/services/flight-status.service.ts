import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightStatusService {

  getMap(){
    return of(this.flightStatusMap);
  }

  private flightStatusMap = {
    'N': 'New info',
    'E': 'New time',
    'D': 'Departed',
    'A': 'Arrived',
    'C': 'Cancelled',
  }
}
