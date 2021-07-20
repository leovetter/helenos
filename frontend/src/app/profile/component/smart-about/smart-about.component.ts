import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccountUser } from 'src/app/shared/model/account-user.model';
import * as fromLibrary from '../../../albums/state';
import * as fromShared from '../../../shared/state';
import * as sharedActions from '../../../shared/state/shared.actions';

@Component({
  selector: 'lb-smart-about',
  template: `
  <lb-about [user]="user$ | async"
            [person]="person"
            (editUser)="editUser($event)">
  </lb-about>
  `,
})
export class SmartAboutComponent implements OnInit {

  user$: Observable<AccountUser>;

  person = false;
  
  constructor(private store: Store<fromLibrary.State>) { }

  ngOnInit() {

    this.user$ = this.store.pipe(select(fromShared.getUserFeatureState));
  }

  editUser(user: AccountUser) {
    this.store.dispatch(new sharedActions.SaveUser(user));
  }

}
