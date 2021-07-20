import { Injectable } from '@angular/core';
import { UserService } from '../../core/service/user.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import * as sharedActions from './shared.actions';
import { AccountUser } from '../model/account-user.model';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class SharedEffects {

  constructor(private userService: UserService,
    private actions$: Actions,
    private router: Router,
    private toastr: ToastrService,
    private translateService: TranslateService) { }

  // Define the effects for our feature
  @Effect()
  loadUser$: Observable<Action> = this.actions$.pipe(
    ofType(sharedActions.SharedActionTypes.LoadUser),
    mergeMap((action: sharedActions.LoadUser) => {
      return this.userService.getAccountUser(action.payload).pipe(
        map(user => (new sharedActions.LoadSuccesUser(user))),
        catchError(err => of(new sharedActions.LoadFailUser(err)))
      );
    })
  );

  @Effect()
  saveUser$: Observable<Action> = this.actions$.pipe(
    ofType(sharedActions.SharedActionTypes.SaveUser),
    mergeMap((action: sharedActions.SaveUser) =>
      this.userService.saveAccountUser(action.payload).pipe(
        map((user: AccountUser) => {
          return new sharedActions.SaveSuccesUser(user);
        }),
        catchError(err => of(new sharedActions.SaveFailUser(err)))
      )
    )
  );

  @Effect()
  LoadPerson$: Observable<Action> = this.actions$.pipe(
    ofType(sharedActions.SharedActionTypes.LoadPerson),
    mergeMap((action: sharedActions.LoadPerson) =>
      this.userService.getAccountUser(action.payload).pipe(
        map(libraries => (new sharedActions.LoadSuccesPerson(libraries))),
        catchError(err => of(new sharedActions.LoadFailPerson(err)))
      )
    )
  );

  @Effect()
  loadSettings$: Observable<Action> = this.actions$.pipe(
    ofType(sharedActions.SharedActionTypes.LoadSettings),
    mergeMap((action: sharedActions.LoadSettings) => {
      return this.userService.loadSettings(action.payload).pipe(
        map(settings => (new sharedActions.LoadSettingsSuccess(settings))),
        catchError(err => of(new sharedActions.LoadSettingsFail(err)))
      );
    })
  );

  @Effect({dispatch: false})
  loadSettingsSuceces$: Observable<Action> = this.actions$.pipe(
    ofType(sharedActions.SharedActionTypes.LoadSettingsSuccess),
    tap((settings: sharedActions.LoadSettingsSuccess) => {
      console.log(settings)
      if (settings.payload.driveSocial === 'social') this.router.navigateByUrl(this.router.createUrlTree(
        ['/profile/me/albums'], {queryParams: { shared: false }}
      ));
      if (settings.payload.driveSocial === 'drive') this.router.navigateByUrl('drive');
      
    })
  );

  
}
