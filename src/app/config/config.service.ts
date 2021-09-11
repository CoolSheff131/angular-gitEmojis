import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';




@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }

    configUrl = 'https://api.github.com/emojis ';

    getConfig(): Observable<any> {
        return this.http.get<any>(this.configUrl)

    }
}