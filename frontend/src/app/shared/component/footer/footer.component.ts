import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatMenuTrigger } from '@angular/material';
import { AuthenticateService } from 'src/app/core/service/authenticate.service';
import { Animations } from './footer.animation';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'sh-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [ 
    Animations.scaleOut,
  ]
})
export class FooterComponent implements OnInit {

  year: number;
  showLangue = false;
  
  @ViewChild('menuTrigger', { static: true }) menuTrigger: MatMenuTrigger;

  constructor(private translate: TranslateService,
              private authService: AuthenticateService) {
    this.translate.addLangs(['fr', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('fr');
  }

  ngOnInit() {
    // Set the current year
    this.year = new Date().getFullYear();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  /**
   * Swhitch the language
   */
  switchLangue(langue: string) {
    this.translate.use(langue);
  }

}
