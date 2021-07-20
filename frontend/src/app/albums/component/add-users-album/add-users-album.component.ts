import { Component, OnInit, Input, Output, EventEmitter, Inject, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SharedUser } from 'src/app/user/model/shared-user.model';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'hel-add-users-library',
  templateUrl: './add-users-album.component.html',
  styleUrls: ['./add-users-album.component.scss']
})
export class AddUsersAlbumComponent implements OnInit, OnDestroy, OnChanges {

  @Input() sharedUsers: SharedUser[] = [];
  @Input() suggestUsers: SharedUser[] = [];
  @Input() idLibrary: number;
  // tslint:disable-next-line: no-input-rename variable-name
  @Output() searchUserTerm = new EventEmitter<string>();
  @Output() newSharedUsers = new EventEmitter<SharedUser>();
  @Output() deleteSharedUser = new EventEmitter<SharedUser>();
  @Output() saveSharedUsers = new EventEmitter<SharedUser[]>();
  @Output() setVisibilityAlbum = new EventEmitter<any>();
  
  userGroup: FormGroup;
  sharedUsersSubmitted = false;

  faTrash = faTrash;

  constructor(private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    document.body.scrollTop = 0;
    // Build the userGroup form
    this.userGroup = this.buildUserGroup();

    /**
     * Listen for changes on the searchUser control of the userGroup
     * Form. Changes are triggered if the string has a length greater than 2,
     * if the time between two emission is greater than 1s and if the previous
     * emiited value is different from the new one
     */
    this.userGroup.get('searchUser').valueChanges.pipe(
      // if character length greater than 2
      filter(res => res.length > 2)
      // Time in milliseconds between key events
      , debounceTime(1000)
      // If previous query is diffent from current
      , distinctUntilChanged()
    ).subscribe((searchTerm: string) => {
      this.searchUserTerm.emit(searchTerm);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if(changes.sharedUsers && this.userGroup && changes.sharedUsers.currentValue.length == 0) {
    //   this.userGroup.get('publicLibrary').setValue(true);
    // }
  }

  ngOnDestroy() {
    this.sharedUsers.forEach((sharedUser: SharedUser) => {
      this.deleteSharedUser.emit(sharedUser);
    });
  }

  /**
   * function to build the userGroup Form
   */
  buildUserGroup() {
    return this.fb.group({
      searchUser: '',
      publicLibrary: true,
    });
  }

  deleteUser(user: SharedUser) {
    this.deleteSharedUser.emit(user);
  }

  addSharedUser(user: SharedUser) {
    this.newSharedUsers.emit(user);
  }

  /**
   * Trigger when the user press the enter button and
   * is focused on the searchUser form field
   *
   * @param event the object associated with the key up event
   */
  // onSearchUserKeyUp(event: KeyboardEvent) {
  //   if (event.code === 'Enter') {
  //     const user = this.suggestUsers.find((suggestUser: SharedUser) => {
  //                                         const fullName = suggestUser.firstName + ' ' + suggestUser.lastName;
  //                                         return fullName.indexOf(this.userGroup.get('searchUser').value) !== -1;
  //                                       });
  //     this.newSharedUsers.emit(user);
  //   }
  // }

  /**
   * Submit the sharedUsers when the form is submitted
   */
  submitUsers() {

    this.sharedUsersSubmitted = true;
    // Add the id of the library to be shared to the sharedUsers
    this.sharedUsers.forEach(user => {
      user.libraryId = this.idLibrary;
    });

    this.saveSharedUsers.emit(this.sharedUsers);
    this.setVisibilityAlbum.emit({ idAlbum: this.idLibrary, isPublic: this.userGroup.get('publicLibrary').value})
  }
}
