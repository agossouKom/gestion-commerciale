import { Pipe, PipeTransform, Injectable } from "@angular/core";

@Pipe({
  name: 'customFilter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter((it) => {
      
      return it.name.toString().includes(searchText);
     // return it.name.toLowerCase().includes(searchText);
    });
  }
  static filter(
    items: Array<{ [key: string]: any }>,
    term: string,
    excludes: any
  ): Array<{ [key: string]: any }> {
   const toCompare = term.toLowerCase();
    //const toCompare = term;
    function checkInside(item: any, term: string) {
      if (
        typeof item === "string" &&
        item
          .toString()
         // .toLowerCase()
          .includes(toCompare)
      ) {
        return true;
      }

      for (let property in item) {
        if (
          item[property] === null ||
          item[property] == undefined ||
          excludes.includes(property)
        ) {
          continue;
        }

        if (typeof item[property] === "object") {
          if (checkInside(item[property], term)) {
            return true;
          }
        } else if (
          item[property]
            .toString()
           // .toLowerCase()
            .includes(toCompare)
        ) {
          return true;
        }
      }
      return false;
    }

    return items.filter(function (item) {
      return checkInside(item, term);
    });
  }
}
