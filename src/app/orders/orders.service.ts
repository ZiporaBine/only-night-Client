import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IOrderElement, IOrderResulst } from './componnents/orders-options/orders-options.component';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  dataChangeEvent: EventEmitter<any> = new EventEmitter() || null;

  constructor(private http: HttpClient) { this.initOrders()}

  private orders: IOrderElement[] = []

  getOrders$(): Observable<IOrderResulst> {
    const url = 'http://dashboard.onlynight.com:8001/api/search_opportunities/booking/'
    const data = this.http.get<IOrderResulst>(url);
    return data;
  }

  initOrders() {
    return this.getOrders$().pipe(
      map(({ orders }) => {
        let orderElements: IOrderElement[] = []
        orders.forEach(order => {
          orderElements = [...orderElements, {
            id: order.id, orderCode: order.orderCode, orderDesc: order.orderDesc, checkIn: order.checkIn,
            checkOut: order.checkOut, price: order.price, orderId: order.orderId, orderSegmentId: order.orderSegmentId,
            orderSegId: order.orderSegId, createDate: order.createDate, roomClassCode: order.roomClassCode,
            roomClassDesc: order.roomClassDesc, city: order.city
          }]
        })
        return orderElements
      })
    ).subscribe(orderElements => this.Orders = orderElements)
  }

  set Orders(orders: IOrderElement[]) {
    this.orders = orders;
    console.log('in orders service', this.orders);
    this.dataChangeEvent.next('');
  }
  get Orders(){
    return this.orders
  }
}

