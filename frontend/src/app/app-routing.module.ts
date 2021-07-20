import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  // { path: '', component: AppComponent },
  { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
  { path: 'users', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  // { path: 'albums', loadChildren: () => import('./library/library.module').then(m => m.LibraryModule) },
  { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'drive', loadChildren: () => import('./drive/drive.module').then(m => m.DriveModule) },
  // { path: '**', redirectTo: '/profile/me/albums', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
