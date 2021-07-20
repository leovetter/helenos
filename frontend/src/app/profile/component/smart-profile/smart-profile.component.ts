import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MediaService } from 'src/app/core/service/media.service';
import { AccountUser } from 'src/app/shared/model/account-user.model';
import { Album } from '../../../albums/model/album.model';
import * as fromLibrary from '../../../albums/state/';
import * as fromShared from '../../../shared/state/';
import * as libraryActions from '../../../albums/state/albums.actions';
import * as sharedActions from '../../../shared/state/shared.actions';

@Component({
  selector: 'app-smart-profile',
  template: `
  <pr-profil [user]="user$ | async"
             [library]="library$ | async"
             [person]="person"
             (getSharedLibraries)="getSharedLibraries()"
             (getLibraries)="getLibraries()"
             (loadLibrary)="loadLibrary($event)"
             (navigateSharedAlbums)="navigateSharedAlbums()"
             (navigateMyAlbums)="navigateMyAlbums()"
             (navigateAbout)="navigateAbout()"
             (editPicture)="editPicture($event)"
             (editCover)="editCover($event)">
  </pr-profil>`
})
export class SmartProfileComponent implements OnInit {

  user$: Observable<AccountUser>;
  library$: Observable<Album>;

  person = false;
  
  constructor(private store: Store<fromLibrary.State>,
              private router: Router,
              private mediaService: MediaService) { }

  ngOnInit() {

    this.user$ = this.store.pipe(select(fromShared.getUserFeatureState));
    this.library$ = this.store.pipe(select(fromLibrary.getLibraryFeatureState));
  }

  getSharedLibraries() {
    this.store.dispatch(new libraryActions.LoadSharedShortLibraries('creationDate'));
  }

  getLibraries() {
    this.store.dispatch(new libraryActions.LoadShortLibraries('creationDate'));
  }

  loadLibrary(idLibrary: number) {
    if(!idLibrary) {
      this.store.dispatch(new libraryActions.SetLibrary(null));
    } else {
      this.store.dispatch(new libraryActions.LoadLibrary(idLibrary));
    }
  }

  navigateSharedAlbums() {
    this.router.navigateByUrl('/profile/me/albums/shared');
  }

  navigateMyAlbums() {
    this.router.navigateByUrl('/profile/me/albums');
  }

  navigateAbout() {
    this.router.navigateByUrl('/profile/me/about');
  }

  editPicture(event) {
    const fd = event.fd;
    const user = event.user;
    this.mediaService.uploadMedias(fd, 'profil').subscribe(event => {
      if (event.type === HttpEventType.Response) {
        this.store.dispatch(new sharedActions.SaveUser(user));
      }
    });
  }

  editCover(event) {
    const fd = event.fd;
    const user = event.user;
    this.mediaService.uploadMedias(fd, 'cover').subscribe(event => {
      if (event.type === HttpEventType.Response) {
        this.store.dispatch(new sharedActions.SaveUser(user));
      }
    });
  }
}
