import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appStars]'
})
export class StarsDirective {

  @HostListener('click') myMoeseIn(event: Event){
    console.log(this.el)
    // this.el.nativeElement.style.color='#757294'
    console.log(this.el.nativeElement.classList.contains('unselected-star-icon'));
    
    if(this.el.nativeElement.classList.contains('unselected-star-icon')) {
    this.el.nativeElement.classList.replace('unselected-star-icon', 'selected-star-icon');
    }
    else{
      this.el.nativeElement.classList.replace('selected-star-icon', 'unselected-star-icon');
    }
    // classList
   // this.el.nativeElement.style.backgroundColor = 'green';
  }

  constructor(private el: ElementRef) { }
}
