import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../model/result.model';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  loadResults(searchApp: string): Observable<Result[]> {
    return this.http.get<Result[]>(environment.apiUrl + '/media/search/' + searchApp);
  }
}
