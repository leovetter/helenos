import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ViewAlbum } from '../../model/view-album.model';
import * as fromLibrary from '../../state';
import * as libraryActions from '../../state/albums.actions';

@Component({
  selector: 'hel-delete-album',
  templateUrl: './delete-album.component.html',
  styleUrls: ['./delete-album.component.scss']
})
export class DeleteAlbumComponent implements OnInit {

  @Input() album: ViewAlbum;
  @Output() hidePopup = new EventEmitter<null>();

  constructor(private store: Store<fromLibrary.State>) { }

  ngOnInit() {
  }

  hideDeletePopup() {
    this.hidePopup.emit();
  }

  deleteAlbum() {
    this.store.dispatch(new libraryActions.DeleteLibrary(this.album.id));
    this.hidePopup.emit();
  }

}
