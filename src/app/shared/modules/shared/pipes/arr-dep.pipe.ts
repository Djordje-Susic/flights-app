import { Pipe, PipeTransform } from '@angular/core';
import { FlightDirectionCode } from 'src/app/shared/enums/flight-direction-code';

@Pipe({
  name: 'arrDep'
})
export class ArrDepPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch(value) {
      case FlightDirectionCode.ARRIVAL:
        return 'Arrival';
      case FlightDirectionCode.DEPARTURE:
        return 'Departure';
      default:
        return value;
    }
  }

}
