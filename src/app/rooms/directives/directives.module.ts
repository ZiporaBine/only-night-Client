import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarsDirective } from './stars.directive';



@NgModule({
  declarations: [StarsDirective,],
  imports: [
    CommonModule
  ],
  exports:[StarsDirective]
})
export class DirectivesModule { }
