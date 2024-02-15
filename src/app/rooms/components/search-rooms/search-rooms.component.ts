import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, startWith, map, tap } from 'rxjs';
import { SearchRoomsService } from './search-rooms.service';
import { IRoomElement } from 'src/app/trade/components/options/options.component';
import { OptionsService } from 'src/app/trade/components/options/options.service';

@Component({
  selector: 'app-search-rooms',
  templateUrl: './search-rooms.component.html',
  styleUrls: ['./search-rooms.component.scss']
})
export class SearchRoomsComponent {
  formGroupSearch: FormGroup = new FormGroup({
    city: new FormControl('', [Validators.required]),
    hotel: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    distanceFromCenter: new FormControl(0, [Validators.required]),
    checkIn: new FormControl('', [Validators.required]),
    checkOut: new FormControl('', [Validators.required]),
    //distanceFromCenter :new FormControl(0, [Validators.required]),
  });

  optionsCities: string[] = [];
  // optionsCities: string[] = ['London2', 'Paris', 'Amsterdam'];
  optionsCities$: Observable<cities> | null = null;
  filteredOptionsCities: Observable<string[]> | null = null;
  optionsHotels: string[] = ['Abbot', 'Hilton', 'Waldorf Astoria'];
  filteredOptionsHotels: Observable<string[]> | null = null;

  stars: number = 0;

  constructor(private serchRoomsService: SearchRoomsService, private optionsService:OptionsService) {

  }
  ngOnInit() {
    this.getCitiesForFilter();
    this.getHotelsForFilter();
    this.filteredOptionsCities = this.formGroupSearch.controls['city'].valueChanges.pipe(
      // startWith(''),
      map(value => this._filter(this.optionsCities, value || '')),
    );

    this.filteredOptionsHotels = this.formGroupSearch.controls['hotel'].valueChanges.pipe(
      // startWith(''),
      map(value => this._filter(this.optionsHotels, value || '')),
    );
  }

  private _filter(options: string[], value: string): string[] {
    const filterValue = value.toLowerCase();

    if (!filterValue) return [];

    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  getCitiesForFilter() {
    this.serchRoomsService.optionsCities$().pipe(
      map(({ data }) => {
        data.forEach(({ city }) => { this.optionsCities = [...this.optionsCities, city] })
        return this.optionsCities
      })
    ).subscribe()
  }

  getHotelsForFilter() {
    this.serchRoomsService.optionsHotels$().pipe(
      map(({ Hotels }) => {
        Hotels.forEach(name => { this.optionsHotels = [...this.optionsHotels, name] })
        return this.optionsHotels
      })
    ).subscribe()
  }
  starChange(stars: any) {
    this.stars = stars;
  }
  search(){
    const CeckInDate =this.formGroupSearch.controls['checkIn'].value
    const CeckOutDate =this.formGroupSearch.controls['checkOut'].value

    // console.log(a._i.year, a._i.month, a._i.date);
    
    this.serchRoomsService.searchOpportunities$(this.formGroupSearch.controls['city'].value, 
    this.formGroupSearch.controls['hotel'].value,
    this.formGroupSearch.controls['price'].value,
    this.stars,
    this.formGroupSearch.controls['distanceFromCenter'].value,
    CeckInDate._i.year+'-'+ (CeckInDate._i.month+1)+ '-'+ CeckInDate._i.date,
    CeckOutDate._i.year+'-'+ (CeckOutDate._i.month+1)+ '-'+ CeckOutDate._i.date,
    ).pipe(
      // tap(result => {console.log(result),
      //    console.log("try");
      // }),
      map(({ Hotels }) => {
        let arr: IRoomElement[] = [];
        if(!Hotels)
          return arr;
        Hotels.forEach((Hotel => {
          const { Item, Rooms } = Hotel
          // const {MetaData} = Rooms
          // console.log(Rooms);
          // console.log(Item);
          const { Name, AddressInfo, Id } = Item;
          arr = [...arr, ...Rooms.map(({ CheckIn, CheckOut, Desc, MetaData, Price, RoomId }) => ({
            hotelName: Name,
            location: AddressInfo.Address,
            hotelId: Id,
            checkIn: CheckIn,
            checkOut: CheckOut,
            roomClass: Desc,
            price: Price,
            mealPlan: MetaData,
            roomId: RoomId
            // mealPlan: MetaData.Desc
          })
          )
          ]
        }))
        return arr;
      }),
    ).subscribe(opportunities=>{
      this.optionsService.Opportunities = opportunities;
      console.log(this.optionsService.Opportunities);
    })
  }
}

export interface cities {
  error: boolean,
  msg: string,
  data: city[]
}
export interface city {
  city: string,
  country: string,
  populationCounts: populationCounts
}
export interface populationCounts {
  year: number,
  value: number,
  sex: string,
  reliabilty: string
}
export interface hotels {
  Hotels: string[]
}

export const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};