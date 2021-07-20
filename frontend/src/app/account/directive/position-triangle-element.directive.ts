import { Directive, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[accPositionTriangleElement]'
})
export class PositionTriangleElementDirective implements AfterViewInit {

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.el.nativeElement.style.top = `-${this.el.nativeElement.offsetHeight}px`;
    this.el.nativeElement.style.left = `${this.el.nativeElement.parentNode.offsetWidth/2}px`;
  }
}
