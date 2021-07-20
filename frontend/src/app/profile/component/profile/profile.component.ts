import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountUser } from 'src/app/shared/model/account-user.model';
import { Album } from '../../../albums/model/album.model';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'pr-profil',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input() user: AccountUser;
  @Input() library: Album;
  @Input() person: boolean;
  @Output() getSharedLibraries = new EventEmitter<null>();
  @Output() getLibraries = new EventEmitter<null>();
  @Output() loadLibrary = new EventEmitter<number>();
  @Output() navigateSharedAlbums = new EventEmitter<null>();
  @Output() navigateMyAlbums = new EventEmitter<number>();
  @Output() navigateAbout = new EventEmitter<number>();
  @Output() editPicture = new EventEmitter<any>();
  @Output() editCover = new EventEmitter<any>();
  
  faCamera = faCamera;

  activeTab: string;
  
  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.router.events.subscribe((event: any) => {
      if(event.url && event.url.indexOf('new') !== -1) {
        this.activeTab = 'newAlbum';
      } else if (event.url && event.url.indexOf('albums/shared') !== -1) {
        this.activeTab = 'sharedAlbums';
      } else if(event.url && event.url.indexOf('albums') !== -1) {
        this.activeTab = 'myAlbums';
      } else if(event.url && event.url.indexOf('about') !== -1) {
        this.activeTab = 'about';
      } else if(event.url && event.url.indexOf('shared-album') !== -1) {
        this.activeTab = '';
      } else if(event.url && event.url.indexOf('album') !== -1) {
        this.activeTab = '';
      }
    })

    if (this.route.firstChild !== null) {
      this.route.firstChild.url.subscribe(url => {
        if(url.join('/').indexOf('albums/shared') !== -1) {
          this.activeTab = 'sharedAlbums';
        } else if (url.join('/').indexOf('about') !== -1) {
          this.activeTab = 'about';
        } else if (url.join('/').indexOf('albums') !== -1) {
          this.activeTab = 'myAlbums';
        } else if (url.join('/').indexOf('new') !== -1) {
          this.activeTab = 'newAlbum';
        }
      });
    }
  }

  goSharedAlbums() {

    this.activeTab = 'sharedAlbums';
    this.getSharedLibraries.emit();
    this.loadLibrary.emit(null);
    this.navigateSharedAlbums.emit()
  }

  goMyAlbums() {
    
    this.activeTab = 'myAlbums';
    this.getLibraries.emit();
    this.navigateMyAlbums.emit()
  }

  goAbout() {

    this.activeTab = 'about';
    this.navigateAbout.emit();
  }

  onPictureChange(files) {

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      // const pictureSrc = reader.result;
      const editedUser: AccountUser = {
        id: this.user.id,
        picture: files[0].name,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        cover: this.user.cover
      }
      const fd = new FormData();
      fd.append('media', files[0], files[0].name);
      this.editPicture.emit({fd: fd, user: editedUser})
    }
  }

  onCoverChange(files) {

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      // const pictureSrc = reader.result;
      const editedUser: AccountUser = {
        id: this.user.id,
        picture: this.user.picture,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        cover: files[0].name
      }
      const fd = new FormData();
      fd.append('media', files[0], files[0].name);
      this.editCover.emit({fd: fd, user: editedUser})
    }
  }

}
