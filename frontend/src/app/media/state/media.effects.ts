import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';

/* NgRx */
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as mediaActions from './media.actions';
import * as libraryActions from '../../albums/state/albums.actions';
import { MediaService } from '../../core/service/media.service';
import { UpdateMedia } from '../model/update-media.model';
import * as fromMedia from './index';

@Injectable()
export class MediaEffects {

  constructor(private actions$: Actions,
              private mediaService: MediaService,
              private store: Store<fromMedia.State>) { }

  @Effect()
  updateMediaAction$: Observable<Action> = this.actions$.pipe(
    ofType(mediaActions.MediaActionTypes.UpdateMediaAction),
    mergeMap((action: mediaActions.UpdateMediaAction) =>
      this.mediaService.updateMedia(action.payload).pipe(
        map((media: UpdateMedia) => {
          this.store.dispatch(new mediaActions.UpdateSuccesMedia());
          return new libraryActions.UpdateSuccesMedia(media);
        }),
        catchError(err => of(new mediaActions.UpdateFailMedia(err)))
      )
    )
  );
}
