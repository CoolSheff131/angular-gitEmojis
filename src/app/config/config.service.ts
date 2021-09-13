import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

  configUrl = 'https://api.github.com/emojis ';

  getConfig(): Observable<Array<any>> {
    let emojis = this.http.get<any>(this.configUrl)
    return this.getPageItems(emojis)
  }

  private getPageItems(emojis: Observable<any>): Observable<Array<any>> {
    return emojis.pipe(
      map(e => {
        let arr = []
        for (const [key, value] of Object.entries(e)) {
          let emoji = { name: key, url: value }
          arr.push(emoji)
        }
        return arr
      })
    )
  }
}