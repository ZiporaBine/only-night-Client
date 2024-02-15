import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HistoryPriceHotel, RevenueData } from './revenue.component';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  hotelId: number = 1;
  roomId: number = 2;
  private historyValues: number[] = [];
  private values: number[] = [];
  private hitoryPrices: HistoryPriceHotel[] = [];

  constructor(private http: HttpClient) {
    this.getDots();
  }
  getdots$(): Observable<RevenueData> {
    // const url = 'http://localhost:3030/options/dots'
    const url = `http://dashboard.onlynight.com:8001/api/search_opportunities/prices/?hotel_id=${this.hotelId}&room_id=${this.roomId}`
    const data = this.http.get<RevenueData>(url);
    // console.log(data);
    return data;
  }
  getDots() {
    let vals: number[] = [];
    this.getdots$().pipe(
      // tap(({CurrentPriceHotel})=> console.log(CurrentPriceHotel)),

      map(({ CurrentPriceHotel, HistoryPriceHotel }) => {
        this.values = CurrentPriceHotel,
          this.hitoryPrices = HistoryPriceHotel,
          this.historyValues = this.hitoryPrices[0].HistoryPriceHotel
        vals = CurrentPriceHotel
        // console.log(this.values);
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
  setValues(hotelId:number, roomId:number) {
    // console.log(hotelId, roomId);
    this.hotelId = hotelId;
    this.roomId = roomId;
    // console.log(this.hotelId, this.roomId);
    this.getDots();
  }
}
