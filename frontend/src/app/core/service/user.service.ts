import { Injectable } from '@angular/core';
import { SharedUser } from '../../user/model/shared-user.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { AccountUser } from 'src/app/shared/model/account-user.model';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';
import { AuthenticateService } from './authenticate.service';
import { Settings } from 'src/app/shared/model/settings.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private authService: AuthenticateService) { }

  loadSettings(idUser: number): Observable<Settings> {
    return this.http.get<Settings>(environment.apiUrl + `/media/settings/${idUser}`);
  }

  getAllSharedUsers(): Observable<SharedUser[]> {
    return this.http.get<SharedUser[]>(environment.apiUrl + '/media/sharedUsers').pipe(map(res => res as SharedUser[]));
  }

  findSharedUsers(searchTerm: string): Observable<SharedUser[]> {
    return this.http.get<SharedUser[]>(environment.apiUrl + '/media/users/' + this.authService.getUserId() + '/sharedUsers/' + searchTerm).pipe(map(res => res as SharedUser[]));
  }

  saveSharedUsers(users: SharedUser[]): Observable<SharedUser[]> {
    return this.http.post<SharedUser[]>(environment.apiUrl + '/media/sharedUsers', users).pipe(map(res => res as SharedUser[]));
  }

  loadSharedUsers(idLibrary: number): Observable<SharedUser[]> {
    return this.http.get<SharedUser[]>(environment.apiUrl + '/media/library/' + idLibrary + '/sharedUsers').pipe(map(res => res as SharedUser[]));
  }

  saveAccountUser(user: AccountUser): Observable<AccountUser> {
    return this.http.post<AccountUser>(environment.apiUrl + '/media/accountUsers', user).pipe(map(res => res as AccountUser));
  }

  getAccountUser(idUser: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/media/accountUsers/' + idUser);
  }

  updatePassword(idUser: number, oldPassword: string, newPassword: string): Observable<string> {
    return this.http.post(environment.apiUrl + '/media/updatePassword', { id: idUser, oldPassword, newPassword }, { responseType: 'text' });
  }
}
