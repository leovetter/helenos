import { Pipe, PipeTransform } from '@angular/core';
import { Result } from '../model/result.model';

@Pipe({
  name: 'filterResults'
})
export class FilterResultsPipe implements PipeTransform {

  transform(results: Result[], ...args: any[]): any {

    return results !== null ? results.filter(result => result.type === args[0]).slice(0, 3) : [];
  }

}
