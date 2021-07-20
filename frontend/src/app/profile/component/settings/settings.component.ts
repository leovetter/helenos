import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/service/user.service';
import { AccountUser } from 'src/app/shared/model/account-user.model';
import { passwordMustMatch } from 'src/app/shared/validator/passwordMustMatch.validator';
import * as fromShared from '../../../shared/state/';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  user: AccountUser;
  passwordForm: FormGroup;

  showEditLangue = false;
  langue: string;

  constructor(private translateService: TranslateService,
              private fb: FormBuilder,
              private userService: UserService,
              private toastr: ToastrService,
              private store: Store<fromShared.State>) { }

  ngOnInit() {

    this.langue = this.translateService.currentLang;
    this.passwordForm = this.createPasswordForm();
    this.store.pipe(select(fromShared.getUserFeatureState)).subscribe(user => {
      this.user = user;
    });
  }

  createPasswordForm() {
    return this.fb.group({
      passwordGroup: this.fb.group({
        oldPassword: ['', Validators.required ],
        password: ['', [Validators.minLength(8), Validators.pattern('.*[A-Z].*[0-9].*|.*[0-9].*[A-Z]')]],
        repeatPassword: [''],
      }, { validator: passwordMustMatch() })
  })
}

  saveLangue() {
    this.showEditLangue = false;
    this.translateService.use(this.langue);
  }

  savePassword() {
    if(this.passwordForm.get('passwordGroup').valid && this.passwordForm.get('passwordGroup').get('oldPassword').value !== "") {
      this.userService.updatePassword(this.user.id, 
                                      this.passwordForm.get('passwordGroup').get('oldPassword').value, 
                                      this.passwordForm.get('passwordGroup').get('password').value).subscribe(
                                        (mess: string) => {
                                          if(mess === 'PasswordEdited') {
                                            this.translateService.get('PasswordEdited').subscribe((message) => {
                                              this.toastr.success(message);
                                            });
                                          } else if(mess === 'WrongPassword') {
                                            this.translateService.get('WrongPassword').subscribe((message) => {
                                              this.toastr.warning(message);
                                            });
                                          }
                                        }
                                      );
    }
  }

}
