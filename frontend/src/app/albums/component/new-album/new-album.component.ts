import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hel-new-album',
  templateUrl: './new-album.component.html',
  styleUrls: ['./new-album.component.scss'],
})
export class NewAlbumComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  infoStyle() {
    if (this.router.url.indexOf('info') !== -1) {
      return {
        color: 'white',
        textDecoration: 'underline'
      };
    }
  }

  shareStyle() {
    if (this.router.url.indexOf('users') !== -1) {
      return {
        color: 'white',
        textDecoration: 'underline'
      };
    }
  }

}
