import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticateService } from '../../core/service/authenticate.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authenticateService: AuthenticateService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.authenticateService.getJwtToken()
      }
    });
    return next.handle(request);
  }
}
