import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { SearchRoomsService } from './search-rooms.service';

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
    distanceFromCenter :new FormControl(0, [Validators.required]),
  });

  optionsCities: string[] = [];
  // optionsCities: string[] = ['London2', 'Paris', 'Amsterdam'];
  optionsCities$:  Observable<cities> | null = null;
  filteredOptionsCities: Observable<string[]> | null = null;

  optionsHotels: string[] = ['Abbot', 'Hilton', 'Waldorf Astoria'];
  filteredOptionsHotels: Observable<string[]> | null = null;

  name:number = 3;

  constructor(private serchRoomsService: SearchRoomsService){

  }
  ngOnInit() {
    this.getCitiesForFilter()
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

  getCitiesForFilter(){
    this.serchRoomsService.optionsCities$().pipe(
      // tap(({CurrentPriceHotel})=> console.log(CurrentPriceHotel)),
      map(({ data }) => {
        data.forEach(({city}) =>{ this.optionsCities = [...this.optionsCities, city]})
        // console.log(this.optionsCities);
        return this.optionsCities
      })
    ).subscribe()
  }

  search(sd: number){
    console.log(this.formGroupSearch, sd, '-------------sd');
    this.name = sd;
  }
}

export interface cities{
  error: boolean,
  msg: string,
  data: city[]
}

export interface city{
  city: string, 
  country: string,
  populationCounts: populationCounts
}

export interface populationCounts{
  year: number,
  value: number,
  sex: string,
  reliabilty: string
}