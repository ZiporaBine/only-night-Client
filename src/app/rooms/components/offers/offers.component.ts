import { Component, OnInit } from '@angular/core';
import { OffersService } from './offers.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit{
  offers: any[] = [
    {
      name: 'Hotel Name',
      price: '$80',
      imageUrl: 'assets/images/hotels/1.png'
    },
    {
      name: 'Hotel Name',
      price: '$80',
      imageUrl: 'assets/images/hotels/1.png'
    },
    {
      name: 'Hotel Name',
      price: '$80',
      imageUrl: 'assets/images/hotels/1.png'
    }
  ];
  constructor(private offersService: OffersService){ }
  ngOnInit(): void {
    this.offers = this.offersService.Offers;
    this.offersService.imagesDataChangeEvent.subscribe(_ => {
      this.offers = this.offersService.Offers;
    })
  }

}
