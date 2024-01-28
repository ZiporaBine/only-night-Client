import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RevenueData } from './revenue.component';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  constructor(private http: HttpClient) { }

  getdots$(): Observable<RevenueData> {
    const url = 'http://127.0.0.1:8000/api/search_opportunities/prices?hotel_id=1&room_id=2'
    const data = this.http.get<RevenueData>(url);
    // console.log(data);
    return data;
  }
}
