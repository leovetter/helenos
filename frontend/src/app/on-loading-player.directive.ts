import { Directive, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appOnLoadingPlayer]'
})
export class OnLoadingPlayerDirective {

  @Output('after-loading')
  public after: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  public ngAfterContentInit(): void {
    // timeout helps prevent unexpected change errors
    setTimeout(()=> this.after.next());
}
}
