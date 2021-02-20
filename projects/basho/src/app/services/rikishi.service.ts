import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

import { Rikishi } from '../models/rikishi';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, flatMap, map, tap, mergeMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ErrorService } from './error.service';


@Injectable({
  providedIn: 'root'
})
export class RikishiService {
  constructor(
    private http: HttpClient,
    private error: ErrorService
  ) {
    this.http.get<any>(`${environment.dev.serverUrl}/rikishis`)
      .pipe(
        catchError(this.error.handleError<any>(<any>({})))
      ).pipe(
        map( response => {
          for(let[key,value] of Object.entries<any>(response)) {
            this.Rikishis.set(`${value.ID}`,value)
          }
          return this.Rikishis
        })
      ).subscribe( rikishis => {
        this.Rikishis = rikishis;
        this.Rikishis$.next(rikishis);
      })
  }

  private Rikishis: Map<string,Rikishi> = new Map;
  private Rikishis$: BehaviorSubject<Map<string,Rikishi>> = new BehaviorSubject( new Map<string,Rikishi>());
  private CategorizedRikishisLoaded: boolean = false;
  private CategorizedRikishis: Map<string,Rikishi[]> = new Map;
  private Team: Map<string,Rikishi> = new Map;
  private TeamLoaded: boolean = false;

  saveTeam(team: Map<string,Rikishi>) : Observable<boolean> {
    console.log("saveTeam:",team.entries())
    
    var body: string = "{";
    var first: boolean = true;
    Array.from(team.entries()).forEach(element => {
      if(!first) {
        body += ",";
      } else {
        first = false;
      }
      body += `"${element[0]}":${element[1].ID}`
    });
    body += "}";
    console.log("saveTeam:",body);
    return this.http.put<Map<string,Rikishi>>(`${environment.dev.serverUrl}/teams`, body)
     .pipe(
      catchError(this.error.handleError<any>(<any>({})))
     )
  }

  getTeam() : Observable<Map<string, Rikishi>> {
    return this.getRikishi().pipe(
      mergeMap(rikishis => {
        return this.http.get<any>(`${environment.dev.serverUrl}/teams`)
        .pipe(
          catchError(this.error.handleError<any>(<any>({})))
        ).pipe(
          map(response => {
            for(let[key,value] of Object.entries<any>(response)) {
                var cur = rikishis.get(`${parseInt(value)}`);
                if(cur === undefined) {
                  console.error(`invalid rikishi id '${value}' found in team`)
                } else {
                  this.Team.set(key,cur)
                }
            }
            this.TeamLoaded = true;
            return this.Team;
          }));
      }));

  }

  getRikishi(): Observable<Map<string,Rikishi>> {
    return this.Rikishis$.asObservable()
  }

  getCategorizedRikishi(): Observable<Map<string,Rikishi[]>> {
    if(this.CategorizedRikishisLoaded) {
      return new Observable<Map<string,Rikishi[]>>((observer) => {
        observer.next(this.CategorizedRikishis)
      })
    } 
    return this.getRikishi().pipe(
      mergeMap(rikishis => {
        return this.http.get<any>(`${environment.dev.serverUrl}/rikishis/categorized`)
        .pipe(
          catchError(this.error.handleError<any>(<any>({})))
        ).pipe(
          map(response => {
            for(let[key,value] of Object.entries<any>(response)) {
              var array = new Array<Rikishi>()
              value.forEach((element: string) => {

                var cur = rikishis.get(`${parseInt(element)}`);
                if(cur === undefined) {
                  console.error(`invalid rikishi id '${element}' found in categorized rikishis`)
                } else {
                  array.push(cur)
                }
              });
              this.CategorizedRikishis.set(key,array)
            }
            this.CategorizedRikishisLoaded = true;
            return this.CategorizedRikishis;
          }));
      }));

    return this.http.get<any>(`${environment.dev.serverUrl}/rikishis/categorized`)
    .pipe(
      catchError(this.error.handleError<any>(<any>({})))
    ).pipe(
      map( response => {
        var categorized = new Map<string, Rikishi[]>()
        for(let[key,value] of Object.entries<any>(response)) {
          var array = new Array<Rikishi>()
          value.forEach((element: any) => {
            element.Rank = "Maegashira 17";
            array.push(<Rikishi>element)
          });
          categorized.set(key,array)
        }
        return categorized
      })
    )
  }
}