import { ProfileActionTypes, ProfileActions } from './profile.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountUser } from 'src/app/shared/model/account-user.model';

// Define the state for this feature
export interface ProfileState {
}

// initialize the state for this feature
const initialState: ProfileState = {
};

// Define the reducers
export function reducer(state = initialState, action: ProfileActions): ProfileState {

  // switch (action.type) {
  //   default:
  //     return state;
  // }
  return state;
}
