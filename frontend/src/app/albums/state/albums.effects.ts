import { Injectable } from '@angular/core';

import { Observable, of, forkJoin } from 'rxjs';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';

/* NgRx */
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as libraryActions from './albums.actions';
import * as fromLibrary from './index';
import { LibraryService } from '../service/library.service';
import { UserService } from 'src/app/core/service/user.service';
import { Router } from '@angular/router';
import { SharedUser } from 'src/app/user/model/shared-user.model';
import { ViewAlbum } from '../model/view-album.model';
import { Album } from '../model/album.model';
import { MediaService } from 'src/app/core/service/media.service';
import { FileService } from 'src/app/core/service/file.service';
import { Media } from 'src/app/media/model/media.model';
import { UpdateMedia } from 'src/app/media/model/update-media.model';
import * as fromShared from 'src/app/shared/state';

@Injectable()
export class AlbumsEffects {

  constructor(private libraryService: LibraryService,
              private fileService: FileService,
              private mediaService: MediaService,
              private userService: UserService,
              private actions$: Actions,
              private router: Router,
              private store: Store<fromLibrary.State>,
              private storeShared: Store<fromShared.State>,) { }

  @Effect()
  loadLibraries$: Observable<Action> = this.actions$.pipe(
    ofType(libraryActions.AlbumsActionTypes.LoadShortLibraries),
    mergeMap((action: libraryActions.LoadShortLibraries) =>
      this.libraryService.getAllByUser(action.payload).pipe(
        map(libraries => (new libraryActions.LoadSuccesShortLibraries(libraries))),
        catchError(err => of(new libraryActions.LoadFailShortLibraries(err)))
      )
    )
  );

  @Effect()
  loadCurrentEditLibrary$: Observable<Action> = this.actions$.pipe(
    ofType(libraryActions.AlbumsActionTypes.LoadCurrentEditLibrary),
    mergeMap((action: libraryActions.LoadCurrentEditLibrary) =>
      this.libraryService.getEditLibrary(action.payload).pipe(
        map(editLibrary => (new libraryActions.LoadSuccesCurrentEditLibrary(editLibrary))),
        catchError(err => of(new libraryActions.LoadFailCurrentEditLibrary(err)))
      )
    )
  );

  @Effect()
  loadSharedLibraries$: Observable<Action> = this.actions$.pipe(
    ofType(libraryActions.AlbumsActionTypes.LoadSharedShortLibraries),
    mergeMap((action: libraryActions.LoadSharedShortLibraries) =>
      this.libraryService.getAllSharedByUser(action.payload).pipe(
        map(libraries => (new libraryActions.LoadSuccesSharedShortLibraries(libraries))),
        catchError(err => of(new libraryActions.LoadFailSharedShortLibraries(err)))
      )
    )
  );

  @Effect()
  saveLibrary$: Observable<Action> = this.actions$.pipe(
    ofType(libraryActions.AlbumsActionTypes.SaveLibrary),
    mergeMap((action: libraryActions.SaveLibrary) => {
      return this.libraryService.addLibrary(action.payload).pipe(
        map(library => new libraryActions.SaveSuccesLibrary(library)),
        catchError(err => of(new libraryActions.SaveFailLibrary(err)))
      );
      })
  );

  @Effect({dispatch: false})
  saveSuccesLibrary$: Observable<Action> = this.actions$.pipe(
    ofType(libraryActions.AlbumsActionTypes.SaveSuccesLibrary),
    tap((action: libraryActions.SaveSuccesLibrary) => {

      this.storeShared.pipe(select(fromShared.getSettingsFeatureState)).subscribe(settings => {
        console.log(settings)
        if(settings.driveSocial.indexOf('social') !== -1) this.router.navigateByUrl('/profile/me/albums/new/' + action.payload.id +  '/users');
        if(settings.driveSocial.indexOf('drive') !== -1) this.router.navigateByUrl('/drive');
        // 
      })
      
    })
  );

  @Effect()
  loadSuggestUsers$: Observable<Action> = this.actions$.pipe(
    ofType(libraryActions.AlbumsActionTypes.LoadSuggestUsers),
    mergeMap((action: libraryActions.LoadSuggestUsers) =>
      this.userService.findSharedUsers(action.payload).pipe(
        map(sharedUsers => (new libraryActions.LoadSuccesSuggestUsers(sharedUsers))),
        catchError(err => of(new libraryActions.LoadFailSuggestUsers(err)))
      )
    )
  );

  @Effect()
  saveSharedUsers$: Observable<Action> = this.actions$.pipe(
    ofType(libraryActions.AlbumsActionTypes.SaveSharedUsers),
    mergeMap((action: libraryActions.SaveSharedUsers) =>
      this.userService.saveSharedUsers(action.payload).pipe(
        tap((sharedUsers: SharedUser[]) => {
          // this.router.navigateByUrl('/profile/me/album/' + sharedUsers[0].libraryId);
          // window.scroll(0, 0);
        }),
        map((sharedUsers: SharedUser[]) => (new libraryActions.SaveSuccesSharedUsers())),
        catchError(err => of(new libraryActions.LoadFailSuggestUsers(err)))
      )
    )
  );

  @Effect()
  loadLibrary$: Observable<Action> = this.actions$.pipe(
    ofType(libraryActions.AlbumsActionTypes.LoadLibrary),
    mergeMap((action: libraryActions.LoadLibrary) =>
      this.libraryService.getLibrary(action.payload).pipe(
        tap((library: Album) => {
          const urls = [];
          library.medias.forEach(() => urls.push('noImages'));
          this.store.dispatch(new libraryActions.SetUrls(urls));
        }),
        map((library: Album) => new libraryActions.LoadSuccesLibrary(library)),
        catchError(err => of(new libraryActions.LoadFailLibrary(err)))
      )
    )
  );

  @Effect()
  updateEditLibrary$: Observable<Action> = this.actions$.pipe(
    ofType(libraryActions.AlbumsActionTypes.UpdateEditLibrary),
    mergeMap((action: libraryActions.UpdateEditLibrary) => {
      return forkJoin(
              this.fileService.updatePathLibrary(action.payload),
              this.libraryService.updateLibrary(action.payload)).pipe(
        map(res => new libraryActions.UpdateSuccesEditLibrary(res[1])),
        catchError(err => of(new libraryActions.UpdateFailEditLibrary(err)))
      );
      })
  );

  // @Effect()
  // updateSharedShortLibrary$: Observable<Action> = this.actions$.pipe(
  //   ofType(libraryActions.AlbumsActionTypes.UpdateSharedShortLibrary),
  //   mergeMap((action: libraryActions.UpdateSharedShortLibrary) => {
  //     return forkJoin(
  //             this.fileService.updatePathLibrary(action.payload),
  //             this.libraryService.updateLibrary(action.payload)).pipe(
  //       map(res => new libraryActions.UpdateSuccesSharedShortLibrary(res[1])),
  //       catchError(err => of(new libraryActions.UpdateFailSharedShortLibrary(err)))
  //     );
  //     })
  // );

  // @Effect({dispatch: false})
  // updateSuccesShortLibrary$: Observable<Action> = this.actions$.pipe(
  //   ofType(libraryActions.AlbumsActionTypes.UpdateSuccesShortLibrary),
  //   tap(() => new libraryActions.SetShowEditPanel(false))
  // );

  @Effect()
  addLibraries$: Observable<Action> = this.actions$.pipe(
    ofType(libraryActions.AlbumsActionTypes.AddLibraries),
    mergeMap((action: libraryActions.AddLibraries) => {
      return this.libraryService.addLibraries(action.payload, action.selectedSort).pipe(
        map((libraries: ViewAlbum[]) => new libraryActions.AddSuccesLibraries(libraries)),
        catchError(err => of(new libraryActions.AddFailLibraries(err)))
      );
      })
  );

  @Effect()
  deleteLibrary$: Observable<Action> = this.actions$.pipe(
    ofType(libraryActions.AlbumsActionTypes.DeleteLibrary),
    mergeMap((action: libraryActions.DeleteLibrary) =>
      this.libraryService.deleteLibrary(action.payload).pipe(
        map(() => new libraryActions.DeleteSuccesLibrary(action.payload)),
        catchError(err => of(new libraryActions.DeleteFailLibrary(err)))
      )
    )
  );

  @Effect()
  deleteImage$: Observable<Action> = this.actions$.pipe(
    ofType(libraryActions.AlbumsActionTypes.DeleteMedia),
    mergeMap((action: libraryActions.DeleteMedia) =>
      this.mediaService.deleteMedia(action.payload).pipe(
        map(() => new libraryActions.DeleteSuccesMedia(action.payload)),
        catchError(err => of(new libraryActions.DeleteFailMedia(err)))
      )
    )
  );

  @Effect()
  addMediasToLibrary$: Observable<Action> = this.actions$.pipe(
    ofType(libraryActions.AlbumsActionTypes.AddMediasToLibrary),
    mergeMap((action: libraryActions.AddMediasToLibrary) =>
      this.mediaService.addMediasToLibrary(action.id, action.payload).pipe(
        map((medias: Media[]) => new libraryActions.AddMediasSuccessToLibrary(medias)),
        catchError(err => of(new libraryActions.AddMediasFailToLibrary(err)))
      )
    )
  );

  @Effect()
  updateMediaAction$: Observable<Action> = this.actions$.pipe(
    ofType(libraryActions.AlbumsActionTypes.UpdateMediaAction),
    mergeMap((action: libraryActions.UpdateMediaAction) =>
      this.mediaService.updateMedia(action.payload).pipe(
        map((media: UpdateMedia) => {
          this.store.dispatch(new libraryActions.UpdateSuccesMedia(media));
          return new libraryActions.UpdateSuccesMedia(media);
        }),
        catchError(err => of(new libraryActions.UpdateFailMedia(err)))
      )
    )
  );

  @Effect()
  loadSharedUsers$: Observable<Action> = this.actions$.pipe(
    ofType(libraryActions.AlbumsActionTypes.LoadSharedUsers),
    mergeMap((action: libraryActions.LoadSharedUsers) =>
      this.userService.loadSharedUsers(action.payload).pipe(
        map((sharedUsers: SharedUser[]) => (new libraryActions.LoadSuccesSharedUsers(sharedUsers))),
        catchError(err => of(new libraryActions.LoadFailSharedUsers(err)))
      )
    )
  );

  @Effect()
  addComment$: Observable<Action> = this.actions$.pipe(
    ofType(libraryActions.AlbumsActionTypes.AddComment),
    mergeMap((action: libraryActions.AddComment) =>
      this.mediaService.addComment(action.payload).pipe(
        map((comment: any) => new libraryActions.AddSuccessComment(comment)),
        catchError(err => of(new libraryActions.AddFailComment(err)))
      )
    )
  );

  @Effect()
  loadComment$: Observable<Action> = this.actions$.pipe(
    ofType(libraryActions.AlbumsActionTypes.LoadComment),
    mergeMap((action: libraryActions.LoadComment) =>
      this.mediaService.loadComment(action.payload).pipe(
        map((comments: Array<Comment>) => new libraryActions.LoadSuccessComment(comments)),
        catchError(err => of(new libraryActions.LoadFailComment(err)))
      )
    )
  );

  @Effect()
  reOrderAlbum$: Observable<Action> = this.actions$.pipe(
    ofType(libraryActions.AlbumsActionTypes.ReOrderAlbum),
    mergeMap((action: libraryActions.ReOrderAlbum) =>
      this.libraryService.reOrderAlbum(action.payload).pipe(
        map((album: Album) => new libraryActions.ReOrderAlbumSuccess(album)),
        catchError(err => of(new libraryActions.ReOrderAlbumFail(err)))
      )
    )
  );
}
