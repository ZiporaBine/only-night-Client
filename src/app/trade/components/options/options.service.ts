import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IRoomElement, Result } from './options.component';

@Injectable({
  providedIn: 'root'
})
export class OptionsService {

  private opportunities: IRoomElement[] = [];
  constructor(private http: HttpClient) { this.initOpportunities(); }
  dataChangeEvent: EventEmitter<any> = new EventEmitter() || null;

  getoptions$(): Observable<Result> {
    // const url = 'http://localhost:3030/options'
    const url = 'http://dashboard.onlynight.com:8001/api/search_opportunities/opportunities'
    const data = this.http.get<Result>(url);
    return data;
    // return this.http.get<IRoomElement[]>(url);
    // const data = this.http.get<any[]>(url).pipe(
    // map( (item: any) => {
    //   const hotelName = item.Item.Name;
    //   const location = item.Item.AddressInfo.City;

    //   const roomElements = item.Rooms.map((room: any) => {
    //     const checkIn = room.CheckIn;
    //     const checkOut = room.CheckOut;
    //     const roomClass = room.MetaData.Desc;

    //     return { hotelName, location, checkIn, checkOut, roomClass };
    //   });

    //   // return roomElements;
    // })

    // )
    // return data;
  }
  initOpportunities() {
    return this.getoptions$().pipe(
      // tap((Item: Result) => console.log(Item['Hotels'])),
      map(({ Hotels }) => {
        let arr: IRoomElement[] = [];
        Hotels.forEach((Hotel => {
          const { Item, Rooms } = Hotel
          // const {MetaData} = Rooms
          const { Name, AddressInfo, Id } = Item;
          arr = [...arr, ...Rooms.map(({ CheckIn, CheckOut, Desc, MetaData, Price, RoomId, Profit }) => ({
            hotelName: Name,
            location: AddressInfo.City,
            hotelId: Id,
            checkIn: CheckIn,
            checkOut: CheckOut,
            roomClass: Desc,
            price: Price,
            mealPlan: MetaData.Desc,
            roomId: RoomId,
            Profit: parseFloat(Profit.toFixed(4)),
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

}
