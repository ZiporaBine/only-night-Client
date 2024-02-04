import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchRoomsService {

  constructor(private http:HttpClient) { }

  searchOpportunities$(city: string, hotel: string, price: number, stars: number, location: string): Observable<any> {
    const url = '';//TODO accept url for post request
    return this.http.post<any>(url, {
      city: city,
      hotel: hotel,
      price:price,
      stars: stars,
      location: location
    });}

    optionsCities$(): Observable<any>{
      const url = 'https://countriesnow.space/api/v0.1/countries/population/cities'//TODO  addres api to onnect to googleApi
      const data = this.http.get<any>(url);
      // console.log(data);
      return data;
    }
}
