import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

import { Rikishi } from '../models/rikishi';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ErrorService } from './error.service';


@Injectable({
  providedIn: 'root'
})
export class RikishiService {
  constructor(
    private http: HttpClient,
    private error: ErrorService
  ) {}

  getCategorizedRikishi(): Observable<Map<string,Rikishi[]>> {
    return this.http.get<any>(`${environment.dev.serverUrl}/rikishis/categorized`)
    .pipe(
      catchError(this.error.handleError<any>(<any>({})))
    ).pipe(
      map( response => {
        var categorized = new Map<string, Rikishi[]>()
        console.log(`response ${typeof response}:`,response);
        for(let[key,value] of Object.entries<any>(response)) {
          console.log(`${key}:${typeof value}`)
          var array = new Array<Rikishi>()
          value.forEach((element: any) => {
            console.log(`${typeof element}`);
            array.push(<Rikishi>element)
          });
          categorized.set(key,array)
        }
        return categorized
      })
    )
  }
}