import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: true
})
export class SortPipe implements PipeTransform {

  transform(list: any[], column: string): any[] {
    let sortedArray = list.sort((a,b)=> {
      column = (column != undefined) ? column.toLowerCase() : "";

      if(a[column] > b[column]){
        return 1;
      }
      else if (a[column] < b[column]) {
        return -1
      }

      return 0;
    });

    return sortedArray;
  }

}
