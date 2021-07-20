import { Action } from '@ngrx/store';
import { UpdateMedia } from '../model/update-media.model';
import { HttpErrorResponse } from '@angular/common/http';

// Define the actions we have in our system
export enum MediaActionTypes {
  SetEditMedia = '[Media] Set Edit Media',
  UpdateMediaAction = '[Media] Update Media Action',
  UpdateFailMedia = '[Media] Update Fail Media',
  UpdateSuccesMedia = '[Media] Update Succes Media',
}

// Define Action Creators
export class SetEditMedia implements Action {
  readonly type = MediaActionTypes.SetEditMedia;
  public constructor(public payload: UpdateMedia) {}
}


export class UpdateMediaAction implements Action {
  readonly type = MediaActionTypes.UpdateMediaAction;
  public constructor(public payload: UpdateMedia) {}
}

export class UpdateFailMedia implements Action {
  readonly type = MediaActionTypes.UpdateFailMedia;
  public constructor(public payload: HttpErrorResponse) {}
}

export class UpdateSuccesMedia implements Action {
  readonly type = MediaActionTypes.UpdateSuccesMedia;
}


// Define the type of actions possible for our system
export type MediaActions = SetEditMedia |
  UpdateMediaAction |
  UpdateFailMedia |
  UpdateSuccesMedia;
