import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Media } from 'src/app/media/model/media.model';
import * as fromLibrary from '../../../albums/state';
import * as libraryActions from '../../../albums/state/albums.actions';

@Component({
  selector: 'hel-delete-media',
  templateUrl: './delete-media.component.html',
  styleUrls: ['./delete-media.component.scss']
})
export class DeleteMediaComponent implements OnInit {

  @Input() media: Media;
  @Output() hidePopup = new EventEmitter<null>();

  constructor(private store: Store<fromLibrary.State>) { }

  ngOnInit() {
  }

  hideDeletePopup() {
    this.hidePopup.emit();
  }

  deleteMedia() {
    this.store.dispatch(new libraryActions.DeleteMedia(this.media.id));
    this.hidePopup.emit();
  }

}
