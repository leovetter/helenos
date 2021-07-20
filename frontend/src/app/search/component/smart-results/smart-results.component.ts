import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Result } from '../../model/result.model';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'sh-smart-results',
  template: `
  <sh-results [results]="results$ | async">
  </sh-results>
  `
})
export class SmartResultsComponent implements OnInit {

  results$: Observable<Result[]>
  
  constructor(private route: ActivatedRoute,
              private searchService: SearchService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(paramsMap => {
      this.results$ = this.searchService.loadResults(paramsMap['params']['searchApp']);
    })
  }
}
