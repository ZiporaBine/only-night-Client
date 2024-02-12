import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
// import { IRoomElement, IAddressInfo, IHotelsElement, IItemElement ,IOptionResult } from 'types'
import { OptionsService } from './options.service';
import { NEVER, Observable, filter, tap, map } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { RevenueService } from 'src/app/rooms/components/revenue/revenue.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['hotelName', 'location', 'checkIn', 'checkOut', 'roomClass', 'buy'];
  // dataSource = ELEMENT_DATA;
  dataSource: any = [];
  //   dataSource: IRoomElement[] = [   { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },

  dataSource$: Observable<any> = NEVER;
  // Observable<MatTableDataSource<Thing>>
  // dataSource$: Observable<IRoomElement[]> = NEVER;
  dSource = new MatTableDataSource<any>(this.dataSource);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private optionsService: OptionsService, private revenueService: RevenueService) { }

  ngOnInit(): void {
    // this.loadOptions();
    this.getOptions();
    // console.log(this.optionsService.getOpportunitiesOptions());
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
          const { Name, AddressInfo, Id } = Item;
          arr = [...arr, ...Rooms.map(({ CheckIn, CheckOut, Desc, MetaData, Price, RoomId }) => ({
            hotelName: Name,
            location: AddressInfo.Address,
            hotelId:Id,
            checkIn: CheckIn,
            checkOut: CheckOut,
            roomClass: Desc,
            price: Price,
            mealPlan: MetaData,
            roomId:RoomId
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
  getOptions() {
    this.optionsService.getoptions$().pipe(
      // tap((Item: Result) => console.log(Item['Hotels'])),
      map(({ Hotels }) => {
        let arr: IRoomElement[] = [];
        Hotels.forEach((Hotel => {
          const { Item, Rooms } = Hotel
          // const {MetaData} = Rooms
          // console.log(Rooms);
          // console.log(Item);
          const { Name, AddressInfo, Id } = Item;
          arr = [...arr, ...Rooms.map(({ CheckIn, CheckOut, Desc, MetaData, Price, RoomId }) => ({
            hotelName: Name,
            location: AddressInfo.Address,
            hotelId:Id,
            checkIn: CheckIn,
            checkOut: CheckOut,
            roomClass: Desc,
            price: Price,
            mealPlan: MetaData,
            roomId:RoomId
            // mealPlan: MetaData.Desc
          })
          )
          ]
        }))
        // this.dataSource = arr
        return arr;
      }),
    ).subscribe(things => {
      this.dataSource = new MatTableDataSource(things);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  selectOption(row: IRoomElement) {
    let arr: any = [...this.dataSource.data]
    arr=arr.forEach((element: any) => {
      element.highlighted ? element.highlighted = false : element.highlighted
      return element
    });
    this.revenueService.setValues(row.hotelId, row.roomId);
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
  Id: number,
  Name: string,
  AddressInfo: AddressInfo
}
export interface RoomElement {
  RoomId:number,
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
// const ELEMENT_DATA: IRoomElement[] = [
//   { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
//   { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
//   { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
//   { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
// ];
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
  hotelId:number,
  hotelName: string;
  location: string;
  checkIn: string;
  checkOut: string;
  roomClass: string;
  metaData?: IMetaData;
  price?: number;
  highlighted?: boolean;
  hovered?: boolean;
  roomId:number
}
export interface IMetaData {
  Code: string,
  Desc: string
}
