import { Component, OnInit, Inject } from '@angular/core';
import { SignUpUser } from '../../model/signUpUser.model';
import { AuthenticateService } from '../../../core/service/authenticate.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordMustMatch } from '../../../shared/validator/passwordMustMatch.validator';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NavbarService } from 'src/app/core/service/navbar.service';
import { Router } from '@angular/router';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'acc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: SignUpUser = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    driveSocial: '',
  };
  signUpForm: FormGroup;
  appRootClick = false;
  showLoginView = false;
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;

  constructor(private authService: AuthenticateService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private translateService: TranslateService,
              private navbarService: NavbarService,
              private router: Router) { }

  ngOnInit() {
    // Create the signUpForm
    this.signUpForm = this.createSignUpForm();
    this.navbarService.nextSmallNavbar(true);

    this.signUpForm.get('drive').valueChanges.subscribe(value => {
      if (value) this.signUpForm.get('social').setValue(false);
    });

    this.signUpForm.get('social').valueChanges.subscribe(value => {
      if (value) this.signUpForm.get('drive').setValue(false);
    });
  }

  /**
   * Edit the visibility of the login component based
   * on the clicks of the user on the page
   */
  changeVisibility() {
    if (this.showLoginView && this.appRootClick) {
      this.showLoginView = false;
      this.appRootClick = false;
    } else if (this.showLoginView && !this.appRootClick) {
      this.appRootClick = true;
    } else if (!this.showLoginView && this.appRootClick) {
      this.appRootClick = false;
    }
  }

  /**
   * Create the form
   */
  createSignUpForm() {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group(
        {
        // The regex say that we match the string if we have at least one uppercase
        // letter, one digit and one non alphanumeric character
        password: ['', [Validators.required, Validators.pattern('.*[A-Z].*[0-9].*|.*[0-9].*[A-Z]'),
                        Validators.minLength(8)]],
          repeatPassword: ['', Validators.required]
        },
        { validator: passwordMustMatch() }
      ),
      drive: [ false ],
      social: [ true ],
    });
  }

  /**
   * Submit the user data when the form is submited and store the id of the user and
   * the jwt token in the localStorage
   */
  signUp() {
    if (this.signUpForm.valid) {
      this.copyUser();
      this.authService.signUp(this.user).subscribe((res) => {
        if("error" in res) {
          this.toastr.warning(res.error);
        } else {
          this.translateService.get('registrationDone').subscribe((message) => {
            this.toastr.info(message);
          });
        }
      });
    }
  }

  /**
   * Copy the form values into the user variable
   */
  copyUser() {
    this.user.firstName = this.signUpForm.get('firstName').value;
    this.user.lastName = this.signUpForm.get('lastName').value;
    this.user.email = this.signUpForm.get('email').value;
    this.user.password = this.signUpForm.get('passwordGroup').get('password').value;
    this.signUpForm.get('social').value ? this.user.driveSocial = 'social' : this.user.driveSocial = 'drive';
  }
}
