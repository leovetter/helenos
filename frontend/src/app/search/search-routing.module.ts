import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ResultsComponent } from './component/results/results.component';
import { SmartResultsComponent } from './component/smart-results/smart-results.component';


const routes: Routes = [
  { path: ':searchApp', component: SmartResultsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
