import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient,
              private authService: AuthenticateService) { }

  storeSubscription(sub: any) {
    return this.http.post<any>(`${environment.apiUrl}/media/subscriptions/${this.authService.getUserId()}`, sub);
  }

  getPublicSigningKey() {

    let headers = new HttpHeaders({
      'Content-Type':  'application/octet-stream',
      'Accept':'application/octet-stream',
   })

    return this.http.get(`${environment.apiUrl}/media/publicSigningKey`, {headers: headers, responseType: 'blob'})
  }
}
