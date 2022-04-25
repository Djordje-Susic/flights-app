import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyText'
})
export class EmptyTextPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (value === undefined || value === null) {
      return args[0];
    }

    return value;
  }

}
