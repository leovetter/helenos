import { Directive, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[accLazyDisplayImg]'
})
export class LazyDisplayImgDirective implements AfterViewInit {

  @Output() isIntersecting = new EventEmitter<any>();

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.lazyDisplayImage();
  }

  private lazyDisplayImage() {

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    };

    const obs = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          
          this.isIntersecting.emit(true);
          obs.unobserve(this.el.nativeElement);
        }
      });
    }, options);

    console.log(this.el.nativeElement)
    obs.observe(this.el.nativeElement);
  }
}
