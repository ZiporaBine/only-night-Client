import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HistoryPriceHotel, IRevenueData } from './revenue.component';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {

  hotelId: number = 1;
  private historyValues: number[] = [];
  private values: number[] = [];
  private hitoryPrices: number[] = [];
  private HistoryPricesHotel: HistoryPriceHotel[] = []
  dataChangeEvent: EventEmitter<any> = new EventEmitter() || null;


  constructor(private http: HttpClient) {
    this.getDots();
  }

  getdots$(): Observable<IRevenueData> {
    const url = `http://dashboard.onlynight.com:8001/api/search_opportunities/prices/${this.hotelId}`
    const data = this.http.get<IRevenueData>(url);
    return data;
  }
  getDots() {
    if (this.hotelId > 10) {
      this.getdots$().pipe(
        map(({ CurrentPriceHotel, HistoryPriceHotel }) => {
          // this.values = CurrentPriceHotel[0].Values.map(({Price})=> Price),
          CurrentPriceHotel.forEach(({ Values }) => this.values = [...this.values, Values[0].Price])
          this.HistoryPricesHotel = HistoryPriceHotel
          this.hitoryPrices = HistoryPriceHotel[0].Values,
            this.historyValues = this.hitoryPrices
            this.dataChangeEvent.next('');
          return this.values
        })
      ).subscribe()
    }
    else{
      this.values = []
      this.hitoryPrices = [],
      this.historyValues = []
      // return this.values
    }
  }
  get CurrentValues(): any[] {
    return this.values
  }
  get hitoryValues(): any[] {
    return this.historyValues
  }
  get HistoryPriceHotel(): HistoryPriceHotel[] {
    return this.HistoryPricesHotel
  }
  setValues(hotelId: number) {
    this.hotelId = hotelId;
    this.getDots();
  }
}
