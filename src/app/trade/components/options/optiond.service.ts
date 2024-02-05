import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
// import {} from 'types';
import { HotelsElement, Result, IOptionResult } from './options.component';

@Injectable({
  providedIn: 'root'
})

export class OptionsService {

  constructor(private http: HttpClient) { }

  getoptions$(): Observable<Result> {
    const url = 'http://localhost:3030/options'
    // const url = 'http://127.0.0.1:8000/api/search_opportunities/opportunities'
    const data = this.http.get<Result>(url);
    return data;

  }

}
