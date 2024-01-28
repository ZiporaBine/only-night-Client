import { Component, OnInit } from '@angular/core';
// import { IRoomElement, IAddressInfo, IHotelsElement, IItemElement ,IOptionResult } from 'types'
import { OptionsService } from './optiond.service';
import { NEVER, Observable, filter, tap, map } from 'rxjs';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  displayedColumns: string[] = ['hotelName', 'location', 'checkIn', 'checkOut', 'roomClass', 'buy'];
  // dataSource = ELEMENT_DATA;
  dataSource: any = [];
  dataSource$: Observable<any> = NEVER;
  // dataSource$: Observable<IRoomElement[]> = NEVER;

  constructor(private optionsService: OptionsService) { }
  ngOnInit(): void {
    this.loadOptions();
    // console.log('dataSource$:  ', this.dataSource$);

  }

  loadOptions() {
    // const employeesFromFile = employeesData;
    // console.log({ employeesFromFile: JSON.stringify(employeesFromFile)});
    //  this.readJsonService.getEmployees$().pipe(
    //   filter(employees => !!employees),
    //   tap( employees => console.log('employees:' ,  employees)),
    //   tap( employees => this.employees = employees),
    //  ).subscribe();
    this.dataSource$ = this.optionsService.getoptions$().pipe(
      //  tap((Item: Result) => console.log(Item['Hotels'])),
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
          })
          )
          ]
        }))
        console.log(arr);
        
        return arr;
      }),
    )
  }
}
// "AddressInfo": {
//   "Address": "Fasanenstr. 22, 10719, Berlin, GERMANY",
//   "Phone": null,
//   "Fax": null,
//   "City": "BERLIN",
//   "Country": "DE"
// },

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
  // "Nights": 2,
  // "Remarks": "IF YOU FAIL TO CHECK-IN FOR THIS RESERVATION, OR IF YOU CANCEL OR CHANGE THIS RESERVATION AFTER CXL DEADLINE, YOU MAY INCUR PENALTY CHARGES AT THE DISCRETION OF THE HOTEL OF UP TO 100% OF THE BOOKING VALUE, UNLESS OTHERWISE STATED.Amendments are not allowed (except name changes), booking has to be cancelled and rebooked. Extra Charges: Excluded:Included:VAT: 12.06 EUR City tax: 9.22 EUR ",
  // "LimitDate": "2024-01-16 00:00:00",
  // "BToken": "‡536‡DE.BERLIN‡gogb‡93298‡2024-01-18‡2‡EUR‡‡‡Double or Twin Room - Non-refundable ‡93298‡135_7555_SQ3659_SR6467‡RO‡‡‡true‡‡‡‡‡‡‡‡‡‡‡jA3YO8tJMtEnHAvbZpXuaw==‡O2A0C‡‡2‡0‡0‡0‡1‡‡‡1‡‡0‡0‡1‡BERLIN‡Berlin‡‡FreeCordinanats‡52.52000659999999‡13.404954‡8‡AUGUSTA‡15476656/8151425752414723767/423‡‡‡52.50225‡13.32733‡BEPRO‡N‡gogb.en.DE.93298.‡138‡135‡IL‡DE‡‡",
  // "MetaData": {
  //     "Code": "RO",
  //     "Desc": "Room Only"
  // }
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