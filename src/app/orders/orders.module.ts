import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { MaterialModule } from '../material/material.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { RoomsModule } from '../rooms/rooms.module';
import { OrdersOptionsComponent } from './componnents/orders-options/orders-options.component';



@NgModule({
  declarations: [OrdersComponent, OrdersOptionsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    OrdersRoutingModule,
    RoomsModule
  ]
})
export class OrdersModule { }
