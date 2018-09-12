import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], roomNumber: string): any[] {
    if(!items) return [];
    if(!roomNumber) return items;
    if(roomNumber === "showAll") return items;

    roomNumber = roomNumber.toLowerCase();

    return items.filter(function(item){
      return item.roomNumber.toLowerCase().includes(roomNumber.toLowerCase());
    })
   }
}