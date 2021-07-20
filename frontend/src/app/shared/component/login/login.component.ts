import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticateService } from '../../../core/service/authenticate.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import * as JWT from 'jwt-decode';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as fromShared from '../../state';
import * as sharedActions from '../../state/shared.actions';
import { Store } from '@ngrx/store';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'acc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials = {email: '', password: ''};
  loginForm: FormGroup;
  errorMessage: string;
  @Output() setShowLoginView = new EventEmitter<boolean>();

  constructor(private authenticateService: AuthenticateService,
              private router: Router,
              private fb: FormBuilder,
              private store: Store<fromShared.State>,
              ) { }

  ngOnInit() {
    // Create the loginForm and listen on changes to erase
    // the error message when the user edit the form
    this.loginForm = this.createLoginForm();
    this.onLoginFormChanges();
    // Set the rememberMe field to true
    this.loginForm.get('rememberMe').setValue(true);
  }

  /**
   * Create the loginForm
   */
  createLoginForm() {
    return this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      rememberMe: ''
    });
  }

  /**
   * Listen on change to the form values to reset error message
   * if the user edit the form
   */
  onLoginFormChanges() {
    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = null;
    });
  }

  /**
   * Reset the form values and errors
   */
  clearLoginForm() {
    this.loginForm.get('email').reset();
    this.loginForm.get('password').reset();
    this.loginForm.controls.email.setErrors(null);
    this.loginForm.controls.password.setErrors(null);
    this.errorMessage = null;
  }

  /**
   * Submit the redentials when the form is submitted
   * When the server respond set the user id and jwt token
   * to the localStorage and navigate to the libraries page
   */
  login() {
    this.loginForm.controls.email.updateValueAndValidity();
    this.loginForm.controls.password.updateValueAndValidity();
    if (this.loginForm.valid) {
      this.copyCredential();
      this.authenticateService.authenticate(this.credentials).subscribe((response: HttpResponse<any>) => {
        const token = response.headers.get('Authorization').replace('Bearer ', '');
        const idUser = JWT<any>(token).sub;
        this.authenticateService.storeUserId(idUser);
        this.authenticateService.storeJwtToken(token);
        this.clearLoginForm();
        // Emit an event to notify the parent component that the login
        // component need to be hidden
        this.setShowLoginView.emit(false);

        console.log('before load settings')
        this.store.dispatch(new sharedActions.LoadSettings(idUser));
        
      }, ((err: HttpResponse<any>) => {
        if (err.status === 401) {
          this.errorMessage = 'Mauvais identifiants';
        }
    }));
    }
  }

  /**
   * Copy the form values into the credentials object
   */
  copyCredential() {
    this.credentials.email = this.loginForm.get('email').value;
    this.credentials.password = this.loginForm.get('password').value;
  }

  forgotPassword() {
    this.router.navigateByUrl('account/forgot-password');
    this.setShowLoginView.emit(false);
  }
}
