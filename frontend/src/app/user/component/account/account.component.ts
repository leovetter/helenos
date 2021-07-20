import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountUser } from '../../../shared/model/account-user.model';
import { MediaService } from 'src/app/core/service/media.service';
import { HttpEventType } from '@angular/common/http';
import { AuthenticateService } from './../../../core/service/authenticate.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { passwordMustMatch } from 'src/app/shared/validator/passwordMustMatch.validator';
import { UserService } from 'src/app/core/service/user.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'usr-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  accountForm: FormGroup;
  selectedFile: any;
  pictureSrc: any;
  // tslint:disable-next-line: variable-name no-input-rename
  @Input('user') _user: AccountUser;
  @Output() editUser = new EventEmitter<AccountUser>();

  constructor(private fb: FormBuilder,
              private mediaService: MediaService,
              private authService: AuthenticateService,
              private toastr: ToastrService,
              private translateService: TranslateService,
              private userService: UserService) { }

  ngOnInit() {
    // Create the form
    this.accountForm = this.createAccountForm();
  }

  /**
   * Create the accountForm
   */
  createAccountForm() {
    return this.fb.group({
      infosGroup: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
      }),
      passwordGroup: this.fb.group({
        oldPassword: [''],
        password: [''],
        repeatPassword: [''],
      }, { validator: passwordMustMatch() })
      
    });
  }

  /**
   * Triggered when the user change the account picture
   * @param files the files which are uploaded
   */
  onFileChange(files) {

    // Set the image that has been uploaded and edit the picture on the page
    this.selectedFile = files[0];
    const reader = new FileReader();
    
    reader.onload = e => {
      this.pictureSrc = reader.result;
      // const editedUser: AccountUser = {
      //   id: this._user.id,
      //   picture: this.selectedFile.name,
      //   firstName: this.accountForm.get('infosGroup').get('firstName').value,
      //   lastName: this.accountForm.get('infosGroup').get('lastName').value,
      //   email: this.accountForm.get('infosGroup').get('email').value
      // }
      // const fd = new FormData();
      // fd.append('media', this.selectedFile, this.selectedFile.name);
      // this.mediaService.uploadMedias(fd, 'profil').subscribe(event => {
      //   if (event.type === HttpEventType.Response) {
      //     this.editUser.emit(editedUser);
      //   }
      // });
    }
    reader.readAsDataURL(files[0]);
  }

  saveInfos() {
    if (this.accountForm.get('infosGroup').valid) {
      this.copyUser();
      if (this.selectedFile) {
        const fd = new FormData();
        fd.append('media', this.selectedFile, this.selectedFile.name);
        this.mediaService.uploadMedias(fd, 'profil').subscribe(event => {
          if (event.type === HttpEventType.Response) {
            this.editUser.emit(this._user);
          }
        });
      } else {
        this.editUser.emit(this._user);
      }
    }
  }

  savePassword() {
    if(this.accountForm.get('passwordGroup').valid && this.accountForm.get('passwordGroup').get('oldPassword').value !== "") {
      this.userService.updatePassword(this._user.id, 
                                      this.accountForm.get('passwordGroup').get('oldPassword').value, 
                                      this.accountForm.get('passwordGroup').get('password').value).subscribe(
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

  /**
   * Populate the properties of user with the values of the accountForm
   */
  copyUser() {
    this._user.firstName = this.accountForm.get('infosGroup').get('firstName').value;
    this._user.lastName = this.accountForm.get('infosGroup').get('lastName').value;
    this._user.email = this.accountForm.get('infosGroup').get('email').value;
    if (this.selectedFile !== undefined) {
      this._user.picture = this.selectedFile.name;
    }
  }

  /***
   * Populate the values of the form with the properties of user
   */
  copyAccountForm() {
    this.accountForm.get('infosGroup').get('firstName').setValue(this._user.firstName);
    this.accountForm.get('infosGroup').get('lastName').setValue(this._user.lastName);
    this.accountForm.get('infosGroup').get('email').setValue(this._user.email);
  }

  @Input()
  set user(user: AccountUser) {
    this._user = user;
    // Copy the values of the user into the form and set the value of the src
    // attribute of the img tag if the accountForm has been initialized
    if (this.accountForm) {
      this.copyAccountForm();
      this.pictureSrc = 'http://localhost:8080/media/users/' + this.authService.getUserId() + '/media/' + this._user.picture;
    }
  }
}
