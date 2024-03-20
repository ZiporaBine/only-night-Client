import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appStars]'
})
export class StarsDirective {

  @HostListener('click') myMoeseIn(event: Event) {
    if (this.el.nativeElement.classList.contains('unselected-star-icon')) {
      this.el.nativeElement.classList.replace('unselected-star-icon', 'selected-star-icon');
    }
    else {
      this.el.nativeElement.classList.replace('selected-star-icon', 'unselected-star-icon');
    }
  }

  constructor(private el: ElementRef) { }
}
