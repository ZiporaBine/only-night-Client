import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent {

  stars: number[] = [1,2,3];
  @Output() name: EventEmitter<number> = new EventEmitter<number>();

  clickOnStar(starNumber: number){
    this.stars.includes(starNumber) ? this.stars.splice(this.stars.indexOf(starNumber), 1) : this.stars.push(starNumber);
    this.name.emit(this.stars.length);
  }

}
