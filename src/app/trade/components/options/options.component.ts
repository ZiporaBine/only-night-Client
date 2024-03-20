import { Component, OnInit, ViewChild } from '@angular/core';
// import { IRoomElement, IAddressInfo, IHotelsElement, IItemElement ,IOptionResult } from 'types'
import { OptionsService } from './options.service';
import { NEVER, Observable, filter, tap, map } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { RevenueService } from 'src/app/rooms/components/revenue/revenue.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  displayedColumns: string[] = ['hotelName', 'location', 'checkIn', 'checkOut', 'roomClass', 'stars', 'Profit', 'Price', 'buy'];
  // dataSource = ELEMENT_DATA;
  loading: boolean = true
  dataSource: any = [];
  opportunities: IRoomElement[] = []
  // dSource = new MatTableDataSource<any>(this.dataSource);
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  formGroupSearch: FormGroup = new FormGroup({})
  nameFilter = new FormControl('')
  hotelNameFilter = new FormControl('');
  checkInFilter = new FormControl('');
  checkOutFilter = new FormControl('');
  roomFilter = new FormControl('');
  profitFilter = new FormControl('');
  filterValues = {
    hotelName: '',
    name: '',
    checkIn: '',
    checkOut: '',
    room: '',
    profit: '',

  };

  constructor(private optionsService: OptionsService, private revenueService: RevenueService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.optionsService.Opportunities);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter();
    console.log(this.optionsService.Opportunities);
    const sortState: Sort = { active: 'hotelName', direction: 'desc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
    this.getOptions();
    this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filterValues.name = name || ''
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.hotelNameFilter.valueChanges
      .subscribe(
        hotelName => {
          this.filterValues.hotelName = hotelName || '';
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.checkInFilter.valueChanges
      .subscribe(
        checkIn => {
          this.filterValues.checkIn = checkIn || '';
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.checkOutFilter.valueChanges
      .subscribe(
        checkOut => {
          this.filterValues.checkOut = checkOut || '';
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.roomFilter.valueChanges
      .subscribe(
        room => {
          this.filterValues.room = room || '';
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.profitFilter.valueChanges
      .subscribe(
        profit => {
          this.filterValues.profit = profit || '';
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.optionsService.dataChangeEvent.subscribe(_ => {
      this.onDataChange();
    })
    this.dataSource.paginator = this.paginator;
    if (this.optionsService.Opportunities.length ===0)
      this.loading = true
    else
      this.loading = false
  }
  getOptions() {
    this.dataSource = new MatTableDataSource(this.optionsService.Opportunities);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter();
    console.log(this.optionsService.Opportunities);
    const sortState: Sort = { active: 'hotelName', direction: 'desc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  onDataChange() {
    if (this.optionsService.Opportunities.length ===0)
      this.loading = true
    else
      this.loading = false
    this.dataSource = new MatTableDataSource(this.optionsService.Opportunities);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter();
    console.log(this.optionsService.Opportunities);
    const sortState: Sort = { active: 'hotelName', direction: 'desc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }
  selectOption(row: IRoomElement) {
    let arr: any = [...this.dataSource.data]
    arr = arr.forEach((element: any) => {
      element.highlighted ? element.highlighted = false : element.highlighted
      return element
    });
    this.revenueService.setValues(row.hotelId);
  }
  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      return data.location.toLowerCase().indexOf(searchTerms.name) !== -1
        && data.checkIn.toString().toLowerCase().indexOf(searchTerms.checkIn) !== -1
        && data.checkOut.toLowerCase().indexOf(searchTerms.checkOut) !== -1
        && data.hotelName.toLowerCase().indexOf(searchTerms.hotelName) !== -1
        && data.mealPlan.toLowerCase().indexOf(searchTerms.room) !== -1
        && data.Profit.toString().toLowerCase().indexOf(searchTerms.profit) !== -1;
    }
    return filterFunction;
  }
  buy(element: IRoomElement) {
    console.log('element: ',' element.location: ', element.location, 'element.hotelName: ', element.hotelName, 'element.price: ',element.price, 5, 5, 'element.checkIn: ', element.checkIn, 'element.checkOut: ', element.checkOut, 'token:   ', element.BToken,'element.hotelId: ', element.hotelId.toString(), 'element.Stars: ', element.Stars);
    // this.optionsService.buy$(element.location, element.hotelName, element.price, element.Stars, 5,
    //    element.checkIn, element.checkOut, element.BToken, element.hotelId.toString()).subscribe()
  }
}
export interface Result {
  Hotels: HotelsElement[];
};
export interface AddressInfo {
  Address: string;
  City: string;
};
export interface HotelsElement {
  Item: ItemElement;
  Rooms: RoomElement[]
};
export interface ItemElement {
  Id: number,
  Name: string,
  AddressInfo: AddressInfo,
  Stars: number
};
export interface RoomElement {
  RoomId: number,
  Desc: string,
  Price: number,
  NumAdt: number,
  NumCnn: number,
  CnnAge: [],
  CheckIn: string,
  CheckOut: string,
  MetaData: MetaData
};
export interface MetaData {
  Code: string,
  Desc: string
};
export interface RoomElement {
  hotelName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  roomClass: string;
  mealPlan: string,
  Profit: number,
  BToken: string
};
// const ELEMENT_DATA: IRoomElement[] = [
//   { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
//   { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
//   { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
//   { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
// ];
export interface IAddressInfo {
  Address: string;
};
export interface IHotelsElement {
  Item: IItemElement;
  Rooms: IRoomElement[]
};
export interface IItemElement {
  Name: string,
  AddressInfo: IAddressInfo
};
export interface IOptionResult {
  Hotels: IHotelsElement[];
};
export interface IRoomElement {
  hotelId: number,
  hotelName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  roomClass: string;
  metaData?: IMetaData;
  price: number;
  highlighted?: boolean;
  hovered?: boolean;
  roomId: number,
  Profit: number,
  BToken: string,
  Stars: number

};
export interface IMetaData {
  Code: string,
  Desc: string
};
export interface FilterValues {
  name?: string,
  id?: string,
  colour?: string,
  pet?: string
};
