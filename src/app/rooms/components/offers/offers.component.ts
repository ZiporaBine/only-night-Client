import { Component } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent {
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
}
