import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { ResultsComponent } from './component/results/results.component';
import { SmartResultsComponent } from './component/smart-results/smart-results.component';
import { FilterResultsPipe } from './pipe/filter-results.pipe';
import { SharedModule } from '../shared/shared.module';
import { FormatUrlPipe } from './pipe/format-url.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ResultsComponent,
    SmartResultsComponent,
    FilterResultsPipe,
    FormatUrlPipe
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    FontAwesomeModule
  ]
})
export class SearchModule { }
