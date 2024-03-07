import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cities, hotels } from './search-rooms.component';
import { Result } from 'src/app/trade/components/options/options.component';

@Injectable({
  providedIn: 'root'
})
export class SearchRoomsService {

  constructor(private http: HttpClient) { }

  searchOpportunities$(city: string, hotel: string, price: number, stars: number, location: number, checkIn: string, checkOut: string): Observable<Result> {
    const url = 'http://dashboard.onlynight.com:8001/api/search_opportunities/one_hotel/';//TODO accept url for post request
    // console.log(city,' ', hotel,' ', price,' ', stars,' ', location,' ', checkIn,' ', checkOut);
    const editCity = city.substring(0,1).toUpperCase() + city.substring(1,city.length).toLowerCase();
    console.log(checkIn, ' ', checkOut);
    return this.http.post<Result>(url, {
      city: editCity,
      hotel_name: hotel,
      stars: stars,
      check_in: checkIn.toString().replace('/', '-'),
      check_out: checkOut.replace('/', '-'),
      price: price,
      location: location,
    });
  }
  optionsCities$(): Observable<cities> {
    const url = 'https://countriesnow.space/api/v0.1/countries/population/cities'//TODO  addres api to onnect to googleApi
    const data = this.http.get<cities>(url);
    // console.log(data);
    return data;
  }
  optionsHotels$(): Observable<hotels> {
    const url = 'http://dashboard.onlynight.com:8001/api/search_opportunities/hotels_names'//TODO  addres api to get all the hotels name
    const data = this.http.get<hotels>(url);
    // console.log(data);
    return data;
  }
}
