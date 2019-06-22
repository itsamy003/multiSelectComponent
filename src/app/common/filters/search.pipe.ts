import { Pipe, PipeTransform } from '@angular/core';
import { ValueTransformer } from '@angular/compiler/src/util';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let filteredItems: any;
    if ( value && value.length  > 0 && args) {
      filteredItems = value.filter( (obj) => {
        return (obj.name.indexOf(args) !== -1);
      });
      return filteredItems;
    } else {
      return value;
    }
  }
}
