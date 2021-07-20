import { Directive, ElementRef, HostListener, AfterViewInit, Input, ChangeDetectorRef } from '@angular/core';
import { fromEvent } from 'rxjs';

@Directive({
  selector: '[helCrop]'
})
export class CropDirective implements AfterViewInit {

  startCrop: string;
  img: HTMLElement;

  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    
    this.img = document.querySelector('.image') as HTMLElement;
    this.el.nativeElement.style.width = `${this.img.getBoundingClientRect().width}px`;
    this.el.nativeElement.style.height = `${this.img.getBoundingClientRect().height}px`;

    const left = this.el.nativeElement.querySelector('.left');

    this.img.addEventListener('click', () => {
      console.log('click')
    })
    
  }
  

}
