import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateAuthGuard } from '../shared/guard/can-activate-auth.guard';
import { SmartAlbumComponent } from './component/smart-album/smart-album.component';

const routes: Routes = [
      { path: ':idLibrary', component: SmartAlbumComponent, canActivate: [ CanActivateAuthGuard ] },
      { path: 'shared/:idLibrary', component: SmartAlbumComponent, canActivate: [ CanActivateAuthGuard ] },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule {
  static components = [ 
                        SmartAlbumComponent
                      ];
}
