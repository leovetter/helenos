import { Directive } from '@angular/core';

@Directive({
  selector: '[appOnLoadingAboutSection]'
})
export class OnLoadingAboutSectionDirective {

  constructor() { }

  public ngAfterContentInit(): void {

      const aboutTab = document.querySelector('#about-tab') as HTMLElement;
      const tabs = document.querySelector('.tabs') as HTMLElement;
      const aboutSection = document.querySelector('.about-section') as HTMLElement;
      aboutSection.style.marginLeft = `${aboutTab.offsetLeft + Number(window.getComputedStyle(tabs).marginLeft.substr(0,2))}px`;
  }

}
