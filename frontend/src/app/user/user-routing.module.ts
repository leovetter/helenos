import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountContainerComponent } from './component/account-container/account-container.component';
import { CanActivateAuthGuard } from '../shared/guard/can-activate-auth.guard';

const routes: Routes = [
  { path: 'account', component: AccountContainerComponent, canActivate: [ CanActivateAuthGuard ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
  static components = [ AccountContainerComponent ];
}
