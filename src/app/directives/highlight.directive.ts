import { Directive, HostListener, Renderer2, ElementRef } from '@angular/core';




@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef, private redered: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter(){
      this.redered.addClass(this.el.nativeElement,'highlight')
  }
  @HostListener('mouseleave') onMouseLeave(){
      this.redered.removeClass(this.el.nativeElement,'highlight')
  }

}
