import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faTimes, faChevronRight, faChevronLeft, faThumbsUp, faComment, faPlayCircle,
         faImage } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { AccountUser } from 'src/app/shared/model/account-user.model';
import { Album } from '../../../albums/model/album.model';

@Component({
  selector: 'hel-media-comments',
  templateUrl: './media-comments.component.html',
  styleUrls: ['./media-comments.component.scss']
})
export class MediaCommentsComponent implements OnInit {

  @Input() media: any;
  @Input() album: Album;
  @Input() user: AccountUser;
  @Output() toRightMedia = new EventEmitter<number>();
  @Output() toLeftMedia = new EventEmitter<number>();
  @Output() toCloseMedia = new EventEmitter<null>();
  @Output() addCommentToMedia = new EventEmitter<string>();
  @Output() openPlayer = new EventEmitter<null>();
  @Output() openImageEditor = new EventEmitter<null>();
  
  @ViewChild('textComment', {static: false}) textCommentEl: ElementRef;

  faTimes = faTimes;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  faPlayCircle = faPlayCircle;
  faImage= faImage;

  commentUser: string;
  
  constructor(private translateService: TranslateService) { }

  ngOnInit() {

    console.log('MediaCommentsComponent')
  }

  leftMedia(idMedia: number) {

    this.toLeftMedia.emit(idMedia);
  }

  rightMedia(idMedia: number) {

    this.toRightMedia.emit(idMedia);
    
  }

  closeMedia() {
    this.toCloseMedia.emit(null);
  }

  addComment(event: any) {

    if (event.keyCode === 13) {
      this.addCommentToMedia.emit(this.commentUser);
      console.log(this.textCommentEl)
      this.textCommentEl.nativeElement.value = '';
    }
  }

  focusNewComment() {
    this.textCommentEl.nativeElement.focus();
  }

  goPlayer() {

    if(this.media.type === 'sound') {

      this.openPlayer.emit();
    }
  }

  goImageEditor() {
    
    if(this.media.type === 'image') {
     this.openImageEditor.emit();
    }
  }
}
