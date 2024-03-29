import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IRoomElement, Result } from './options.component';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  private opportunities: IRoomElement[] = [];
  dataChangeEvent: EventEmitter<any> = new EventEmitter() || null;
  loadingChangeEvent: EventEmitter<any> = new EventEmitter() || null;
  constructor(private http: HttpClient) { this.initOpportunities(); }

  getoptions$(): Observable<Result> {
    const url = 'http://dashboard.onlynight.com:8001/api/search_opportunities/opportunities/'
    const data = this.http.get<Result>(url);
    return data;
  }
  initOpportunities() {
    return this.getoptions$().pipe(
      map(({ Hotels }) => {
        let arr: IRoomElement[] = [];
        Hotels.forEach((Hotel => {
          const { Item, Rooms } = Hotel
          const { Name, AddressInfo, Id, Stars, Images } = Item;
          arr = [...arr, ...Rooms.map(({ CheckIn, CheckOut, Desc, MetaData, Price, RoomId, Profit, BToken }) => ({
            hotelName: Name,
            location: AddressInfo.City,
            hotelId: Id,
            checkIn: CheckIn,
            checkOut: CheckOut,
            roomClass: Desc,
            price: Price,
            mealPlan: MetaData.Desc,
            roomId: RoomId,
            BToken: BToken,
            Profit: parseFloat(Profit.toFixed(4)),
            Stars: Stars,
            Images: Images
          })
          )
          ]
        }))
        this.Opportunities = arr;
        return arr;
      }),
    ).subscribe()
  }
  getOpportunitiesOptions() {
    return this.opportunities;
  }
  get Opportunities(): IRoomElement[] {
    return this.opportunities
  }
  set Opportunities(opportunities: IRoomElement[]) {
    this.opportunities = opportunities;
    this.dataChangeEvent.next('');
  }
  buy$(city: string, hotel: string, price: number, stars: number, location: number, checkIn: string, checkOut: string, room_token: string, hotel_code: string): Observable<Result> {
    const url = 'http://dashboard.onlynight.com:8001/api/search_opportunities/bookings';//TODO accept url for post request
    return this.http.post<any>(url, {
      city: city,
      hotel_name: hotel,
      stars: stars,
      check_in: checkIn.substring(0, 11),
      check_out: checkOut.substring(0, 11),
      price: price,
      location: location,
      room_token: "",
      hotel_code: ""
    });
  }
  setLoading() {
    this.loadingChangeEvent.next('');
  }
}
