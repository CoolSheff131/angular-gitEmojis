import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Page } from '../emoji-table/page';




@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

    configUrl = 'https://api.github.com/emojis ';

    getConfig(page:number, itemsPerPage:number): Observable<Page> {
        var emojis = this.http.get<any>(this.configUrl)
        return this.getPageItems(emojis, page, itemsPerPage)
    }

    private getPageItems(emojis:Observable<any>,page:number, itemsPerPage:number): Observable<Page> {
      return emojis.pipe(
        map(e => {
          let arr = []
          for (const [key, value] of Object.entries(e)) {
            let val = typeof value === 'string'
            ? value
            : undefined
            let emoji = {name:key,url: val }
            arr.push(emoji)
          }

          console.log(arr)
          var startIndex = itemsPerPage * (page - 1)
          return new Page(arr.length,arr.slice(startIndex, startIndex + itemsPerPage))
        })
      )
    }
}