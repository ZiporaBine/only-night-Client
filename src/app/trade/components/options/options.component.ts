import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// import { IRoomElement, IAddressInfo, IHotelsElement, IItemElement ,IOptionResult } from 'types'
import { OptionsService } from './optiond.service';
import { NEVER, Observable, filter, tap, map } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['hotelName', 'location', 'checkIn', 'checkOut', 'roomClass', 'buy'];
  // dataSource = ELEMENT_DATA;
  dataSource: any = [];
  dataSource$: Observable<any> = NEVER;
  // Observable<MatTableDataSource<Thing>>
  // dataSource$: Observable<IRoomElement[]> = NEVER;
  dSource = new MatTableDataSource<any>(this.dataSource);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private optionsService: OptionsService) { }

  ngOnInit(): void {
    // this.loadOptions();
    this.getOptions();
  }

  ngAfterViewInit() {
    this.dSource = new MatTableDataSource<any>(this.dataSource);
    this.dSource.paginator = this.paginator;
  }

  loadOptions() {
    this.dataSource$ = this.optionsService.getoptions$().pipe(
      tap((Item: Result) => console.log(Item['Hotels'])),
      map(({ Hotels }) => {
        let arr: IRoomElement[] = [];
        Hotels.forEach((Hotel => {
          const { Item, Rooms } = Hotel
          // const {MetaData} = Rooms
          console.log(Rooms);
          console.log(Item);
          const { Name, AddressInfo } = Item;
          arr = [...arr, ...Rooms.map(({ CheckIn, CheckOut, Desc, MetaData, Price }) => ({
            hotelName: Name,
            location: AddressInfo.Address,
            checkIn: CheckIn,
            checkOut: CheckOut,
            roomClass: Desc,
            price: Price,
            mealPlan: MetaData
            // mealPlan: MetaData.Desc
          })
          )
          ]
        }))
        console.log(arr);
        this.dataSource = arr
        return arr;
      }),
    )
  }

  getOptions(){
    this.optionsService.getoptions$().pipe(
      tap((Item: Result) => console.log(Item['Hotels'])),
      map(({ Hotels }) => {
        let arr: IRoomElement[] = [];
        Hotels.forEach((Hotel => {
          const { Item, Rooms } = Hotel
          // const {MetaData} = Rooms
          console.log(Rooms);
          console.log(Item);
          const { Name, AddressInfo } = Item;
          arr = [...arr, ...Rooms.map(({ CheckIn, CheckOut, Desc, MetaData, Price }) => ({
            hotelName: Name,
            location: AddressInfo.Address,
            checkIn: CheckIn,
            checkOut: CheckOut,
            roomClass: Desc,
            price: Price,
            mealPlan: MetaData
            // mealPlan: MetaData.Desc
          })
          )
          ]
        }))
        console.log(arr);
        // this.dataSource = arr
        return arr;
      }),
    ).subscribe(things => {
      this.dataSource = new MatTableDataSource(things);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  })
  }
}

export interface Result {
  Hotels: HotelsElement[];
}
export interface AddressInfo {
  Address: string;
}
export interface HotelsElement {
  Item: ItemElement;
  Rooms: RoomElement[]
}
export interface ItemElement {
  Name: string,
  AddressInfo: AddressInfo

}
export interface RoomElement {
  Desc: string,
  Price: number,
  NumAdt: number,
  NumCnn: number,
  CnnAge: [],
  CheckIn: string,
  CheckOut: string,
  MetaData: MetaData
}
export interface MetaData {
  Code: string,
  Desc: string
}
export interface RoomElement {
  hotelName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  roomClass: string;
  mealPlan: string
}
const ELEMENT_DATA: IRoomElement[] = [
  { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
  { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
  { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
  { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
];
export interface IAddressInfo {
  Address: string;
}
export interface IHotelsElement {
  Item: IItemElement;
  Rooms: IRoomElement[]
}
export interface IItemElement {
  Name: string,
  AddressInfo: IAddressInfo
}
export interface IOptionResult {
  Hotels: IHotelsElement[];
}
export interface IRoomElement {
  hotelName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  roomClass: string;
  metaData?: IMetaData;
  price?: number
}
export interface IMetaData {
  Code: string,
  Desc: string
}
