import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticateService } from './core/service/authenticate.service';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { SwPush } from '@angular/service-worker';
import { NotificationService } from './core/service/notification.service';
import { Router } from '@angular/router';
import * as fromShared from 'src/app/shared/state';
import { Observable } from 'rxjs';
import { Settings } from 'src/app/shared/model/settings.model';
import * as sharedActions from 'src/app/shared/state/shared.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  settings: Settings;
  player = false;

  constructor(private translate: TranslateService,
              private authService: AuthenticateService,
              private router: Router,
              private location: Location,
              private authenticateService: AuthenticateService,
              private store: Store<fromShared.State>,
              private swPush: SwPush,
              private notificationService: NotificationService) { 
    // Set the defaults for language behaviour
    this.translate.addLangs(['fr', 'en']);
    this.translate.setDefaultLang('en');
    this.translate.use('fr');
  }

  ngOnInit() {

    if (this.authService.isLoggedIn()) {
      this.store.dispatch(new sharedActions.LoadSettings(parseInt(this.authService.getUserId())));
    }
  
    this.store.pipe(select(fromShared.getPlayerFeatureState)).subscribe(player => this.player = player)
    this.store.pipe(select(fromShared.getSettingsFeatureState)).subscribe(settings => {
      this.settings = settings
      if (this.authService.isLoggedIn() && (this.location.path() === '' || this.location.path().indexOf('home') !== -1)) {
        if(this.settings && this.settings.driveSocial.indexOf('social') !== -1) this.router.navigateByUrl('profile/me/albums');
        if(this.settings && this.settings.driveSocial.indexOf('drive') !== -1) this.router.navigateByUrl('drive');
      }
    })

    this.subscribeToNotifications();
  }

  subscribeToNotifications() {

    if (this.authenticateService.isLoggedIn()) {

      this.notificationService.getPublicSigningKey().subscribe(async (publicSigningKey) => {
        
        var reader = new FileReader();
        reader.readAsArrayBuffer(publicSigningKey);
        reader.onloadend = async (event) => {
            
            const registration = await navigator.serviceWorker.ready;
            const subscription2 = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: reader.result
            });
            this.notificationService.storeSubscription(subscription2).subscribe();
        }
      })
    }
  }
}
