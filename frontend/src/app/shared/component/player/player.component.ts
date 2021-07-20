import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CurrentAudio } from '../../model/current-audio.model';
import { AudioContext } from '../../model/audio-context.model';
import { faBackward, faForward, faPause, faPlay, faTimes, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Media } from 'src/app/media/model/media.model';

@Component({
  selector: 'sh-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnChanges {

  @Input() currentAudio: CurrentAudio;
  @Input() audioContext: AudioContext;
  @Input() isPlaying: boolean;
  @Output() toLeftAudio = new EventEmitter<number>();
  @Output() toRightAudio = new EventEmitter<number>();
  @Output() toPlayAudio = new EventEmitter<null>();
  @Output() toPauseAudio = new EventEmitter<null>();
  @Output() toStopPlayer = new EventEmitter<null>();
  @Output() toSetProgress = new EventEmitter<any>();
  @Output() toSetCurrentAudio = new EventEmitter<any>();

  faBackward = faBackward;
  faForward = faForward;
  faPause = faPause;
  faPlay = faPlay;
  faTimes = faTimes;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;

  showPlaylist = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes')
    console.log(changes)
  }

  ngOnInit() {
  }

  leftAudio(idMedia: number) {
    this.toLeftAudio.emit(idMedia)
  }

  rightAudio(idMedia: number) {
    this.toRightAudio.emit(idMedia)
  }

  playAudio() {
    this.toPlayAudio.emit();
  }

  pauseAudio() {
    this.toPauseAudio.emit();
  }

  stopPlayer() {
    this.toStopPlayer.emit();
    this.showPlaylist = false;
  }

  setProgress(event: any) {
    this.toSetProgress.emit(event);
  }

  setCurrentAudio(sound: Media) {
    this.toSetCurrentAudio.emit({
      sound,
      currentAudio: this.currentAudio
    });
  }
}
