import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradeRoutingModule } from './trade-routing.module';
import { TradeComponent } from './trade.component';
import { OptionsComponent } from './components/options/options.component';
import { RoomsModule } from '../rooms/rooms.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    TradeComponent,
    OptionsComponent
  ],
  imports: [
    CommonModule,
    TradeRoutingModule,
    MaterialModule,
    RoomsModule
  ]
})
export class TradeModule { }
