import { Component, OnInit, ViewChild, HostListener, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { LoginComponent } from 'src/app/shared/component/login/login.component';
import { AuthenticateService } from 'src/app/core/service/authenticate.service';
import { Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Animations } from './navbar.animation';
import { NavbarService } from 'src/app/core/service/navbar.service';
import { faSearch, faChevronCircleDown, faSignOutAlt, faQuestion, faCog } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { AccountUser } from '../../model/account-user.model';
import * as sharedActions from 'src/app//shared/state/shared.actions';
import * as fromShared from 'src/app/shared/state';
import { Store, select } from '@ngrx/store';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'sh-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [ 
    Animations.shakeHelenosText,
    Animations.shakeHeading,
    Animations.closeNavigationButton,
    Animations.closeNavigationIcon,
    Animations.openNavigationMenu,
    Animations.openMenuLinks,
    Animations.showOpenIcon,
    Animations.reduceNavbar,
    Animations.fadeOut,
    Animations.showHidePlayer,
    Animations.reduceHeader,
  ]
})
export class NavbarComponent implements OnInit, AfterViewInit {

  user$: Observable<AccountUser>;
  
  shakeHelenosText = false;
  shakeHeading = false;
  scaleOut = false;
  isNavigationMenu = false;
  smallNavbar: boolean;
  showLoginPopup = false;
  showMenuSettings = false;
  searchApp: string;
  showWelcomeLink = false;

  faSearch = faSearch;
  faChevronCircleDown = faChevronCircleDown;
  faSignOutAlt = faSignOutAlt;
  faQuestion = faQuestion;
  faCog = faCog;

  credentials = { email: '', password: '' };
  deferredPrompt: any;
  showPwaInstall = false;
  showSmallButtons = false;
  faBars = faBars;
  // @ViewChild('acc-login', { static: true }) loginComponent: LoginComponent;
  // @ViewChild('loginSmallComponent', { static: true }) loginSmallComponent: LoginComponent;

  constructor(private authService: AuthenticateService,
              private router: Router,
              private navbarService: NavbarService,
              private cd: ChangeDetectorRef,
              private translate: TranslateService,
              private location: Location,
              private store: Store<fromShared.State>,) { 
    this.translate.addLangs(['fr', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.getBrowserLang();
    this.translate.use(this.translate.getBrowserLang());
              }

  ngOnInit() {

    window.addEventListener('beforeinstallprompt', (event) => {
      // Stash the event so it can be triggered later.
      this.deferredPrompt = event;
      this.showPwaInstall = true;
    });

    this.navbarService.sharedSmallNavbar.subscribe((isSmallNavbar: boolean) => {

      // Prevent the ExpressionChangedAfterItHasBeenCheckedError error
      this.cd.detach();

      if (isSmallNavbar === null && this.location.path() === '/account/home') {
        this.smallNavbar = false;
      } else if (isSmallNavbar === null) {
        this.smallNavbar = true;
      } else {
        this.smallNavbar = isSmallNavbar;
      }
      
      isSmallNavbar ? this.isNavigationMenu = false : null ;

      this.cd.detectChanges();
      this.cd.reattach();
    });

    this.router.events.subscribe((event: any) => {
      if(event.url && event.url.indexOf('search') !== -1) {
        this.searchApp = event.url.split('/')[2];
      } else if (event.url && event.url.indexOf('sign-up') !== -1) {
        this.showWelcomeLink = true;
      }
    });

    if(this.authService.isLoggedIn()) {
      this.store.dispatch(new sharedActions.LoadUser(this.authService.getUserId()));
    }
    this.user$ = this.store.pipe(select(fromShared.getUserFeatureState));
  }

  ngAfterViewInit(): void {
    // Prevent the ExpressionChangedAfterItHasBeenCheckedError error
    this.cd.detach();
    // Trigger the animations for the heading part of the header
    this.shakeHelenosText = true;
    this.shakeHeading = true;
    
    this.cd.detectChanges();
    this.cd.reattach();
  }

  installPwa() {
    this.showPwaInstall = false;
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((result) => {
      this.deferredPrompt = null;
    });
  }

  /**
   *  Clear the form when the login component just has been closed or opened
   * @param event the object associated with the animation event
   */
  // onOpenCloseEvent(event: AnimationEvent) {
  //   this.loginComponent.clearLoginForm();
  //   this.loginSmallComponent.clearLoginForm();
  // }

  /**
   * Check if the user is logged in
   */
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  /**
   * Logout the user by deleting its jwt token from the localStorage
   * and navigating to the home page
   */
  logout() {
    this.authService.deleteJwtToken();
    this.router.navigateByUrl('account/home');
    this.showMenuSettings = false;
  }

  goSettings() {
    this.showMenuSettings = false;
    this.router.navigateByUrl('profile/settings');
  }

  goAssistance() {
    this.showMenuSettings = false;
    this.router.navigateByUrl('profile/assistance');
  }

  /**
   * Triggered when user clicked on the logo img
   * Go to the homepage if the user is not logged in
   * else go to the libraries page
   */
  goToHome() {
    this.searchApp = '';
    this.showMenuSettings = false;
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('profile/me/albums');
    } else {
      this.router.navigateByUrl('account/home');
    }
  }

  goProfil() {
    this.searchApp = '';
    this.showMenuSettings = false;
    this.router.navigateByUrl('profile/me/albums');
  }

  searchAppli(event) {

    if (event.keyCode === 13) {
      this.showMenuSettings = false;
      this.router.navigateByUrl('/search/' + this.searchApp);
    }
  }

  calculHeight() {
    let defHeight: string;
    if (screen.width < 600) {
      defHeight = '17rem';
    } else {
      defHeight = '10rem';
    }
    return defHeight;
  }

  /**
   * Listen for when the user leave the page and if rememberMe
   * is set to false delete the jwt token from the local storage
   */
  // @HostListener('window:beforeunload')
  // clearTokenIfNeeded() {
  //   if (!this.loginComponent.loginForm.get('rememberMe').value) {
  //     this.authService.deleteJwtToken();
  //   }
  // }
}
