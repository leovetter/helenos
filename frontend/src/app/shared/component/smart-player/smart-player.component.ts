import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Album } from 'src/app/albums/model/album.model';
import { Media } from 'src/app/media/model/media.model';
import { CurrentAudio } from '../../model/current-audio.model';
import { AudioContext } from '../../model/audio-context.model';
import * as fromShared from '../../state';
import * as sharedActions from '../../state/shared.actions';

@Component({
  selector: 'sh-smart-player',
  template: `
    <sh-player [currentAudio]="currentAudio$ | async"
               [audioContext]="audioContext$ | async"
               [isPlaying]="isPlaying"
               (toLeftAudio)="toLeftAudio($event)"
               (toRightAudio)="toRightAudio($event)"
               (toPlayAudio)="toPlayAudio()"
               (toPauseAudio)="toPauseAudio()"
               (toStopPlayer)="toStopPlayer()"
               (toSetProgress)="toSetProgress($event)"
               (toSetCurrentAudio)="toSetCurrentAudio($event)">
    </sh-player>
  `
})
export class SmartPlayerComponent implements OnInit {

  currentAudio$: Observable<CurrentAudio>;
  audioContext$: Observable<AudioContext>;

  isPlaying = true;
  
  constructor(private store: Store<fromShared.State>) { }

  ngOnInit() {

    this.currentAudio$ = this.store.pipe(select(fromShared.getCurrentAudioState));
    this.audioContext$ = this.store.pipe(select(fromShared.getAudioContextState));
    
    this.currentAudio$.subscribe((currentAudio: CurrentAudio) => {

      if(currentAudio != null && currentAudio.starting) {

        setTimeout(() => {
          const audioPlayer = document.getElementById("audioPlayer") as HTMLMediaElement;
          const coverPlayer = document.getElementById("cover") as HTMLImageElement;
          if(audioPlayer) {
            audioPlayer.load();
            audioPlayer.oncanplay = function() {
              if(this.isPlaying) {
                audioPlayer.play();
                coverPlayer.style.animationPlayState = "running";
                this.isPlaying = true;
              } else {
                audioPlayer.currentTime = 0;
              }
            }.bind(this);
            audioPlayer.addEventListener('timeupdate', this.updateProgress);
            audioPlayer.addEventListener('ended', this.goNextTrack.bind(this));
          }
          }, 500);
      }
    });
  }

  toLeftAudio(idMedia: number) {

    let nextMedia: Media;
    let sort: string;
    let library: Album;
    let sortedMedias: Media[];
    const subscribe = this.currentAudio$.subscribe((currentAudio: CurrentAudio) => {

      if(currentAudio != null) {
        sortedMedias = currentAudio.sortedMedias;
        library = currentAudio.library;
        const currentIndex = sortedMedias.findIndex(function (media: Media) { 
          return media.id === idMedia; 
        });

        nextMedia = this.findNextMedia(currentIndex, sortedMedias, false);
        sort = currentAudio.sort;
        library = currentAudio.library;
      }
    });
    subscribe.unsubscribe();
    if(nextMedia && nextMedia.type === 'sound') {
      const audioPlayer = document.getElementById("audioPlayer") as HTMLMediaElement;
      audioPlayer.src = "";
      audioPlayer.currentTime = 0;
      this.store.dispatch(new sharedActions.SetCurrentAudio({ 
        path: nextMedia.path, 
        name: nextMedia.name, 
        id: nextMedia.id,
        library: library,
        sortedMedias,
        owner: library.ownedUserId,
        sort: sort,
        paused: false,
        starting: false
      }));
    }
  }

  toRightAudio(idMedia: number) {

    let nextMedia: Media;
    let sort: string;
    let sortedMedias: Media[];
    let library: Album;
    const subscribe = this.currentAudio$.subscribe((currentAudio: CurrentAudio) => {

      if(currentAudio != null) {

        sortedMedias = currentAudio.sortedMedias;
        library = currentAudio.library;
        const currentIndex = sortedMedias.findIndex(function (media: Media) { 
          return media.id === idMedia; 
        });
        nextMedia = this.findNextMedia(currentIndex, sortedMedias, true);
        sort = currentAudio.sort;
      }
    });
    subscribe.unsubscribe();
    if(nextMedia && nextMedia.type === 'sound') {
      const audioPlayer = document.getElementById("audioPlayer") as HTMLMediaElement;
      audioPlayer.src = "";
      audioPlayer.currentTime = 0;
      this.store.dispatch(new sharedActions.SetCurrentAudio({ 
        path: nextMedia.path, 
        name: nextMedia.name, 
        id: nextMedia.id,
        library: library,
        sortedMedias,
        owner: library.ownedUserId,
        sort: sort,
        paused: false,
        starting: false
      }));
    }
    
  }

  findNextMedia(idCurrentMedia: number, sortedMedias: Media[], next: boolean) {

    if(next && idCurrentMedia === sortedMedias.length - 1)
      return null
    if(!next && idCurrentMedia === 0)
      return null
    const nextMedia = next ? sortedMedias[idCurrentMedia  + 1] : sortedMedias[idCurrentMedia  - 1];
    if(nextMedia.type === 'sound') {
      return nextMedia;
    } else {
      const nextIndex = next ? idCurrentMedia  + 1 : idCurrentMedia  - 1;
      return this.findNextMedia(nextIndex, sortedMedias, next);
    }
  }

  toPauseAudio() {
    
    const audioPLayer = document.getElementById("audioPlayer") as HTMLMediaElement;
    const coverPlayer = document.getElementById("cover") as HTMLImageElement;
    audioPLayer.pause();
    this.isPlaying = false;
    coverPlayer.style.animationPlayState = "paused";
  }

  toPlayAudio() {
    
    const audioPLayer = document.getElementById("audioPlayer") as HTMLMediaElement;
    const coverPlayer = document.getElementById("cover") as HTMLImageElement;
    audioPLayer.play();
    this.isPlaying = true;
    coverPlayer.style.animationPlayState = "running";
  }

  updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    const progress = document.getElementById("progress") as HTMLElement;
    if(progress !== null)
      progress.style.width = `${progressPercent}%`;
  }

  goNextTrack(e) {
    
    let idMedia: number;
    const subscribe = this.currentAudio$.subscribe((currentAudio: CurrentAudio) => {
      idMedia = currentAudio.id
    });
    this.toRightAudio(idMedia);
    subscribe.unsubscribe();
  }

  toSetProgress(e) {
    const audioPlayer = document.getElementById("audioPlayer") as HTMLMediaElement;
    const width = e.target.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;

    audioPlayer.currentTime = (clickX / width) * duration;
  }

  toStopPlayer() {
    this.store.dispatch(new sharedActions.SetCurrentAudio(null));
    this.store.dispatch(new sharedActions.SetAudioContext(null));
  }

  toSetCurrentAudio(data: any) {
    
    this.store.dispatch(new sharedActions.SetCurrentAudio({ 
      path: data.sound.path, 
      name: data.sound.name, 
      id: data.sound.id,
      library: data.currentAudio.library,
      sortedMedias:  data.currentAudio.library.medias,
      owner: data.currentAudio.library.ownedUserId,
      sort: data.currentAudio.sort,
      paused: false,
      starting: false
    }));
  }
}
