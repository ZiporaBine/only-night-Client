import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HistoryPriceHotel, IRevenueData, RevenueData } from './revenue.component';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  hotelId: number = 1;
  private historyValues: number[] = [];
  private values: number[] = [];
  private hitoryPrices: number[] = [];

  constructor(private http: HttpClient) {
    this.getDots();
  }

  getdots$(): Observable<IRevenueData> {
    // const url = 'http://localhost:3030/options/dots'
    const url = `http://dashboard.onlynight.com:8001/api/search_opportunities/prices/?hotel_id=${this.hotelId}`
    const data = this.http.get<IRevenueData>(url);
    // console.log(data);
    return data;
  }
  getDots() {
    this.getdots$().pipe(
      // tap(({CurrentPriceHotel})=> console.log(CurrentPriceHotel)),
      map(({ CurrentPriceHotel, HistoryPriceHotel }) => {
        // this.values = CurrentPriceHotel[0].Values.map(({Price})=> Price),
        CurrentPriceHotel.forEach(({ Values }) => this.values = [...this.values, Values[0].Price])
        this.hitoryPrices = HistoryPriceHotel,
        this.historyValues = this.hitoryPrices
        return this.values
        // console.log(CurrentPriceHotel);
      })
    ).subscribe()
  }
  get CurrentValues(): any[] {
    return this.values
  }
  get hitoryValues(): any[] {
    return this.historyValues
  }
  setValues(hotelId: number) {
    this.hotelId = hotelId;
    // console.log(this.hotelId);
    this.getDots();
  }
}
