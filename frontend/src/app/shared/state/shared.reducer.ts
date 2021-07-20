import { SharedActionTypes, SharedActions } from './shared.actions';
import { AudioContext } from 'src/app/shared/model/audio-context.model';
import { CurrentAudio } from '../model/current-audio.model';
import { AccountUser } from 'src/app/shared/model/account-user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Settings } from 'src/app/shared/model/settings.model';

// Define the state for this feature
export interface SharedState {
  audioContext: AudioContext;
  currentAudio: CurrentAudio;
  user: AccountUser;
  errorMessage: HttpErrorResponse,
  person: AccountUser,
  player: boolean,
  settings: Settings
}

// initialize the state for this feature
const initialState: SharedState = {
  audioContext: null,
  currentAudio: null,
  user: null,
  errorMessage: null,
  person: null,
  player: false,
  settings: null
};

// Define the reducers
export function reducer(state = initialState, action: SharedActions): SharedState {

  switch (action.type) {
    case SharedActionTypes.SetCurrentAudio:
      return {
        ...state,
        currentAudio: action.payload,
      };
    case SharedActionTypes.SetAudioContext:
      return {
        ...state,
        audioContext: action.payload,
      };
    case (SharedActionTypes.LoadSuccesUser):
      return {
        ...state,
        user: action.payload
      };
    case (SharedActionTypes.LoadFailUser):
      return {
        ...state,
        errorMessage: action.payload
      };
    case (SharedActionTypes.SaveSuccesUser):
      return {
        ...state,
        user: action.payload
      };
    case (SharedActionTypes.SaveFailUser):
      return {
        ...state,
        errorMessage: action.payload
      };
    case SharedActionTypes.LoadSuccesPerson:
      return {
        ...state,
        person: action.payload
      };  
    case SharedActionTypes.SetPlayer:
      return {
        ...state,
        player: action.payload
      };  
    case SharedActionTypes.LoadSettingsSuccess:
      return {
        ...state,
        settings: action.payload
      };  
      case SharedActionTypes.LoadSettingsFail:
        return {
          ...state,
          errorMessage: action.payload
        };  
  default:
      return state;
  }
}
