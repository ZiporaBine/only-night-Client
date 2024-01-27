import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // get(url: string, args: any = {}): Observable<any> {
  //   let params = new URLSearchParams();

  //   for (let key in args) {
  //     params.set(key, args[key])
  //   }

  //   return this.http.get(`/api/${url}?${params.toString()}`, {
  //     headers: new HttpHeaders(
  //       {
  //         'Authorization': `Bearer ${this.authContext.token}`
  //       }
  //     )
  //   });
  // }

  // post(url: string, data: any = {}): Observable<any> {
  //   return this.http.post(`/api/${url}`, data, {
  //     headers: new HttpHeaders(
  //       {
  //         'Authorization': `Bearer ${this.authContext.token}`
  //       }
  //     )
  //   });
  // }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('/api/account/login', {
      username: username,
      password: password
    });
    // .pipe(
    // catchError(this.handleError('addHero', hero))
    // );
  }
}
