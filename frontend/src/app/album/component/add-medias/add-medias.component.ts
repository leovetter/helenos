import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Media } from 'src/app/media/model/media.model';
import { Sound } from 'src/app/media/model/sound.model';
import { Video } from 'src/app/media/model/video.model';
import { Image } from 'src/app/media/model/image.model';
import { MediaService } from 'src/app/core/service/media.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import * as libraryActions from '../../../albums/state/albums.actions';
import * as fromLibrary from '../../../albums/state';
import { Store } from '@ngrx/store';
import { faTrash, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Album } from '../../../albums/model/album.model';
import { GoogleApiService } from 'angular-gapi';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'hel-add-medias',
  templateUrl: './add-medias.component.html',
  styleUrls: ['./add-medias.component.scss']
})
export class AddMediasComponent implements OnInit {

  @Input() library: Album;
  @Output() hidePopup = new EventEmitter<null>();
  
  addMediasForm: FormGroup;
  selectedFiles: any = [];
  medias: Media[] = [];
  progress: number;

  faTrash = faTrash;
  faPlay = faPlay;
  faPlus = faPlus;

  youtubeResults: any[];
  youtubeVideoId: string;
  YT: any;
  player: any;
  reframed = false;
  videoIsPlaying = false;

  constructor(private fb: FormBuilder,
              private store: Store<fromLibrary.State>,
              private mediaService: MediaService,
              private googleService: GoogleApiService) { }

  ngOnInit() {
    this.addMediasForm = this.buildAddMediasForm();

    this.googleService.onLoad().subscribe(() => {
      gapi.load('client', function() {
        this.loadClient().then(() => {
         
        });
      }.bind(this));
    });
  }

  loadClient() {
    gapi.client.setApiKey(environment.youtubeApiKey);
    return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest", "v3")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }

  buildAddMediasForm() {
    return this.fb.group({
      imagesGroup: this.fb.group({
        images: ''
      }),
      mediasApiGroup: this.fb.group({
        searchYoutube: ''
      }),
    });
  }

  searchApis(event) {

    if(event.keyCode === 13) {

      event.preventDefault();
      this.searchYoutube();
    }
  }

  searchYoutube() {

    gapi.client.request({ 'method': 'GET', 'path': '/youtube/v3/search', 'params': {
      "part": [
        "snippet"
      ],
      "maxResults": 25,
      "q": this.addMediasForm.get('mediasApiGroup').get('searchYoutube').value,
      "type": "video"
    } }).then(function(response: any) {
      this.youtubeResults = response.result.items;
    }.bind(this),
    function(err) { console.error("Execute error", err); });
        
  }

  playResult(videoId: string) {
    
    if(this.youtubeVideoId) {
      this.youtubeVideoId = videoId;

     this.player.loadVideoById(this.youtubeVideoId, 0);

    } else if(window['YT']) {

      this.youtubeVideoId = videoId;
      this.videoIsPlaying = true;
      this.startVideo();
    } else {

      this.youtubeVideoId = videoId;

      let tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      tag.id = "iframe-api-id";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.id = 'first-script-tag-id'
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window['onYouTubeIframeAPIReady'] = ()  => this.startVideo();
      this.videoIsPlaying = true;
    }
  }

  addResult(youtubeResult: any) {

    const video: Video = {
      id: null,
      name: youtubeResult.snippet.title,
      path: youtubeResult.id.videoId,
      size: null,
      creationDate: new Date(),
      updateDate: new Date(),
      isIntersecting: null,
      type: 'video',
      order: null,
      fromApi: true,
      api: 'youtube',
      cover: youtubeResult.snippet.thumbnails.default.url
    };
    this.medias.push(video);
  }

  startVideo() {
    this.reframed = false;
    this.player = new window['YT'].Player('player', {
      videoId: this.youtubeVideoId,
      height: '195',
      width: '320',
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1

      },
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onError': this.onPlayerError.bind(this),
        'onReady': this.onPlayerReady.bind(this),
      }
    });
  }

  /* 4. It will be called when the Video Player is ready */
  onPlayerReady(event) {
    event.target.playVideo();
  }

  /* 5. API will call this function when Player State changes like PLAYING, PAUSED, ENDED */
  onPlayerStateChange(event) {
    // switch (event.data) {
    //   case window['YT'].PlayerState.PLAYING:
    //     if (this.cleanTime() == 0) {
    //       console.log('started ' + this.cleanTime());
    //     } else {
    //       console.log('playing ' + this.cleanTime())
    //     };
    //     break;
    //   case window['YT'].PlayerState.PAUSED:
    //     if (this.player.getDuration() - this.player.getCurrentTime() != 0) {
    //       console.log('paused' + ' @ ' + this.cleanTime());
    //     };
    //     break;
    //   case window['YT'].PlayerState.ENDED:
    //     console.log('ended ');
    //     break;
    // };
  };

  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  };

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.youtubeVideoId)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    };
  };

  stopPlayer() {

    this.player.destroy();
    this.videoIsPlaying = false;
    this.youtubeVideoId = null;
    window['onYouTubeIframeAPIReady'] = null;
  }

  addMedias() {

    const fd = new FormData();

      for (const file of this.selectedFiles) {
        fd.append('media', file, file.name);
      }

      for(let i = 0; i < this.medias.length; i++) {
        this.medias[i].order = this.library.medias.length + i;
      }

      console.log(this.medias)

      this.mediaService.uploadMedias(fd, this.library.title).subscribe((event: HttpEvent<string>) => {
        if (event.type === HttpEventType.UploadProgress) {
          // Progress value representing the progress of the upload and
          // displayed in the page
          this.progress = Math.round(event.loaded / event.total * 100);
        } else if (event.type === HttpEventType.Response) {
          this.store.dispatch(new libraryActions.AddMediasToLibrary(this.library.id, this.medias));
          this.hidePopup.emit();
        }
      });
  }

  onFileDropped(files: any) {
    for(const file of files) {
      this.selectedFiles.push(file);
      if (file.type.indexOf('image') != -1) {
        const image: Image = {
          id: null,
          name: file.name.split('.')[0],
          path: file.name,
          size: file.size,
          creationDate: null,
          updateDate: null,
          isIntersecting: null,
          type: 'image',
          order: null,
          fromApi: false
        };
        this.medias.push(image);
      } else if (file.type.indexOf('video') != -1) {
        const video: Video = {
          id: null,
          name: file.name.split('.')[0],
          path: file.name.split('.')[0] + '.mp4',
          size: file.size,
          creationDate: null,
          updateDate: null,
          isIntersecting: null,
          type: 'video',
          order: null,
          fromApi: false
        };
        this.medias.push(video);
      } else if (file.type.indexOf('audio') != -1) {
        const sound: Sound = {
          id: null,
          name: file.name.split('.')[0],
          path: file.name,
          size: file.size,
          creationDate: null,
          updateDate: null,
          isIntersecting: null,
          type: 'audio',
          order: null,
          fromApi: false
        }
        this.medias.push(sound);
      }
    }
  }

  deleteAttachment(media: Media) {
    
    const ind = this.medias.indexOf(media);
    this.medias.splice(ind, 1);
    if(!media.fromApi) {
      const file = this.selectedFiles.find(file => file.name === media.path);
      const indFile = this.selectedFiles.indexOf(file);
      this.selectedFiles.splice(indFile, 1);
    }
  }

  drag(fileIndex, event) {
    event.dataTransfer.setData("fileIndex", fileIndex);
  }

  allowDrop(event) {
    event.preventDefault();
  }

  drop(event) {

    event.preventDefault();
    const fileIndex = event.dataTransfer.getData("fileIndex");
    const droppedIndex = this.findDroppedIndex(event.target);
    const tempFile = this.medias[droppedIndex];
    this.medias.splice(droppedIndex, 1, this.medias[fileIndex]);
    this.medias.splice(fileIndex, 1, tempFile);
  }

  findDroppedIndex(htmlElement: HTMLElement) {

    if(htmlElement.id.indexOf('file') !== -1) {
      return Number(htmlElement.id.substr(5,htmlElement.id.length-5));
    } else {
      return this.findDroppedIndex(htmlElement.parentElement);
    }
  }
}
