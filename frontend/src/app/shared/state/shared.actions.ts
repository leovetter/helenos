import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { AudioContext } from 'src/app/shared/model/audio-context.model';
import { AccountUser } from 'src/app/shared/model/account-user.model';
import { CurrentAudio } from '../model/current-audio.model';
import { ViewAlbum } from 'src/app/albums/model/view-album.model';
import { Album } from 'src/app/albums/model/album.model';
import { Settings } from '../model/settings.model';

// Define the actions we have in our system
export enum SharedActionTypes {
  SetAudioContext = '[SHARED] Set Audio Context',
  SetCurrentAudio = '[SHARED] Set Current Audio',
  LoadUser = '[SHARED] load User',
  LoadSuccesUser = '[SHARED] load Succes User',
  LoadFailUser = '[SHARED] load Fail User',
  SaveUser = '[USER] Save User',
  SaveSuccesUser = '[USER] Save Succes User',
  SaveFailUser = '[USER] Save Fail User',
  LoadSharedShortLibraries = '[SHARED] Load Shared Short libraries',
  LoadSuccesSharedShortLibraries = '[SHARED] Load Succes Shared Short libraries',
  LoadFailSharedShortLibraries = '[SHARED] Load Fail Shared Short libraries',
  LoadShortLibraries = '[SHARED] Load Short libraries',
  LoadSuccesShortLibraries = '[SHARED] Load Succes Short libraries',
  LoadFailShortLibraries = '[SHARED] Load Fail Short libraries',
  SetLibrary = '[SHARED] Set Library',
  LoadLibrary = '[SHARED] Load Library',
  LoadSuccesLibrary = '[SHARED] Load Succes Library',
  LoadFailLibrary = '[SHARED] Load Fail Library',
  SetUrls = '[SHARED] Set Urls',
  LoadPerson = '[SHARED] Load Person',
  LoadSuccesPerson = '[SHARED] Load Succes Person',
  LoadFailPerson = '[SHARED] Load Fail Person',
  SetPlayer = '[SHARED] Set Player',
  LoadSettings = '[SHARED] Load Settings',
  LoadSettingsSuccess = '[SHARED] Load Settings Success',
  LoadSettingsFail = '[SHARED] Load Settings Fail',
}

// Define Action Creators
export class SetAudioContext implements Action {
  readonly type = SharedActionTypes.SetAudioContext;
  public constructor(public payload: AudioContext) {}
}

export class SetCurrentAudio implements Action {
  readonly type = SharedActionTypes.SetCurrentAudio;
  public constructor(public payload: CurrentAudio) {}
}

// Define the actions class for this feature
export class LoadUser {
  readonly type = SharedActionTypes.LoadUser;
  constructor(public payload: string) {}
}

export class LoadSuccesUser {
  readonly type = SharedActionTypes.LoadSuccesUser;
  constructor(public payload: AccountUser) {}
}

export class LoadFailUser {
  readonly type = SharedActionTypes.LoadFailUser;
  constructor(public payload: HttpErrorResponse) {}
}

export class SaveUser {
  readonly type = SharedActionTypes.SaveUser;
  constructor(public payload: AccountUser) {}
}

export class SaveSuccesUser {
  readonly type = SharedActionTypes.SaveSuccesUser;
  constructor(public payload: AccountUser) {}
}

export class SaveFailUser {
  readonly type = SharedActionTypes.SaveFailUser;
  constructor(public payload: HttpErrorResponse) {}
}

export class LoadSharedShortLibraries implements Action {
  readonly type = SharedActionTypes.LoadSharedShortLibraries;
  constructor(public payload: string) { }
}

export class LoadSuccesSharedShortLibraries implements Action {
  readonly type = SharedActionTypes.LoadSuccesSharedShortLibraries;
  constructor(public payload: ViewAlbum[]) { }
}

export class LoadFailSharedShortLibraries implements Action {
  readonly type = SharedActionTypes.LoadFailSharedShortLibraries;
  constructor(public payload: HttpErrorResponse) { }
}

export class LoadShortLibraries implements Action {
  readonly type = SharedActionTypes.LoadShortLibraries;
  constructor(public payload: string) { }
}

export class LoadSuccesShortLibraries implements Action {
  readonly type = SharedActionTypes.LoadSuccesShortLibraries;
  constructor(public payload: ViewAlbum[]) { }
}

export class LoadFailShortLibraries implements Action {
  readonly type = SharedActionTypes.LoadFailShortLibraries;
  constructor(public payload: HttpErrorResponse) { }
}

export class SetLibrary implements Action {
  readonly type = SharedActionTypes.SetLibrary;
  public constructor(public payload: Album) {}
}

export class LoadLibrary implements Action {
  readonly type = SharedActionTypes.LoadLibrary;
  constructor(public payload: number) { }
}

export class LoadSuccesLibrary implements Action {
  readonly type = SharedActionTypes.LoadSuccesLibrary;
  constructor(public payload: Album) { }
}

export class LoadFailLibrary implements Action {
  readonly type = SharedActionTypes.LoadFailLibrary;
  constructor(public payload: HttpErrorResponse) { }
}

export class SetUrls implements Action {
  readonly type = SharedActionTypes.SetUrls;
  public constructor(public payload: string[]) {}
}

export class LoadPerson implements Action {
  readonly type = SharedActionTypes.LoadPerson;
  constructor(public payload: string) { }
}

export class LoadSuccesPerson implements Action {
  readonly type = SharedActionTypes.LoadSuccesPerson;
  constructor(public payload: AccountUser) { }
}

export class LoadFailPerson implements Action {
  readonly type = SharedActionTypes.LoadFailPerson;
  constructor(public payload: HttpErrorResponse) { }
}

export class SetPlayer implements Action {
  readonly type = SharedActionTypes.SetPlayer;
  constructor(public payload: boolean) { }
}

export class LoadSettings implements Action {
  readonly type = SharedActionTypes.LoadSettings;
  constructor(public payload: number) { }
}

export class LoadSettingsSuccess implements Action {
  readonly type = SharedActionTypes.LoadSettingsSuccess;
  constructor(public payload: Settings) { }
}

export class LoadSettingsFail implements Action {
  readonly type = SharedActionTypes.LoadSettingsFail;
  constructor(public payload: HttpErrorResponse) { }
}


// Define the type of actions possible for our system
export type SharedActions = SaveUser |
SaveSuccesUser |
SaveFailUser |
LoadUser |
LoadSuccesUser |
LoadFailUser |
SetAudioContext |
SetCurrentAudio |
LoadSharedShortLibraries |
LoadSuccesSharedShortLibraries |
LoadFailSharedShortLibraries |
LoadShortLibraries |
LoadSuccesShortLibraries |
LoadFailShortLibraries |
SetLibrary |
LoadLibrary |
LoadSuccesLibrary |
LoadFailLibrary |
SetUrls | 
LoadPerson |
LoadSuccesPerson |
LoadFailPerson |
SetPlayer |
LoadSettings |
LoadSettingsSuccess |
LoadSettingsFail;
