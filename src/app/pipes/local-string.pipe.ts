import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localString',
  standalone: true
})
export class LocalStringPipe implements PipeTransform {

  transform(value: any,digitAfterComma: number = 2): string {
      return value.toLocaleString('en-US',{
          minimumFractionDigits: digitAfterComma,
          maximumFractionDigits: digitAfterComma
      }).replace(/,/g, ' ')

  }

}
