import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountUser } from 'src/app/shared/model/account-user.model';
import { Animations } from './about.animations';

@Component({
  selector: 'lb-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  animations: [ 
    Animations.openInput,
    Animations.openLastNameInput,
  ]
})
export class AboutComponent implements OnInit, OnChanges {

  @Input() user: AccountUser;
  @Input() person: boolean;
  @Output() editUser = new EventEmitter<AccountUser>();
  
  aboutForm: FormGroup;
  showInputFirstName = false;
  showInputLastName = false;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.aboutForm = this.buildAboutForm();
  }

  ngOnChanges(changes: SimpleChanges) {

    if(changes.user  && this.aboutForm) {
      this.updateForm();
    }
  }

  buildAboutForm() {
    return this.aboutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  updateForm() {
    this.aboutForm.get('firstName').setValue(this.user.firstName);
    this.aboutForm.get('lastName').setValue(this.user.lastName);
  }

  setInputFirstName() {
    if(!this.person) {

      this.updateForm();
      this.showInputFirstName = true;
      const inputFirstName = document.getElementById('input-first-name') as HTMLInputElement;
      inputFirstName.style.width = 'auto';
      inputFirstName.style.visibility = 'visible';
      inputFirstName.focus();
      inputFirstName.setSelectionRange(this.aboutForm.get('firstName').value.length, this.aboutForm.get('firstName').value.length);
    }
  }

  setInputLastName() {

    if(!this.person) {
      
      this.updateForm();
      this.showInputLastName = true;
      const inputLastName = document.getElementById('input-last-name') as HTMLInputElement;
      inputLastName.style.width = 'auto';
      inputLastName.style.visibility = 'visible';
      inputLastName.focus();
      inputLastName.setSelectionRange(this.aboutForm.get('lastName').value.length, this.aboutForm.get('lastName').value.length);
    }
  }

  resetFieldFirstName() {
    this.showInputFirstName = false;
    this.aboutForm.get('firstName').setValue(this.user.firstName);
    this.aboutForm.get('firstName').markAsPristine();
  }

  resetFieldLastName() {
    this.showInputLastName = false;
    this.aboutForm.get('lastName').setValue(this.user.lastName);
    this.aboutForm.get('lastName').markAsPristine();
  }

  saveFirstName() {
    this.editUser.emit({ ...this.user, firstName: this.aboutForm.get('firstName').value });
    this.showInputFirstName = false;
    this.aboutForm.get('firstName').reset();
  }

  saveLastName() {
    this.editUser.emit({ ...this.user, lastName: this.aboutForm.get('lastName').value });
    this.showInputLastName = false;
    this.aboutForm.get('lastName').reset();
  }

}
