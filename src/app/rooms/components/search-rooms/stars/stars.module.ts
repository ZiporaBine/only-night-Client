import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarsComponent } from './stars.component';
import { MaterialModule } from 'src/app/material/material.module';
import { DirectivesModule } from 'src/app/rooms/directives/directives.module';

@NgModule({
  declarations: [StarsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DirectivesModule
  ],
  exports:[StarsComponent]
})
export class StarsModule { }
