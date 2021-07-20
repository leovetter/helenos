import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmartProfileComponent } from './component/smart-profile/smart-profile.component';
import { SmartProfilePersonComponent } from './component/smart-profile-person/smart-profile-person.component';
import { SharedModule } from '../shared/shared.module';
import { CanActivateAuthGuard } from '../shared/guard/can-activate-auth.guard';
import { SmartAboutComponent } from './component/smart-about/smart-about.component';
import { SmartPersonAboutComponent } from './component/smart-person-about/smart-person-about.component';
import { SettingsComponent } from './component/settings/settings.component';
import { AssistanceComponent } from './component/assistance/assistance.component';

const routes: Routes = [
  { path: 'settings', component: SettingsComponent, canActivate: [ CanActivateAuthGuard ] },
  { path: 'assistance', component: AssistanceComponent, canActivate: [ CanActivateAuthGuard ] },
  { path: 'me', component: SmartProfileComponent, canActivate: [ CanActivateAuthGuard ],
    children: [
      { path: 'albums', loadChildren: () => import('src/app/albums/albums.module').then(m => m.AlbumsModule) },
      { path: 'album', loadChildren: () => import('src/app/album/album.module').then(m => m.AlbumModule) },
      { path: 'about', component: SmartAboutComponent, canActivate: [ CanActivateAuthGuard ] },
    ],
  },
  { path: ':idUser', component: SmartProfilePersonComponent,
    canActivate: [ CanActivateAuthGuard ],
    children: [
      { path: 'albums', loadChildren: () => import('src/app/albums/albums.module').then(m => m.AlbumsModule) },
      { path: 'album', loadChildren: () => import('src/app/album/album.module').then(m => m.AlbumModule) },
      { path: 'about', component: SmartPersonAboutComponent, canActivate: [ CanActivateAuthGuard ] }
    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
