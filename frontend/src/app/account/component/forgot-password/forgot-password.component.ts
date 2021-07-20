import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from 'src/app/core/service/authenticate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthenticateService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.forgotPasswordForm = this.createForgotPasswordForm();
  }

  /**
   * Create the forgotPasswordForm
   */
  createForgotPasswordForm() {
    return this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  forgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.authService.forgottenPassword(this.forgotPasswordForm.get('email').value).subscribe((resp: any) => {
        this.toastr.info(resp.message);
      });
    }
  }

}
