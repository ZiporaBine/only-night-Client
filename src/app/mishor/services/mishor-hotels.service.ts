import { Injectable } from '@angular/core';
import { MishorHotel } from '../resources/mishor-hotel';
import { Service } from 'ngx-jsonapi';

@Injectable({
  providedIn: 'root'
})
export class MishorHotelsService extends Service<MishorHotel> {
  public override resource = MishorHotel;
  public override type = 'hotels';
}
