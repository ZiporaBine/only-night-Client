import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from '../../orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-orders-options',
  templateUrl: './orders-options.component.html',
  styleUrls: ['./orders-options.component.scss']
})
export class OrdersOptionsComponent implements OnInit{
  displayedColumns: string[] = ['hotelName', 'location', 'checkIn', 'roomClass', 'buy', 'status', 'cancel'];
  // dataSource = ELEMENT_DATA;
  dataSource: any = [];
  dSource = new MatTableDataSource<any>(this.dataSource);
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private ordersService: OrdersService){}
  ngOnInit(): void {
    console.log(this.ordersService.Orders);
    
    this.dataSource = new MatTableDataSource(this.ordersService.Orders);
    this.dataSource.paginator = this.paginator;

    this.ordersService.dataChangeEvent.subscribe(_ => {
      this.onDataChange();
    })
  }

  onDataChange(){
    this.dataSource = new MatTableDataSource(this.ordersService.Orders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;const sortState: Sort = { active: 'hotelName', direction: 'desc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }
}
const ELEMENT_DATA: IRoomElement[] = [
  { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
  { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
  { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
  { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
  { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
  { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
  { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
  { hotelName: 'Hotel Name', location: 'Hotel Location', checkIn: '21/12/2023', checkOut: '27/12/2023', roomClass: 'Classic' },
];

export interface IMetaData {
  Code: string,
  Desc: string
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
export interface IOrderResulst{
  orders: IOrderElement[]
}
export interface IOrderElement {
  id: number,
  orderCode: string;
  orderDesc: string;
  checkIn: string;
  checkOut: string;
  price: number;
  highlighted?: boolean;
  hovered?: boolean;
  orderId: number,
  orderSegmentId: number;
  orderSegId: number;
  createDate: string;
  roomClassCode: string;
  roomClassDesc: string;
  city: string;
};
