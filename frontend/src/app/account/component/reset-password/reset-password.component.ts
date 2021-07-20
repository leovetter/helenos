import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordMustMatch } from '../../../shared/validator/passwordMustMatch.validator';
import { AuthenticateService } from 'src/app/core/service/authenticate.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'acc-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  token: string;
  idUser: string;
  faLock = faLock;

  constructor(private fb: FormBuilder,
              private authService: AuthenticateService,
              private toastr: ToastrService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.resetPasswordForm = this.buildResetPasswordForm();
    this.route.queryParams.subscribe(params => {
      this.token = params.token;
      this.idUser = params.idUser;
    });
  }

  buildResetPasswordForm() {
    return this.fb.group({
      password: ['', [Validators.required, Validators.pattern('.*[A-Z].*[0-9].*|.*[0-9].*[A-Z]'),
                        Validators.minLength(8)]],
      repeatPassword: ['', Validators.required]
    }, { validator: passwordMustMatch() })
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.authService.resetPassword(this.resetPasswordForm.get('password').value, this.token, this.idUser).subscribe((message: string) => {
        this.toastr.info(message);
      })
    }
  }

}
