import { Album } from '../../model/album.model';
import { MediaService } from 'src/app/core/service/media.service';
import { Store } from '@ngrx/store';
import * as fromLibrary from '../../state';
import * as libraryActions from '../../state/albums.actions';
import { Validators, FormGroup, NgForm, FormBuilder } from '@angular/forms';
import { OnInit, Component, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Image } from 'src/app/media/model/image.model';
import { Video } from 'src/app/media/model/video.model';
import { Sound } from 'src/app/media/model/sound.model';
import { faTrash, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Media } from 'src/app/media/model/media.model';
import { GoogleApiService } from 'angular-gapi';
import { environment } from 'src/environments/environment';
import { AccountUser } from 'src/app/shared/model/account-user.model';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hel-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {

  library: Album = {
    id: null,
    ownedUserId: null,
    title: null,
    shortTitle: null,
    medias: [],
    cover: null
  };
  selectedFiles: any = [];
  coverFile: any;
  addLibraryForm: FormGroup;
  @Input() progress: number;
  @Input() user: AccountUser;
  @Output() setProgressRate = new EventEmitter<number>();
  @ViewChild('addLibraryFormId', {static: true}) addLibraryFormId: NgForm;

  faTrash = faTrash;
  faPlay = faPlay;
  faPlus = faPlus;

  youtubeResults: any[];
  youtubeVideoId: string;
  YT: any;
  player: any;
  reframed = false;
  videoIsPlaying = false;

  s3: any;

  constructor(private mediaService: MediaService,
              private fb: FormBuilder,
              private store: Store<fromLibrary.State>,
              private googleService: GoogleApiService) { }

  ngOnInit() {
    document.body.scrollTop = 0;
    // Create the addLibraryForm
    this.addLibraryForm = this.createAddLibraryForm();

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

  

  /**
   * Build the addLibraryForm
   */
  createAddLibraryForm() {
    return this.fb.group({
      informations: this.fb.group({
        title: ['', Validators.required],
      }),
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
      "q": this.addLibraryForm.get('mediasApiGroup').get('searchYoutube').value,
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


  /**
   * Triggered when a user drop file in the drag drop area
   * Build a image object for each fle added which is added to the library
   * object. Set also the selectedFiles variable
   * @param files the images to be added to the library
   */
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
        this.library.medias.push(image);
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
        this.library.medias.push(video);
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
        this.library.medias.push(sound);
      }
    }

    // Add custom validator to images control instead
    // const size = event.target.files[0].size
    // if(size > 1000000)
    //   {
    //       alert("size must not exceeds 1 MB");
    //       this.form.get('profileImage').setValue("");
    //   }
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
    this.library.medias.push(video);
  }

  /**
   * Triggered when the form is submitted. If the form is valid upload the
   * images then register the new library then navigate to the add users library page
   */
  addLibrary() {

    if (this.addLibraryForm.valid) {

      this.copyLibrary();

      console.log(this.library)

      if (this.coverFile) {

        const fdCover = new FormData();
        fdCover.append('cover', this.coverFile, this.coverFile.name);

        this.mediaService.uploadCover(fdCover, this.library.title).subscribe();
      }
      
      console.log(this.selectedFiles)
      if(this.selectedFiles.length !== 0) {
        const fdMedias = new FormData();
        for(let i = 0; i < this.library.medias.length; i++) {
          this.library.medias[i].order = i;
          console.log(this.selectedFiles[i])
          fdMedias.append('media', this.selectedFiles[i], this.selectedFiles[i].name)
        }

        this.mediaService.uploadMedias(fdMedias, this.library.title).subscribe((event: HttpEvent<string>) => {
          if (event.type === HttpEventType.UploadProgress) {
            // Progress value representing the progress of the upload and
            // displayed in the page
            const progress = Math.round(event.loaded / event.total * 100);
            this.setProgressRate.emit(progress);
          } else if (event.type === HttpEventType.Response) {
            // window.scroll(0, 0);
            this.store.dispatch(new libraryActions.SaveLibrary(this.library));
          }
        });
      } else {
        this.store.dispatch(new libraryActions.SaveLibrary(this.library));
      }
    }
  }

  /**
   * Triggered when a user delete an media from the library
   * @param index the index of the image to remove from the library
   */
  deleteAttachment(media: Media) {
    
    const ind = this.library.medias.indexOf(media);
    this.library.medias.splice(ind, 1);
    if(!media.fromApi) {
      const file = this.selectedFiles.find(file => file.name === media.path);
      const indFile = this.selectedFiles.indexOf(file);
      this.selectedFiles.splice(indFile, 1);
    }
  }

  /**
   * Copy the content of the form into the library variable
   */
  copyLibrary() {
    this.library.title = this.addLibraryForm.get('informations').get('title').value;
    if(this.coverFile) {
      this.library.cover = this.coverFile.name;
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
    const tempFile = this.library.medias[droppedIndex];
    this.library.medias.splice(droppedIndex, 1, this.library.medias[fileIndex]);
    this.library.medias.splice(fileIndex, 1, tempFile);
  }

  findDroppedIndex(htmlElement: HTMLElement) {

    if(htmlElement.id.indexOf('file') !== -1) {
      return Number(htmlElement.id.substr(5,htmlElement.id.length-5));
    } else {
      return this.findDroppedIndex(htmlElement.parentElement);
    }
  }

  addCover(event) {
    event.preventDefault();
    const coverInput = document.getElementById('cover-input');
    coverInput.click();
  }

  onCoverChange(files) {

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    this.coverFile = files[0];
    reader.onload = e => {
      const imgCover = document.getElementById('img-cover') as HTMLImageElement;
      imgCover.src = `${reader.result}`;
      const fd = new FormData();
    }
  }
}
