import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, switchMap, catchError, tap } from 'rxjs/operators';
import { MediaService } from 'src/app/core/service/media.service';
import { faAudioDescription } from '@fortawesome/free-solid-svg-icons';
import { AmazonService } from 'src/app/core/service/amazon.service';

@Component({
  selector: 'sh-secured-media',
  templateUrl: './secured-media.component.html',
  styleUrls: ['./secured-media.component.scss']
})
export class SecuredMediaComponent implements OnInit {

  displayMedia = true;
  // This part just creates an rxjs stream from the src
  // this makes sure that we can handle it when the src changes
  // or even when the component gets destroyed
  @Input() controls: boolean;
  @Input() src: string = null;
  @Input() type: string;
  @Input() load: boolean;
  @Input() isIntersecting: boolean;
  src$ = new BehaviorSubject(this.src);
  // this stream will contain the actual url that our img tag will load
  // everytime the src changes, the previous call would be canceled and the
  // new resource would be loaded
  dataUrl$ = this.src$.pipe(
    filter(url => url.indexOf('noImages') === -1 && url.indexOf('question-mark-512') === -1 && url !== undefined && this.load == true && this.isIntersecting === true),
    switchMap(url => this.loadMedia(url))
  );
  faAudioDescription = faAudioDescription;

  constructor(private mediaService: MediaService,
              private amazonService: AmazonService) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.displayMedia = false;
  }

  ngOnChanges() {
    this.src$.next(this.src);
  }

  private loadMedia(url: string): Observable<any> {
    
    // .pipe(
    //     catchError(() => of(this.onErrorMedia()))
    //   );
    return this.mediaService.loadMedia(url).pipe(
      catchError(() => of(this.onErrorMedia()))
    );
  }

  onLoadVideo() {
    this.displayMedia = true;
  }

  onLoadImage() {
    this.displayMedia = true;
  }

  onLoadSound() {
    this.displayMedia = true;
  }

  onErrorMedia() {
    this.displayMedia = true;
    this.src$.next('../../../../assets/images/question-mark-512.png');
  }

}
