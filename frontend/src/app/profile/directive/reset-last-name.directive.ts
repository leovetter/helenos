import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[appResetLastName]'
})
export class ResetLastNameDirective {

  @Output() resetFieldLastName = new EventEmitter<any>();
  subscribe: Subscription;
  

  constructor(private el: ElementRef) { }

  public ngAfterContentInit(): void {
    
    const body = document.querySelector('body') as HTMLElement;
    const source = fromEvent(body, 'click');
    this.subscribe = source.subscribe(event => {
      if(event.target['id'] != this.el.nativeElement.id && event.target['id'] !== 'info-last-name' && event.target['id'] !== 'about-tab')
        this.resetFieldLastName.emit();
    });
    
    
  }

  public ngOnDestroy(): void {
    
    this.subscribe.unsubscribe();
  }

}
