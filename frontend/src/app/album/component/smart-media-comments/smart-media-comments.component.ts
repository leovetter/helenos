import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { MediaService } from 'src/app/core/service/media.service';
import { Media } from 'src/app/media/model/media.model';
import { Album } from '../../../albums/model/album.model';
import * as fromLibrary from '../../../albums/state';
import * as fromShared from '../../../shared/state';
import { AccountUser } from 'src/app/shared/model/account-user.model';
import * as libraryActions from '../../../albums/state/albums.actions';
import * as sharedActions from '../../../shared/state/shared.actions';
import { YoutubePlayerService } from '../../../albums/service/youtube-player.service';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'hel-smart-media-comments',
  template: `
    <hel-media-comments [media]="media"
                       [album]="album"
                       [user]="user"
                       (toRightMedia)="toRightMedia($event)"
                       (toLeftMedia)="toLeftMedia($event)"
                       (toCloseMedia)="toCloseMedia()"
                       (addCommentToMedia)="addCommentToMedia($event)"
                       (openPlayer)="openPlayer()"
                       (openImageEditor)="openImageEditor()">
    </hel-media-comments>
  `
})
export class SmartMediaCommentsComponent implements OnInit {
  
  @Input() idMedia: number;
  @Input() selectedSort: string;
  @Output() resetIdSelectedMedia = new EventEmitter<null>();
  @Output() goImageEditor = new EventEmitter<null>();
  media: any;
  album: Album;
  user: AccountUser;

  init = true;
  
  constructor(private mediaService: MediaService,
              private store: Store<fromLibrary.State>,
              private youtubePlayerService: YoutubePlayerService,
              private route: ActivatedRoute) { }

  ngOnInit() {

      this.store.pipe(select(fromLibrary.getLibraryFeatureState)).subscribe((album) => {
        this.album = album;
        this.media = this.album.medias.find(media => media.id === this.idMedia);
        if(this.media.type === 'video' && this.media.api === 'youtube') this.youtubePlayerService.openPlayer(this.media)
        if(this.init) {
          this.store.dispatch(new libraryActions.LoadComment(this.media.id));
          this.init = false;
        }
      });
    

    this.store.pipe(select(fromShared.getUserFeatureState)).subscribe(user => this.user = user);
  }

  toCloseMedia() {
    this.resetIdSelectedMedia.emit();
  }

  addCommentToMedia(comment: string) {

    this.store.dispatch(new libraryActions.AddComment({
      comment,
      idUser: this.user.id,
      idMedia: this.media.id
    }));
  }

  toRightMedia(idMedia: number) {

    const currentIndex = this.album.medias.findIndex(function (media: Media) { 
      return media.id === idMedia;
    });
    const nextMedia = this.findNextMedia(currentIndex, this.album.medias, true);
    if(nextMedia != null){
      this.media = nextMedia;
      this.idMedia = this.media.id;
      this.store.dispatch(new libraryActions.LoadComment(this.media.id));

      if(nextMedia.type === 'video' && nextMedia.api === 'youtube') {

        this.youtubePlayerService.toNextPlayer(nextMedia);
      }
    } else {

      this.resetIdSelectedMedia.emit();
      this.youtubePlayerService.destroyPlayer();
    }
  }

  toLeftMedia(idMedia: number) {

    const currentIndex = this.album.medias.findIndex(function (media: Media) { 
      return media.id === idMedia; 
    });
    const nextMedia = this.findNextMedia(currentIndex, this.album.medias, false);

    if(nextMedia != null){
      this.media = nextMedia;
      this.idMedia = this.media.id;
      this.store.dispatch(new libraryActions.LoadComment(this.media.id));

      if(nextMedia.type === 'video' && nextMedia.api === 'youtube') {

        this.youtubePlayerService.toNextPlayer(nextMedia);
      }
    } else {

      this.resetIdSelectedMedia.emit();
      this.youtubePlayerService.destroyPlayer();
    }
  }

  findNextMedia(idCurrentMedia: number, sortedMedias: Media[], next: boolean) {

    if(next && idCurrentMedia === sortedMedias.length - 1)
      return null
    if(!next && idCurrentMedia === 0)
      return null
    const nextMedia = next ? sortedMedias[idCurrentMedia  + 1] : sortedMedias[idCurrentMedia  - 1];
    if(nextMedia.type === 'image' || nextMedia.type === 'video' || nextMedia.type === 'sound') {
      return nextMedia;
    } else {
      const nextIndex = next ? idCurrentMedia  + 1 : idCurrentMedia  - 1;
      return this.findNextMedia(nextIndex, sortedMedias, next);
    }
  }

  openPlayer() {

    this.store.dispatch(new sharedActions.SetCurrentAudio({
      path: this.media.path, 
      name: this.media.name, 
      id: this.media.id,
      sortedMedias: this.album.medias,
      library: this.album,
      owner: this.album.ownedUserId,
      sort: this.selectedSort,
      paused: false,
      starting: true
    }));
    const sounds = this.album.medias.filter(media => media.type === 'sound');
    this.album.medias = sounds;
    this.store.dispatch(new sharedActions.SetAudioContext({
      library: this.album,
      owner: this.album.ownedUserId,
      sort: this.selectedSort,
      paused: false,
      fromYoutube: false
    }));
    this.resetIdSelectedMedia.emit();
    this.store.dispatch(new sharedActions.SetPlayer(true));
  }

  openImageEditor() {
    this.goImageEditor.emit();
  }
}
