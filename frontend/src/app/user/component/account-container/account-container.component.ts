import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromUser from '../../state/';
import * as fromShared from '../../../shared/state/';
import * as userActions from './../../state/user.actions';
import * as sharedActions from '../../../shared/state/shared.actions';
import { AccountUser } from '../../../shared/model/account-user.model';
import { AuthenticateService } from 'src/app/core/service/authenticate.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'usr-account-container',
  template: `
  <usr-account [user] = "user$ | async"
               (editUser) = "editUser($event)">
</usr-account>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountContainerComponent implements OnInit {

  user$: Observable<AccountUser>;

  constructor(private store: Store<fromUser.State>,
              private authService: AuthenticateService) { }

  ngOnInit() {
    // Load the user
    this.store.dispatch(new sharedActions.LoadUser(this.authService.getUserId()));
    // Listen to the store for changes in the user and errorMessage variables
    this.user$ = this.store.pipe(select(fromShared.getUserFeatureState));
  }

  /**
   * Trigger when a user submit the form
   */
  editUser(user: AccountUser) {
    // Send a action to edit the user
    this.store.dispatch(new sharedActions.SaveUser(user));
  }
}
