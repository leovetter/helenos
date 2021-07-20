import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[helCropSecond]'
})
export class CropSecondDirective {

  constructor() { }

  @HostListener('click', ['$event']) onMouseMove(event) {
    
    console.log('clcik')
    // console.log(event.pageX)
    // console.log(this.img.getBoundingClientRect().left)
    // console.log(this.img.getBoundingClientRect().top)
    // const x = event.pageX - this.el.nativeElement.getBoundingClientRect().left;
    // const y = event.pageY - this.el.nativeElement.getBoundingClientRect().top - window.scrollY;
    // console.log(x)
    // if(this.startCrop) {

    //   this.el.nativeElement.style.width = `${this.img.getBoundingClientRect().width - x + 5}px`;
    //   this.el.nativeElement.style.left = `calc(5% + ${x}px)`;
    // }
  }

}
