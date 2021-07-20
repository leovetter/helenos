import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateMedia } from '../../../media/model/update-media.model';
import { Store, select } from '@ngrx/store';
import * as fromLibrary from '../../../albums/state';
import * as libraryActions from '../../../albums/state/albums.actions';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hel-smart-edit-media',
  template: `
  <hel-edit-media [media]="media$ | async"
                  (editMedia)="editMedia($event)"
                  (hideEditPopup)="hideEditPopup()">
  </hel-edit-media>
  `,
})
export class SmartEditMediaComponent implements OnInit {

  media$: Observable<UpdateMedia>;
  @Output() hidePopup = new EventEmitter<null>();

  constructor(private store: Store<fromLibrary.State>) { }

  ngOnInit() {
    this.media$ = this.store.pipe(select(fromLibrary.getCurrentMediaFeatureState));
  }

  editMedia(media: UpdateMedia) {
    this.store.dispatch(new libraryActions.UpdateMediaAction(media));
    this.hideEditPopup();
  }

  hideEditPopup() {
    this.hidePopup.emit();
  }
}
