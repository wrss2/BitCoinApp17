import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'textTransform',
  standalone: true
})
export class TextTransformPipe implements PipeTransform {
  transform(value: any): string {
    return value.replace(/_/g, ' ')
  }

}
