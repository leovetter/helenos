import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromLibrary from '../../state';
import * as libraryActions from '../../state/albums.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SharedUser } from 'src/app/user/model/shared-user.model';
import { AddUsersAlbumComponent } from '../add-users-album/add-users-album.component';
import { ISubscription } from 'rxjs/Subscription';
import { LibraryService } from '../../service/library.service';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lb-smart-add-users-library',
  template: `
  <hel-add-users-library [suggestUsers]="suggestUsers$ | async"
                        [sharedUsers]="sharedUsers"
                        [idLibrary]="libraryIndex$ | async"
                        (searchUserTerm)="newSearchUserTerm($event)"
                        (newSharedUsers)="newSharedUsers($event)"
                        (saveSharedUsers)="saveSharedUsers($event)"
                        (deleteSharedUser)="deleteSharedUser($event)"
                        (setVisibilityAlbum)="setVisibilityAlbum($event)"
                        #addUsersLibraryComponent>
  </hel-add-users-library>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartAddUsersAlbumComponent implements OnInit, OnDestroy {

  suggestUsers$: Observable<SharedUser[]>;
  sharedUsers: SharedUser[];
  libraryIndex$: Observable<number>;
  routeSub: ISubscription;
  @ViewChild('addUsersLibraryComponent', {static: false, read: AddUsersAlbumComponent})
  addUsersLibraryComponent: AddUsersAlbumComponent;

  constructor(private store: Store<fromLibrary.State>,
              private route: ActivatedRoute,
              private router: Router,
              private libraryService: LibraryService,
              private userService: UserService) { }

  ngOnInit() {

    console.log('SmartAddUsersLibraryComponent')
    // Get the if of the library from the route and send a action to set libraryIndex
    this.routeSub = this.route.params.subscribe( (params: any) => {
                      this.store.dispatch(new libraryActions.SetLibraryIndex(+params.idLibrary));
                    });

    this.sharedUsers = [];
    this.libraryIndex$ = this.store.pipe(select(fromLibrary.getLibraryIndexFeatureState));
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  newSearchUserTerm(searchTerm: string) {
    // this.store.dispatch(new libraryActions.LoadSuggestUsers(searchTerm));
    this.suggestUsers$ = this.userService.findSharedUsers(searchTerm);
  }

  newSharedUsers(user: SharedUser) {
    // this.store.dispatch(new libraryActions.AddSharedUsers(user));
    this.sharedUsers.push(user);
  }

  saveSharedUsers(users: SharedUser[]) {
    console.log('saveSharedUsers')
    // this.store.dispatch(new libraryActions.SaveSharedUsers(users));
    if(users.length !=0) {

      this.userService.saveSharedUsers(users).subscribe(() => {
        const sub = this.libraryIndex$.subscribe(ind => {
          this.router.navigateByUrl('/profile/me/album/' + ind);
        });
        sub.unsubscribe();
      });
    } else {

      const sub = this.libraryIndex$.subscribe(ind => {
        this.router.navigateByUrl('/profile/me/album/' + ind);
      });
      sub.unsubscribe();
    }
    
  }

  deleteSharedUser(user: SharedUser) {
    // this.store.dispatch(new libraryActions.DeleteSharedUser(idUser));
    const index = this.sharedUsers.indexOf(user);
    this.sharedUsers.splice(index, 1);
  }

  setVisibilityAlbum(event) {
    this.libraryService.setVisibilityAlbum(event.idAlbum, event.isPublic).subscribe();
  }
}
