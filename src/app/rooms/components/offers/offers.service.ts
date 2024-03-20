import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OffersService {

  imagesDataChangeEvent: EventEmitter<any> = new EventEmitter() || null;

  private offers: any[] = [
    {
      Desc: 'Hotel Desc',
      price: '$80',
      ImageLink: 'assets/images/hotels/1.png'
    },
    {
      Desc: 'Hotel Desc',
      price: '$80',
      ImageLink: 'assets/images/hotels/1.png'
    },
    {
      Desc: 'Hotel Desc',
      price: '$80',
      ImageLink: 'assets/images/hotels/1.png'
    }
  ];

  constructor() { }

  get Offers(): any[] {
    return this.offers;
  }

  set Offers(offers: any[]) {
    console.log(offers);
    if (offers.length > 3)
      this.offers = [offers[1], offers[2], offers[3]];
    else
      this.offers = offers;
    this.imagesDataChangeEvent.next('')
  }

}
