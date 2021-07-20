import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[appResetFirstName]'
})
export class ResetFirstNameDirective {

  @Output() resetFieldFirstName = new EventEmitter<any>();
  subscribe: Subscription;
  

  constructor(private el: ElementRef) { }

  public ngAfterContentInit(): void {
    
    const body = document.querySelector('body') as HTMLElement;
    const source = fromEvent(body, 'click');
    this.subscribe = source.subscribe(event => {
      if(event.target['id'] != this.el.nativeElement.id && event.target['id'] !== 'info-first-name' && event.target['id'] !== 'about-tab')
        this.resetFieldFirstName.emit();
    });
  }

  public ngOnDestroy(): void {
    
    this.subscribe.unsubscribe();
  }
}
