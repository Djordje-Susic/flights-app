import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrDep'
})
export class ArrDepPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch(value) {
      case 'A':
        return 'Arrival';
      case 'D':
        return 'Departure';
      default:
        return value;
    }
  }

}
