import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Result } from '../../model/result.model';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'sh-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Input() results: Result[];

  faUserPlus = faUserPlus;

  constructor(private translate: TranslateService,
              private router: Router) { }

  ngOnInit() {
  }

  goProfile(idUser: number) {
    this.router.navigateByUrl('profile/' + idUser + '/albums');
  }

  followUser(idUser: number) {
    console.log(idUser);
  }

  hasAlbums() {
    if (this.results) {
      return this.results.filter(result => result.type === 'album').length !== 0;
    } else {
      return false;
    }
  }

  hasUser() {
    if (this.results) {
      return this.results.filter(result => result.type === 'user').length !== 0;
    } else {
      return false;
    }
  }

}
