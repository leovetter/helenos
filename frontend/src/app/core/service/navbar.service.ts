import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private smallNavbar = new BehaviorSubject(null);
  sharedSmallNavbar = this.smallNavbar.asObservable();

  constructor() { }

  nextSmallNavbar(smallNavbar: boolean) {
    this.smallNavbar.next(smallNavbar)
  }
}
