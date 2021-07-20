import { Directive, Input, ElementRef, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[lbLazyLoadingMedia]'
})
export class LazyLoadingMediasDirective implements AfterViewInit {

  // tslint:disable-next-line:no-input-rename
  @Input('data-src') src: string;
  // tslint:disable-next-line:no-input-rename
  @Input('data-id') id: number;
  @Output() urlChanged = new EventEmitter<any>();

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.canLazyLoad() ? this.lazyLoadMedia() : this.load();
  }

  private canLazyLoad() {
    return window && 'IntersectionObserver' in window;
  }

  private lazyLoadMedia() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    };

    const obs = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          this.loadMedia(this.id);
          obs.unobserve(this.el.nativeElement);
        }
      });
    }, options);

    obs.observe(this.el.nativeElement);
  }

  private load() {
    const children = this.el.nativeElement.children;
    for (let i = 0 ; i < children.length ; i++) {
      this.loadMedia(i);
    }
  }

  private loadMedia(id: number) {
     this.urlChanged.emit({id: this.id});
  }

}
