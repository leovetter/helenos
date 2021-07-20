import { Injectable } from '@angular/core';
import { Media } from 'src/app/media/model/media.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubePlayerService {

  youtubeVideoId: string;
  YT: any;
  player: any;
  reframed = false;

  constructor() { }

  openPlayer(media: Media) {

      if(window['YT']) {

        this.youtubeVideoId = media.path;
        setTimeout(function() {
          this.startVideo();
        }.bind(this), 100)
      } else {
        
        this.youtubeVideoId = media.path;

        let tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        tag.id = "iframe-api-id";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.id = 'first-script-tag-id'
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window['onYouTubeIframeAPIReady'] = ()  => {
          setTimeout(function() {
            this.startVideo();
          }.bind(this), 100)
        }
      }
      
  }

  startVideo() {
    this.reframed = false;
    console.log('element player')
    
    const playerEl = document.getElementById('player')
    console.log(playerEl) 
    if (!playerEl) {
      const newPlayerEl = document.createElement('div');
      newPlayerEl.id = 'player';
      console.log(newPlayerEl)
      document.querySelector('.youtube-player').appendChild(newPlayerEl)
    }

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
    console.log('player start video')
    console.log(this.player)
  }

  toNextPlayer(nextMedia: Media) {

    this.player.destroy();
    this.youtubeVideoId = null;
    window['onYouTubeIframeAPIReady'] = null;

    this.youtubeVideoId = nextMedia.path;

    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    tag.id = "iframe-api-id";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.id = 'first-script-tag-id'
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = ()  => this.startVideo();

    // if(window['YT']) {
  
    //   console.log(' player right')
    //   console.log(this.player)
    //   this.youtubeVideoId = nextMedia.path;
    //   this.player.loadVideoById(this.youtubeVideoId, 0);
    //   // this.player.pauseVideo();
    // } else {

    //   this.youtubeVideoId = nextMedia.path;

    //   let tag = document.createElement('script');
    //   tag.src = "https://www.youtube.com/iframe_api";
    //   tag.id = "iframe-api-id";
    //   var firstScriptTag = document.getElementsByTagName('script')[0];
    //   firstScriptTag.id = 'first-script-tag-id'
    //   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    //   window['onYouTubeIframeAPIReady'] = ()  => this.startVideo();
    // }
  }

  destroyPlayer() {

    console.log('destroy')
    if(window['YT']) {
      this.player.destroy();
      this.youtubeVideoId = null;
      window['onYouTubeIframeAPIReady'] = null;
    }
  }

  /* 4. It will be called when the Video Player is ready */
  onPlayerReady(event) {
    // console.log('onPlayerReady')
    // event.target.pauseVideo();
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
    console.log('onPlayerError')
    console.log(event)
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

  closeMedia() {

    if(window['YT']) {

      this.player.destroy();
      this.youtubeVideoId = null;
      window['onYouTubeIframeAPIReady'] = null;
    }
  }
}
