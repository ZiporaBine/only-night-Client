import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loggedIn$ = new BehaviorSubject<boolean>(true);

  loggedIn$ = this._loggedIn$.asObservable();

  constructor(private apiService: ApiService) {
    const token = localStorage.getItem('auth');

    // this._loggedIn$.next(!!token);
  }

  login(username: string, password: string) {
    return this.apiService.login(username, password).pipe(
      tap((response: any) => {
        localStorage.setItem('auth', response.token);
        this._loggedIn$.next(true);
      })
    )
  }
}
