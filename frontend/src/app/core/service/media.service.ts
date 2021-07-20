import { Injectable } from '@angular/core';
import { AuthenticateService } from './authenticate.service';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { UpdateMedia } from '../../media/model/update-media.model';
import { Media } from 'src/app/media/model/media.model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient,
              private authService: AuthenticateService,
              private domSanitizer: DomSanitizer) { }

  uploadMedias(medias: FormData, libraryTitle: string): Observable<HttpEvent<string>> {
    return this.http.post(environment.apiUrl + '/media/users/' + this.authService.getUserId() + '/medias',
      medias, { responseType: 'text', reportProgress: true, observe: 'events', params: { libraryTitle } });
  }

  uploadCover(cover: FormData, libraryTitle: string): Observable<any> {
    return this.http.post(environment.apiUrl + '/media/users/' + this.authService.getUserId() + '/cover',
    cover, { params: { libraryTitle } });
  }

  loadMedia(url: string) {
    return this.http.get(url, { responseType: 'blob'}).pipe(map(e => this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e))));
  }

  loadMediaBlob(url: string) {
    return this.http.get(url, { responseType: 'blob'});
  }

  updateMedia(media: UpdateMedia): Observable<UpdateMedia> {
    return this.http.put<UpdateMedia>(environment.apiUrl + '/media/users/' + this.authService.getUserId() + '/medias', media);
  }

 deleteMedia(idMedia: number): Observable<number> {
    return this.http.delete<number>(environment.apiUrl + '/media/users/' + this.authService.getUserId() + '/medias/' + idMedia);
  }

  addMediasToLibrary(idLibrary: number, medias: Media[]): Observable<Media[]> {
    return this.http.post<Media[]>(environment.apiUrl + '/media/users/' + this.authService.getUserId() + '/library/' + idLibrary + '/medias', medias)
  }

  getMedia(id: number) {
    return this.http.get(`${environment.apiUrl}/media/media/${id}`);
  }

  addComment(comment: any) {
    return this.http.post(`${environment.apiUrl}/media/comment`, comment);
  }

  loadComment(idMedia: number) {
    return this.http.get(`${environment.apiUrl}/media/${idMedia}/comment`);
  }
}
