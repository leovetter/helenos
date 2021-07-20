import { MediaActionTypes, MediaActions } from './media.actions';
import { UpdateMedia } from '../model/update-media.model';
import { HttpErrorResponse } from '@angular/common/http';

// Define the state for this feature
export interface MediaState {
  currentMedia: UpdateMedia;
  showEditPanel: boolean;
  errorMessage: HttpErrorResponse;
  succesMessage: string;
  selectedSort: string;
}

// initialize the state for this feature
const initialState: MediaState = {
  currentMedia: null,
  showEditPanel: false,
  errorMessage: null,
  succesMessage: null,
  selectedSort: 'updateDate'
};

// Define the reducers
export function reducer(state = initialState, action: MediaActions): MediaState {

  switch (action.type) {
    case MediaActionTypes.SetEditMedia:
      return {
        ...state,
        currentMedia: action.payload
      };
    case MediaActionTypes.UpdateSuccesMedia:
      return {
        ...state,
        showEditPanel: false,
        succesMessage: 'editMediaOk'
      };
    case MediaActionTypes.UpdateFailMedia:
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
}
