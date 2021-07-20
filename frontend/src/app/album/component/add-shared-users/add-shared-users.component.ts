import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { UserService } from 'src/app/core/service/user.service';
import { SharedUser } from 'src/app/user/model/shared-user.model';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as fromLibrary from '../../../albums/state';
import * as libraryActions from '../../../albums/state/albums.actions';

@Component({
  selector: 'hel-add-shared-users',
  templateUrl: './add-shared-users.component.html',
  styleUrls: ['./add-shared-users.component.scss']
})
export class AddSharedUsersComponent implements OnInit {

  @Input() albumId: number;
  @Output() hidePopup = new EventEmitter<null>();

  suggestUsers: SharedUser[];
  newSharedUsers: SharedUser[] = [];
  searchGroup: FormGroup;

  faTrash = faTrash;
  
  constructor(private fb: FormBuilder,
              private userService: UserService,
              private cdf: ChangeDetectorRef,
              private store: Store<fromLibrary.State>) { }

  ngOnInit() {

    this.searchGroup = this.buildSearchGroup();

    this.searchGroup.get('searchUser').valueChanges.pipe(
      // if character length greater than 2
      filter(res => res.length > 2)
      // Time in milliseconds between key events
      , debounceTime(1000)
      // If previous query is diffent from current
      , distinctUntilChanged()
    ).subscribe((searchTerm: string) => {
      this.userService.findSharedUsers(searchTerm).subscribe(users => {
        this.suggestUsers = users;
        this.cdf.detectChanges();
      });
    });
  }

  buildSearchGroup() {
    return this.fb.group({
      searchUser: ''
    });
  }

  addSharedUser(user: SharedUser) {
    console.log(user)
    this.newSharedUsers.push(user);
    this.cdf.detectChanges();
  }

  deleteUser(user: SharedUser) {
    const index = this.newSharedUsers.indexOf(user);
    this.newSharedUsers.splice(index, 1);
    this.cdf.detectChanges();
  }

  hideSharedUsersPopup() {
    this.hidePopup.emit();
  }

  addSharedUsers() {
    this.newSharedUsers.forEach(user => {
      user.libraryId = this.albumId;
    })
    this.userService.saveSharedUsers(this.newSharedUsers).subscribe(() => {
      this.store.dispatch(new libraryActions.LoadSharedUsers(this.albumId));
    });
    this.hideSharedUsersPopup();
  }

}
