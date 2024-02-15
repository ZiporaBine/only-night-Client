import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsComponent } from './rooms.component';
import { MY_DATE_FORMAT, SearchRoomsComponent } from './components/search-rooms/search-rooms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoomAvailabilityComponent } from './components/room-availability/room-availability.component';
import { ChartjsModule } from '@ctrl/ngx-chartjs';
import { RevenueComponent } from './components/revenue/revenue.component';
import { OffersComponent } from './components/offers/offers.component';
import { MaterialModule } from '../material/material.module';
import { StarsComponent } from './components/search-rooms/stars/stars.component';
import { StarsModule } from './components/search-rooms/stars/stars.module';
import { StarsDirective } from './directives/stars.directive';
import { DirectivesModule } from './directives/directives.module';
import { ProfitComponent } from './components/profit/profit.component';
import { GoogleMapsModule } from '@angular/google-maps'

import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    RoomsComponent,
    SearchRoomsComponent,
    RoomAvailabilityComponent,
    RevenueComponent,
    OffersComponent,
    ProfitComponent,
    
  ],
  providers:[
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ],
  imports: [
    CommonModule,
    RoomsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    ChartjsModule,
    StarsModule,
    DirectivesModule,
    GoogleMapsModule
  ],
  exports:[
    SearchRoomsComponent,
    RoomAvailabilityComponent,
    RevenueComponent,
    OffersComponent,
    ProfitComponent
  ]
})
export class RoomsModule { }
