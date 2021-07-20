import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ViewAlbum } from '../model/view-album.model';
import { Album } from '../model/album.model';
import { AuthenticateService } from 'src/app/core/service/authenticate.service';
import { environment } from './../../../environments/environment';
import { map, tap } from 'rxjs/operators';
import * as libraryActions from '../state/albums.actions';
import * as fromLibrary from '../state/';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { EditAlbum } from '../model/edit-album.model';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private http: HttpClient,
              private authService: AuthenticateService,
              private store: Store<fromLibrary.State>) { }

  getAllByUser(selectedSort: string): Observable<ViewAlbum[]> {
    let order: string;
    switch (selectedSort) {
      case 'size':
        order = 'asc';
        break;
      case 'updateDate':
        order = 'desc';
        break;
      case 'creationDate':
        order = 'desc';
        break;
      case 'title':
        order = 'asc';
        break;
    }
    return this.http.get<ViewAlbum[]>(
      environment.apiUrl + '/media/users/' + this.authService.getUserId() + '/libraries',
      { params: { sort: selectedSort + ',' + order }})
      .pipe(
        tap((res: any) => {
          this.store.dispatch(new libraryActions.SetTotalPages(res.totalPages));
        }),
        map((res: any) => res.content as ViewAlbum[]));
  }

  getAllSharedByUser(selectedSort: string): Observable<ViewAlbum[]> {
    let order: string;
    switch (selectedSort) {
      case 'size':
        order = 'asc';
        break;
      case 'updateDate':
        order = 'desc';
        break;
      case 'creationDate':
        order = 'desc';
        break;
      case 'title':
        order = 'asc';
        break;
    }
    return this.http.get<ViewAlbum[]>(
      environment.apiUrl + '/media/users/' + this.authService.getUserId() + '/shared-libraries',
      { params: { sort: selectedSort + ',' + order }})
      .pipe(
        tap((res: any) => {
          this.store.dispatch(new libraryActions.SetSharedTotalPages(res.totalPages));
        }),
        map((res: any) => res.content as ViewAlbum[]));
  }

  addLibraries(page: number, selectedSort: string): Observable<ViewAlbum[]> {
    let order: string;
    switch (selectedSort) {
      case 'size':
        order = 'asc';
        break;
      case 'updateDate':
        order = 'desc';
        break;
      case 'creationDate':
        order = 'desc';
        break;
      case 'title':
        order = 'asc';
        break;
    }
    return this.http.get<ViewAlbum[]>(
      environment.apiUrl + '/media/users/' + this.authService.getUserId() + '/libraries', { params: {page: page.toString(), sort: selectedSort + ',' + order} })
      .pipe(
        map((res: any) => res.content as ViewAlbum[])
      );
  }

  addLibrary(library: Album): Observable<Album> {
    return this.http.post<Album>(environment.apiUrl + '/media/users/' + this.authService.getUserId() + '/libraries', library,
    {headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.getJwtToken()}`)});
  }

  getLibrary(idLibrary: number): Observable<Album> {
    return this.http.get<Album>(environment.apiUrl + '/media/libraries/' + idLibrary);
  }

  getEditLibrary(idLibrary: number): Observable<EditAlbum> {
    return this.http.get<EditAlbum>(environment.apiUrl + '/media/libraries/' + idLibrary + '/edit');
  }

  updateLibrary(library: EditAlbum): Observable<EditAlbum> {
    return this.http.put<EditAlbum>(environment.apiUrl + '/media/users/' + this.authService.getUserId() + '/libraries', library);
  }

  deleteLibrary(idLibrary: number): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + '/media/users/' + this.authService.getUserId() + '/libraries/' + idLibrary);
  }

  downloadLibrary(title: string, idUser: number) {
    return this.http.get(environment.apiUrl + '/media/users/' + idUser + '/downloadLibrary', 
                         { params: { libraryTitle: title }, responseType: 'blob'});
  }

  loadUserLibrary(selectedSort: string, idPerson: number): Observable<any> {
    let order: string;
    switch (selectedSort) {
      case 'size':
        order = 'asc';
        break;
      case 'updateDate':
        order = 'desc';
        break;
      case 'creationDate':
        order = 'desc';
        break;
      case 'title':
        order = 'asc';
        break;
    }
    return this.http.get<any>(environment.apiUrl + '/media/users/' + this.authService.getUserId() + 
                                      '/person/' + idPerson + '/libraries', { params: { sort: selectedSort + ',' + order }}) ;
  }

  setVisibilityAlbum(idAlbum: number, isPublic: boolean) {

    return this.http.get(`${environment.apiUrl}/media/library/${idAlbum}`, { params: { isPublic: isPublic.toString() }});
  }

  reOrderAlbum(indexes: number[]): Observable<Album> {
    return this.http.post<Album>(`${environment.apiUrl}/media/library/reOrder`, indexes)
  }
}
