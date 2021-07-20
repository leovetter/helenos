import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (environment.prod) {
            const secureRequest = request.clone({
                url: request.url.replace('http://', 'https://')
            });
            return next.handle(secureRequest);
        }
        return next.handle(request);
    }
}
