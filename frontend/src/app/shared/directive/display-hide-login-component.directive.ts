import { Directive, HostListener, OnInit, Output, EventEmitter } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[coreDisplayHideLoginComponent]',
  exportAs: 'coreDisplayHideLoginComponent',
})
export class DisplayHideLoginComponentDirective implements OnInit {

  showLoginView = false;
  appRootClick = false;
  @Output() setShowLoginView = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
    // Add a click listener to the login button to decide whether or not
    // to display / hide the login component
    document.getElementsByClassName('large-header')[0].parentNode.parentNode.addEventListener('click', this.changeVisibility.bind(this));
    // document.getElementsByClassName('small-header')[0].parentNode.parentNode.addEventListener('click', this.changeVisibility.bind(this));
  }

  /**
   * Decide whether or not to display / hide the login component
   * @param event The object associated with the click event
   */
  changeVisibility(event: MouseEvent) {
    let loginFormContainerElement: Element;
    window.innerWidth < 700 ? loginFormContainerElement = document.getElementsByClassName('login-container')[1]:
                              loginFormContainerElement = document.getElementsByClassName('login-container')[0];
    if (loginFormContainerElement && !loginFormContainerElement.contains(event.target as Node)) {
      if (this.showLoginView && this.appRootClick) {
        this.setShowLoginView.emit(false);
        this.appRootClick = false;
        this.showLoginView = false;
      } else if (this.showLoginView && !this.appRootClick) {
        this.appRootClick = true;
      }
    }
    if (!this.showLoginView && this.appRootClick) {
      this.appRootClick = false;
    }
  }

  /**
   * Triggered when the user click on the login button
   * Set the variables used to determine if we have to
   * display / hide the login component
   */
  clearDisplayLoginView() {
    if (this.showLoginView) {
      this.showLoginView = false;
      this.setShowLoginView.emit(false);
    } else {
      this.showLoginView = true;
      this.setShowLoginView.emit(true);
    }
  }
}
