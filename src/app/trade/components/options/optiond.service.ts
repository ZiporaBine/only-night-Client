import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map} from 'rxjs';
// import {} from 'types';
import { HotelsElement, Result, IOptionResult } from './options.component';

@Injectable({
  providedIn: 'root'
})

export class OptionsService {

  constructor(private http: HttpClient) { }

  // getoptions$(): Observable<IRoomElement[]> {
    getoptions$(): Observable<Result> {
    const url = 'http://127.0.0.1:8000/api/search_opportunities/opportunities'
    const data =  this.http.get<Result>(url);
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
  
}
