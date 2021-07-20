import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SignUpUser } from '../../account/model/signUpUser.model';
import { environment } from './../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  authenticated = false;

  constructor(private http: HttpClient) { }

  authenticate(credentials: any): Observable<HttpResponse<any>> {
    return this.http.post(environment.apiUrl + '/login', credentials, { observe: 'response'});
  }

  signUp(user: SignUpUser): Observable<any> {
     return this.http.post<any>(environment.apiUrl + '/register', user);
  }

  registrationConfirm(token: string): Observable<string> {
    return this.http.get(environment.apiUrl + '/registrationConfirm', { params: { token }, responseType: 'text'});
  }

  forgottenPassword(email: string): Observable<string> {
    return this.http.get(environment.apiUrl + '/forgottenPassword', { params: { email }, responseType: 'text'}).pipe(map((res: any) => JSON.parse(res)));
  }

  resetPassword(newPassword: string, token: string, idUser: string): Observable<string> {
    return this.http.post(environment.apiUrl + '/resetPassword', { password: newPassword }, { params: { token, idUser }, responseType: 'text'});
  }

  storeJwtToken(token: string) {
    localStorage.setItem('Authorization', token);
  }

  getJwtToken() {
    return localStorage.getItem('Authorization');
  }

  deleteJwtToken() {
    localStorage.removeItem('Authorization');
  }

  isLoggedIn() {
    return localStorage.getItem('Authorization') !== null;
  }

  storeUserId(idUser: number) {
    localStorage.setItem('idUser', idUser.toString());
  }

  getUserId() {
    return localStorage.getItem('idUser');
  }
}
