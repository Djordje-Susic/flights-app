import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';

import { faPlaneArrival, faPlaneDeparture, faPlaneCircleExclamation, faPlaneCircleXmark, faClock } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class FlightStatusService {

  getMap(){
    return of(this.flightStatusMap).pipe(take(1));
  }

  private flightStatusMap = {
    'N': {statusTextEn: 'New info', icon: faPlaneCircleExclamation},
    'E': {statusTextEn:'New time', icon: faClock},
    'D': {statusTextEn:'Departed', icon: faPlaneDeparture},
    'A': {statusTextEn:'Arrived', icon: faPlaneArrival},
    'C': {statusTextEn:'Cancelled', icon: faPlaneCircleXmark},
  }
}
