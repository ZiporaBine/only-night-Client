import { Injectable } from '@angular/core';
import { Service } from 'ngx-jsonapi';
import { MishorHotelDestination } from '../resources/mishor-hotel-destination';

@Injectable({
  providedIn: 'root'
})
export class MishorHotelsDestinationsService extends Service<MishorHotelDestination> {
  public override resource = MishorHotelDestination;
  public override type = 'hotelDestinations';
}