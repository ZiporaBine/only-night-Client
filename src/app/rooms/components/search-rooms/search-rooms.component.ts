import { Component, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
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

  checkIn = 'chechIn';
  formGroupSearch: FormGroup = new FormGroup({
    city: new FormControl('', [Validators.required]),
    hotel: new FormControl(''),
    price: new FormControl(0, [Validators.required]),
    distanceFromCenter: new FormControl(0, [Validators.required]),
    checkIn: new FormControl('', [Validators.required,]),
    // checkIn: new FormControl('', [Validators.required ,this.validateCheckIn() as ValidatorFn]),
    checkOut: new FormControl('', [Validators.required]),
    // checkOut: new FormControl('', [Validators.required, this.validateCheckOut(this.checkIn) as ValidatorFn]),
  });

  optionsCities: string[] = [];
  // optionsCities: string[] = ['London2', 'Paris', 'Amsterdam'];
  optionsCities$: Observable<cities> | null = null;
  filteredOptionsCities: Observable<string[]> | null = null;
  optionsHotels: string[] = [];
  filteredOptionsHotels: Observable<string[]> | null = null;
  checkInCange: Observable<any> | null = null;

  stars: number = 3;

  constructor(private serchRoomsService: SearchRoomsService, private optionsService: OptionsService) { }

  ngOnInit() {
    this.checkIn = this.formGroupSearch.controls['checkIn'].value;
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
  search() {
    this.optionsService.setLoading()
    let CeckInDate = this.formGroupSearch.controls['checkIn'].value
    let CeckOutDate = this.formGroupSearch.controls['checkOut'].value
    console.log('search func---  ', CeckInDate.format(), CeckOutDate.format());
    // if (this.formGroupSearch.valid) {
    this.serchRoomsService.searchOpportunities$(this.formGroupSearch.controls['city'].value,
      this.formGroupSearch.controls['hotel'].value,
      this.formGroupSearch.controls['price'].value,
      this.stars,
      this.formGroupSearch.controls['distanceFromCenter'].value,
      this.formGroupSearch.controls['checkIn'].value.format(),
      CeckOutDate.format()
    ).pipe(
      map(({ Hotels }) => {
        let arr: IRoomElement[] = [];
        if (!Hotels)
          return arr;
        Hotels.forEach((Hotel => {
          const { Item, Rooms } = Hotel
          const { Name, AddressInfo, Id, Stars } = Item;
          arr = [...arr, ...Rooms.map(({ CheckIn, CheckOut, Desc, MetaData, Price, RoomId, Profit, BToken }) => ({
            hotelName: Name,
            location: AddressInfo.City,
            hotelId: Id,
            checkIn: CheckIn,
            checkOut: CheckOut,
            roomClass: Desc,
            price: Price,
            roomId: RoomId,
            mealPlan: MetaData.Desc,
            Profit: Profit,
            BToken: BToken,
            Stars: Stars
          })
          )
          ]
        }))
        return arr;
      }),
    ).subscribe(opportunities => {
      this.optionsService.Opportunities = opportunities;
      console.log(this.optionsService.Opportunities);
    })
    // }
    // this.formGroupSearch.reset()
  }
  completeChechOut() {
    const t = this.formGroupSearch.controls['checkIn'].value;
    let a = t;
    a = a.add('d', 1);
    this.formGroupSearch.controls['checkOut'].setValue(a);
    a = a.add('d', -1);
  }
  checkOutValidator(control: FormControl) {
    if (
      !!this && !!control.value && !!control.value < this.formGroupSearch.controls['checkIn'].value
    ) {
      return null;
    } else {
      return { invalidCheckout: true };
    }
  }
  validateCheckOut(checkIn: any): ValidatorFn {
    return (): ValidationErrors | null => {
      // Implementation
      if (
        (
          !!this.formGroupSearch && !!this.formGroupSearch.controls['checkIn'].value && !!this.formGroupSearch.controls['checkOut'].value && this.formGroupSearch.controls['checkIn'].value._i.year > this.formGroupSearch.controls['checkOut'].value._i.year
        )
      ) {
        return { invalidCheckout: true };
      }
      else if ((
        !!this.formGroupSearch && !!this.formGroupSearch.controls['checkIn'].value && this.formGroupSearch.controls['checkIn'].value._i.month > this.formGroupSearch.controls['checkOut'].value._i.month
      )) {
        return { invalidCheckout: true };
      }
      else if ((
        !!this.formGroupSearch && !!this.formGroupSearch.controls['checkIn'].value && this.formGroupSearch.controls['checkIn'].value._i.date > this.formGroupSearch.controls['checkOut'].value._i.date
      )) {
        return { invalidCheckout: true };
      }
      // If no error, return null
      return null;
    };
  }

  validateCheckIn(): ValidatorFn {
    return (): ValidationErrors | null => {
      // Implementation
      if (
        (
          !!this.formGroupSearch && !!this.formGroupSearch.controls['checkIn'].value && !!this.formGroupSearch.controls['checkOut'].value
        )
      ) {
        const temp = this.formGroupSearch.controls['checkOut'].value;
        this.formGroupSearch.updateValueAndValidity();
        this.formGroupSearch.reset({

          checkOut: temp,
        });
        console.log(this.formGroupSearch);
        return null;
      }
      // If no error, return null
      return null;
    };
  }
}

export interface cities {
  error: boolean,
  msg: string,
  data: city[]
};
export interface city {
  city: string,
  country: string,
  populationCounts: populationCounts
};
export interface populationCounts {
  year: number,
  value: number,
  sex: string,
  reliabilty: string
};
export interface hotels {
  Hotels: string[]
};
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
