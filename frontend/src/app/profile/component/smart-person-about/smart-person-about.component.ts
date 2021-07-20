import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountUser } from 'src/app/shared/model/account-user.model';
import * as fromShared from '../../../shared/state';

@Component({
  selector: 'app-smart-person-about',
  template: `
  <lb-about [user]="user$ | async"
            [person]="person">
  </lb-about>
  `
})
export class SmartPersonAboutComponent implements OnInit {

  user$: Observable<AccountUser>;

  person = true;
  
  constructor(private store: Store<fromShared.State>,) { }

  ngOnInit() {

    this.user$ = this.store.pipe(select(fromShared.getPersonFeatureState));
  }

}
