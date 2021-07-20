import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromLibrary from '../../state';
import * as libraryActions from '../../state/albums.actions';
import { AddAlbumComponent } from '../add-album/add-album.component';
import * as fromShared from '../../../shared/state';
import { AccountUser } from 'src/app/shared/model/account-user.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hel-smart-add-library',
  template: `
  <hel-add-album [progress]="progress"
                  [user]="user$ | async"
                  (setProgressRate)="setProgressRate($event)">
  </hel-add-album>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartAddAlbumComponent implements OnInit {

  progress: number;
  user$: Observable<AccountUser>;
  @ViewChild(AddAlbumComponent, {static: false, read: AddAlbumComponent}) addLibraryComponent: AddAlbumComponent;

  constructor(private store: Store<fromLibrary.State>) { }

  ngOnInit() {

    // Listen to the store for changes in the errorMessage
    // and progress variables
    // this.progress$ = this.store.pipe(select(fromLibrary.getProgressFeatureState));
    this.user$ = this.store.pipe(select(fromShared.getUserFeatureState));
  }

  setProgressRate(progress: number) {
    this.progress = progress;
  }

  /**
   * Check if the child component is dirty that is if the user added a title
   * or uploaded images. Function used by the isNotDirtyGuard guard.
   */
  isDirty() {
    return (this.addLibraryComponent.addLibraryForm.dirty || this.addLibraryComponent.selectedFiles.length > 0)
            && !this.addLibraryComponent.addLibraryFormId.submitted;
  }

}
