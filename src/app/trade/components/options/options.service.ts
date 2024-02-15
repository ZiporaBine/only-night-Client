import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IRoomElement, Result } from './options.component';

@Injectable({
  providedIn: 'root'
})
export class OptionsService implements OnInit {

  private opportunities: IRoomElement[] = [];
  constructor(private http: HttpClient) { this.initOpportunities(); }
  dataChangeEvent: EventEmitter<any> = new EventEmitter()|| null;
 
  ngOnInit(): void {
    this.initOpportunities();
  }
  // getoptions$(): Observable<IRoomElement[]> {
  getoptions$(): Observable<Result> {
    // const url = 'http://localhost:3030/options'
    const url = 'http://dashboard.onlynight.com:8001/api/search_opportunities/opportunities'
    const data = this.http.get<Result>(url);
    //  console.log(data);
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
          // console.log(Rooms);
          // console.log(Item);
          const { Name, AddressInfo, Id } = Item;
          arr = [...arr, ...Rooms.map(({ CheckIn, CheckOut, Desc, MetaData, Price, RoomId, Profit }) => ({
            hotelName: Name,
            location: AddressInfo.Address,
            hotelId: Id,
            checkIn: CheckIn,
            checkOut: CheckOut,
            roomClass: Desc,
            price: Price,
            mealPlan: MetaData,
            roomId: RoomId,
            Profit:Profit
            // mealPlan: MetaData.Desc
          })
          )
          ]
        }))
        this.opportunities = arr;
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
    console.log(opportunities);
    
    this.opportunities = opportunities;
    this.dataChangeEvent.next('');
  }

}
