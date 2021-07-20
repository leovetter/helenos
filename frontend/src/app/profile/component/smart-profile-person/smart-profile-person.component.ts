import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Album } from 'src/app/albums/model/album.model';
import { AccountUser } from 'src/app/shared/model/account-user.model';
import * as fromShared from '../../../shared/state/';
import * as sharedActions from '../../../shared/state/shared.actions';
import * as fromLibrary from '../../../albums/state/';
import * as libraryActions from '../../../albums/state/albums.actions';

@Component({
  selector: 'app-smart-profile-person',
  template: `
    <pr-profil [user]="user$ | async"
               [library]="library$ | async"
               [person]="person"
               (loadLibrary)="loadLibrary($event)"
               (navigateMyAlbums)="navigateMyAlbums()"
               (navigateAbout)="navigateAbout()">
    </pr-profil>
  `
})
export class SmartProfilePersonComponent implements OnInit {

  user$: Observable<AccountUser>;
  library$: Observable<Album> = of(null);

  person = true;

  constructor(private router: Router,
              private store: Store<fromShared.State>,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.store.dispatch(new sharedActions.LoadPerson(params.idUser));
    });

    this.user$ = this.store.pipe(select(fromShared.getPersonFeatureState));
    this.library$ = this.store.pipe(select(fromLibrary.getLibraryFeatureState));
  }

  loadLibrary(idLibrary: number) {
    this.store.dispatch(new libraryActions.LoadLibrary(idLibrary));
  }

  navigateMyAlbums() {
    this.store.dispatch(new libraryActions.SetLibrary(null));
    this.router.navigateByUrl('/profile/121/albums');
    this.user$.subscribe(user => {
      this.router.navigateByUrl(`/profile/${user.id}/albums`);
    });
  }

  navigateAbout() {

    this.store.dispatch(new libraryActions.SetLibrary(null));
    this.user$.subscribe(user => {
      this.router.navigateByUrl(`/profile/${user.id}/about`);
    });
  }

}
