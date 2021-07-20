import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SmartAlbumsComponent } from './component/smart-albums/smart-albums.component';
import { SmartAddAlbumComponent } from './component/smart-add-album/smart-add-album.component';
import { SmartAddUsersAlbumComponent } from './component/smart-add-users-library/smart-add-users-library.component';
import { NewAlbumComponent } from './component/new-album/new-album.component';
import { CanActivateAuthGuard } from '../shared/guard/can-activate-auth.guard';
import { IsNotDirtyGuard } from './guard/is-not-dirty.guard';

const routes: Routes = [
  { path: '', component: SmartAlbumsComponent, canActivate: [ CanActivateAuthGuard ] },
  { path: 'shared', component: SmartAlbumsComponent, canActivate: [ CanActivateAuthGuard ] },
  { path: 'new', component: NewAlbumComponent, canActivate: [ CanActivateAuthGuard ],
    children: [
      { path: '',  redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: SmartAddAlbumComponent, canDeactivate: [ IsNotDirtyGuard ] },
      { path: ':idLibrary/users', component: SmartAddUsersAlbumComponent }
    ],
  },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumsRoutingModule {
  static components = [ SmartAlbumsComponent,
                        NewAlbumComponent,
                        SmartAddAlbumComponent,
                        SmartAddUsersAlbumComponent
                      ];
}
