import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import * as fromLibrary from '../../../albums/state';
import * as libraryActions from '../../../albums/state/albums.actions';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Album } from '../../../albums/model/album.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateMedia } from 'src/app/media/model/update-media.model';
import { AccountUser } from 'src/app/shared/model/account-user.model';
import * as fromShared from '../../../shared/state';
import { LibraryService } from '../../../albums/service/library.service';
import { SharedUser } from 'src/app/user/model/shared-user.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hel-smart-album',
  template: `
  <hel-album [library] = "library$ | async"
              [sharedUsers] = "sharedUsers$ | async"
              [isPerson]="isPerson"
              [shared]="shared"
              (editMedia)="editMedia($event)"
              (sortLibrary)="sortLibrary($event)"
              (filterLibrary)="filterLibrary($event)"
              (downloadLibrary)="downloadLibrary($event)"
              (reOrderAlbum)="reOrderAlbum($event)"
              (reloadAlbum)="reloadAlbum()">
  </hel-album>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartAlbumComponent implements OnInit, OnDestroy {

  library$: Observable<Album>;
  sharedUsers$: Observable<SharedUser[]>;
  person$: Observable<AccountUser>;
  
  isPerson = false;
  shared: boolean;
  idLibrary: number;

  constructor(private store: Store<fromLibrary.State>,
              private route: ActivatedRoute,
              private libraryService: LibraryService,
              private router: Router) { }

  ngOnInit() {

    this.route.url.subscribe(url => {

      if(url.join('/').indexOf('shared') !== -1) {
        this.shared = true;
      } else {
        this.shared = false;
        this.route.params.subscribe(params => {
          this.store.dispatch(new libraryActions.LoadSharedUsers(params.idLibrary));
        });
      }
    });

    this.route.params.subscribe(params => {
      this.idLibrary = params.idLibrary;
      this.store.dispatch(new libraryActions.LoadLibrary(params.idLibrary));
    });
    
    this.library$ = this.store.pipe(select(fromLibrary.getLibraryFeatureState));
    this.sharedUsers$ = this.store.pipe(select(fromLibrary.getSharedUsersFeatureState));
    this.person$ = this.store.pipe(select(fromShared.getUserFeatureState));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new libraryActions.SetLibrary(null));
  }

  editMedia(media: UpdateMedia) {
    this.store.dispatch(new libraryActions.SetEditMedia(media));
  }

  sortLibrary(selectedSort: string) {
    this.store.dispatch(new libraryActions.SortMedias(selectedSort));
  }

  filterLibrary(filter: string) {
    this.store.dispatch(new libraryActions.FilterMedias(filter));
  }

  removeMedia(idMedia: number) {
    this.store.dispatch(new libraryActions.DeleteMedia(idMedia));
  }

  // setAudioContext(audioContext: AudioContext) {
  //   this.store.dispatch(new sharedActions.SetAudioContext(audioContext));
  // }


  downloadLibrary(library: Album) {

    if(this.shared) {
      
      this.libraryService.downloadLibrary(library.title, library.ownedUserId).subscribe((downloadedFile) => {
        const blob = new Blob([downloadedFile], { type: 'application/zip' });
        const url= window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.download = library.title + ".zip";
        anchor.href = url;
        anchor.click();
      });
    } else {
      const subscribe = this.person$.subscribe((person: AccountUser) => {
        
        this.libraryService.downloadLibrary(library.title, person.id).subscribe((downloadedFile) => {
          const blob = new Blob([downloadedFile], { type: 'application/zip' });
          const url= window.URL.createObjectURL(blob);
          const anchor = document.createElement("a");
          anchor.download = library.title + ".zip";
          anchor.href = url;
          anchor.click();
        });
      });
      subscribe.unsubscribe();
    }
  }

  reOrderAlbum(indexes: number[]) {

    const sub = this.library$.subscribe(album => {
      this.store.dispatch(new libraryActions.ReOrderAlbum([album.id, ...indexes]));
    })
    sub.unsubscribe();
  }

  reloadAlbum() {

    console.log('reloadAlbum')
    this.store.dispatch(new libraryActions.LoadLibrary(this.idLibrary));
  }
}
