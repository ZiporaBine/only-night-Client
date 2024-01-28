import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxJsonapiModule } from 'ngx-jsonapi';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { GridService } from './grid.service';
import { ChartjsModule } from '@ctrl/ngx-chartjs';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
    
  ],
  imports: [
    NgxJsonapiModule.forRoot({
      url: '/api/mishor/',
      cache_prerequests: false
    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    ChartjsModule
  ],
  providers: [
    GridService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }