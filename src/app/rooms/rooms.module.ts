import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { SearchRoomsComponent } from './components/search-rooms/search-rooms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomAvailabilityComponent } from './components/room-availability/room-availability.component';
import { ChartjsModule } from '@ctrl/ngx-chartjs';
import { RevenueComponent } from './components/revenue/revenue.component';
import { OffersComponent } from './components/offers/offers.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    RoomsComponent,
    SearchRoomsComponent,
    RoomAvailabilityComponent,
    RevenueComponent,
    OffersComponent
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    ChartjsModule
  ],
  exports:[
    SearchRoomsComponent,
    RoomAvailabilityComponent,
    RevenueComponent,
    OffersComponent
  ]
})
export class RoomsModule { }
