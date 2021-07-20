import { Injectable, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { RollbarService } from './rollback.service';
import * as Rollbar from 'rollbar';
import { AuthenticateService } from './authenticate.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private toastr: ToastrService,
              private authService: AuthenticateService,
              private router: Router,
              @Inject(RollbarService) private rollbar: Rollbar) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status} \r\n Message: ${error.message}`;
    }
    if(error.error.message &&  error.error.message.indexOf("The Token has expired") !== -1) {
      this.authService.deleteJwtToken();
      this.router.navigateByUrl('account/home');
    }
    
  }
}
