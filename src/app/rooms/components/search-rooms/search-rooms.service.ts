import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cities, hotels } from './search-rooms.component';

@Injectable({
  providedIn: 'root'
})
export class SearchRoomsService {

  constructor(private http:HttpClient) { }

  searchOpportunities$(city: string, hotel: string, price: number, stars: number, location: string, checkIn: Date, checkOut:Date): Observable<any> {
    const url = 'http://127.0.0.1:8000/api/search_opportunities/one_hotel';//TODO accept url for post request
    return this.http.post<any>(url, {
      city: city,
      hotel: hotel,
      price:price,
      stars: stars,
      location: location,
      checkIn: checkIn,
      checkOut: checkOut
    });}

    optionsCities$(): Observable<cities>{
      const url = 'https://countriesnow.space/api/v0.1/countries/population/cities'//TODO  addres api to onnect to googleApi
      const data = this.http.get<cities>(url);
      // console.log(data);
      return data;
    }

    optionsHotels$(): Observable<hotels>{
      const url = ''//TODO  addres api to get all the hotels name
      const data = this.http.get<hotels>(url);
      // console.log(data);
      return data;
    }
}

