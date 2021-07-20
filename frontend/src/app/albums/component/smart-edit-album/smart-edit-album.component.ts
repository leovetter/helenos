import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as fromLibrary from '../../state';
import * as libraryActions from '../../state/albums.actions';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EditAlbum } from '../../model/edit-album.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hel-smart-edit-album',
  template: `
  <hel-edit-album [library]="library$ | async"
                   [shared]="shared"
                   (editLibrary)="editLibrary($event)"
                   (setShowEditPanel)="setShowEditPanel($event)">
  </hel-edit-album>
  `,
})
export class SmartEditAlbumComponent implements OnInit {

  @Input() shared: boolean;
  @Output() hidePopup = new EventEmitter<null>();
  library$: Observable<EditAlbum>;

  constructor(private store: Store<fromLibrary.State>) { }

  ngOnInit() {
    this.library$ = this.store.pipe(select(fromLibrary.getCurrentEditLibraryFeatureState));
  }

  editLibrary(library: EditAlbum) {
    this.store.dispatch(new libraryActions.UpdateEditLibrary(library));
    this.hidePopup.emit();
  }

  // editSharedLibrary(library: EditLibrary) {
  //   this.store.dispatch(new libraryActions.UpdateSharedShortLibrary(library));
  //   this.hidePopup.emit();
  // }

  setShowEditPanel(isTrue: boolean) {
    // this.store.dispatch(new libraryActions.SetShowEditPanel(isTrue));
    this.hidePopup.emit();
  }
}
