import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-search-rooms',
  templateUrl: './search-rooms.component.html',
  styleUrls: ['./search-rooms.component.scss']
})
export class SearchRoomsComponent {
  formGroupSearch: FormGroup = new FormGroup({
    city: new FormControl('', [Validators.required]),
    hotel: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required])
  });

  optionsCities: string[] = ['London2', 'Paris', 'Amsterdam'];
  filteredOptionsCities: Observable<string[]> | null = null;

  optionsHotels: string[] = ['Abbot', 'Hilton', 'Waldorf Astoria'];
  filteredOptionsHotels: Observable<string[]> | null = null;


  ngOnInit() {
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
}
