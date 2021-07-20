import { Injectable } from '@angular/core';

import { Observable, of, forkJoin } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';

/* NgRx */
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as profileActions from './profile.actions';
import * as fromProfile from './index';
import { UserService } from 'src/app/core/service/user.service';
import { Router } from '@angular/router';
import { MediaService } from 'src/app/core/service/media.service';
import { FileService } from 'src/app/core/service/file.service';

@Injectable()
export class ProfileEffects {

  constructor(private userService: UserService,
              private actions$: Actions) { }

  
}
