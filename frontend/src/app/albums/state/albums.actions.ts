import { Action } from '@ngrx/store';
import { ViewAlbum } from '../model/view-album.model';
import { Album } from '../model/album.model';
import { SharedUser } from 'src/app/user/model/shared-user.model';
import { HttpErrorResponse } from '@angular/common/http';
// import { ShortShortLibrary } from '../model/short-short-library.model';
import { UpdateMedia } from 'src/app/media/model/update-media.model';
import { Media } from 'src/app/media/model/media.model';
import { AudioContext } from 'src/app/shared/model/audio-context.model';
import { EditAlbum } from '../model/edit-album.model';

// Define the actions we have in our system
export enum AlbumsActionTypes {
  LoadShortLibraries = '[Album] Load Short libraries',
  LoadSuccesShortLibraries = '[Album] Load Succes Short libraries',
  LoadFailShortLibraries = '[Album] Load Fail Short libraries',
  LoadSharedShortLibraries = '[Album] Load Shared Short libraries',
  LoadSuccesSharedShortLibraries = '[Album] Load Succes Shared Short libraries',
  LoadFailSharedShortLibraries = '[Album] Load Fail Shared Short libraries',
  SaveLibrary = '[Album] Save Album',
  SaveSuccesLibrary = '[Album] Save Succes Album',
  SaveFailLibrary = '[Album] Save Fail Album',
  LoadSuggestUsers = '[Album] Load Suggest users',
  LoadSuccesSuggestUsers = '[Album] Load Succes Suggest users',
  LoadFailSuggestUsers = '[Album] Load Success Suggest users',
  AddSharedUsers = '[Album] Add Shared User',
  SaveSharedUsers = '[Album] Save Shared User',
  SaveSuccesSharedUsers = '[Album] Save Succes Shared User',
  SaveFailSharedUsers = '[Album] Save Fail Shared User',
  LoadLibrary = '[Album] Load Album',
  LoadSuccesLibrary = '[Album] Load Succes Album',
  LoadFailLibrary = '[Album] Load Fail Album',
  SetLibraryIndex = '[Album] Set Album Index',
  SetFullScreenMediaName = '[Album] Set Full Screen Media Name',
  SetDisplayMedia = '[Album] Set Display Media',
  SetProgressRate = '[Album] Set Progress Rate',
  UpdateEditLibrary = '[Album] Update Edit Album',
  UpdateSharedShortLibrary = '[Album] Update Shared Short Album',
  UpdateSuccesEditLibrary = '[Album] Update Succes Edit Album',
  UpdateSuccesSharedShortLibrary = '[Album] Update Succes Shared Short Album',
  UpdateFailEditLibrary = '[Album] Update Fail Edit Album',
  UpdateFailSharedShortLibrary = '[Album] Update Fail Shared Short Album',
  LoadCurrentEditLibrary = '[Album] Load Current Edit Album',
  LoadSuccesCurrentEditLibrary = '[Album] Load Succes Current Edit Album',
  LoadFailCurrentEditLibrary = '[Album] Load Fail Current Edit Album',
  SetShowEditPanel = '[Album] Set Show Edit Panel',
  SetSuccesMessage = '[Album] Set Succes Message',
  SetTotalPages = '[Album] Set Total Pages',
  SetSharedTotalPages = '[Album] Set Shared Total Pages',
  AddLibraries = '[Album] Add Libraries',
  AddSuccesLibraries = '[Album] Add Succes Libraries',
  AddFailLibraries = '[Album] Add Fail Libraries',
  SetUrls = '[Album] Set Urls',
  SetSelectedSort = '[Album] Set Selected Sort',
  SetSharedSelectedSort = '[Album] Set Shared Selected Sort',
  SortShortLibraries = '[Album] Sort Short Libraries',
  SortSharedShortLibraries = '[Album] Sort Shared Short Libraries',
  FilterShortLibraries = '[Album] Filter Short Libraries',
  FilterSharedShortLibraries = '[Album] Filter Shared Short Libraries',
  SortMedias = '[Album] Sort Medias',
  FilterMedias = '[Album] Filter Medias',
  DeleteLibrary = '[Album] Delete Album',
  DeleteSuccesLibrary = '[Album] Delete Succes Album',
  DeleteFailLibrary = '[Album] Delete Fail Album',
  DeleteMedia = '[Album] Delete Media',
  DeleteSuccesMedia = '[Album] Delete Succes Media',
  DeleteFailMedia = '[Album] Delete Fail Media',
  DeleteSharedUser = '[Album] Delete Shared User',
  AddMediasToLibrary = '[Album] Add Medias to Album',
  AddMediasSuccessToLibrary = '[Album] Add Media Succes to Album',
  AddMediasFailToLibrary = '[Album] Add Media Fail to Album',
  SetLibrary = '[Album] Set Album',
  SetEditMedia = '[Album] Set Edit Media',
  UpdateMediaAction = '[Album] Update Media Action',
  UpdateFailMedia = '[Album] Update Fail Media',
  UpdateSuccesMedia = '[Album] Update Succes Media',
  LoadSharedUsers = '[Album] Load Shared User',
  LoadSuccesSharedUsers = '[Album] Load Succes Shared User',
  LoadFailSharedUsers = '[Album] Load Fail Shared User',
  AddComment = '[Album] Add Comment',
  AddSuccessComment = '[Album] Add Success Comment',
  AddFailComment = '[Album] Add Fail Comment',
  LoadComment = '[Album] Load Comment',
  LoadSuccessComment = '[Album] Load Success Comment',
  LoadFailComment = '[Album] Load Fail Comment',
  ReOrderAlbum = '[Album] ReOrder Album',
  ReOrderAlbumSuccess = '[Album] ReOrder Album Success',
  ReOrderAlbumFail = '[Album] ReOrder Album Fail',
}

// Define Action Creators
export class LoadShortLibraries implements Action {
  readonly type = AlbumsActionTypes.LoadShortLibraries;
  constructor(public payload: string) { }
}

export class AddMediasToLibrary implements Action {
  readonly type = AlbumsActionTypes.AddMediasToLibrary;
  constructor(public id: number, public payload: Media[]) { }
}

export class AddMediasSuccessToLibrary implements Action {
  readonly type = AlbumsActionTypes.AddMediasSuccessToLibrary;
  constructor(public payload: Media[]) { }
}

export class AddMediasFailToLibrary implements Action {
  readonly type = AlbumsActionTypes.AddMediasFailToLibrary;
  constructor(public payload: HttpErrorResponse) { }
}

export class LoadSuccesShortLibraries implements Action {
  readonly type = AlbumsActionTypes.LoadSuccesShortLibraries;
  constructor(public payload: ViewAlbum[]) { }
}

export class LoadFailShortLibraries implements Action {
  readonly type = AlbumsActionTypes.LoadFailShortLibraries;
  constructor(public payload: HttpErrorResponse) { }
}

export class LoadSharedShortLibraries implements Action {
  readonly type = AlbumsActionTypes.LoadSharedShortLibraries;
  constructor(public payload: string) { }
}

export class LoadSuccesSharedShortLibraries implements Action {
  readonly type = AlbumsActionTypes.LoadSuccesSharedShortLibraries;
  constructor(public payload: ViewAlbum[]) { }
}

export class LoadFailSharedShortLibraries implements Action {
  readonly type = AlbumsActionTypes.LoadFailSharedShortLibraries;
  constructor(public payload: HttpErrorResponse) { }
}

export class SaveLibrary implements Action {
  readonly type = AlbumsActionTypes.SaveLibrary;
  constructor(public payload: Album) { }
}

export class SaveSuccesLibrary implements Action {
  readonly type = AlbumsActionTypes.SaveSuccesLibrary;
  constructor(public payload: Album) { }
}

export class SaveFailLibrary implements Action {
  readonly type = AlbumsActionTypes.SaveFailLibrary;
  constructor(public payload: HttpErrorResponse) { }
}

export class LoadSuggestUsers implements Action {
  readonly type = AlbumsActionTypes.LoadSuggestUsers;
  constructor(public payload: string) { }
}

export class LoadSuccesSuggestUsers implements Action {
  readonly type = AlbumsActionTypes.LoadSuccesSuggestUsers;
  constructor(public payload: SharedUser[]) { }
}

export class LoadFailSuggestUsers implements Action {
  readonly type = AlbumsActionTypes.LoadFailSuggestUsers;
  constructor(public payload: HttpErrorResponse) { }
}

export class AddSharedUsers implements Action {
  readonly type = AlbumsActionTypes.AddSharedUsers;
  constructor(public payload: SharedUser) { }
}

export class SaveSharedUsers implements Action {
  readonly type = AlbumsActionTypes.SaveSharedUsers;
  constructor(public payload: SharedUser[]) { }
}

export class SaveSuccesSharedUsers implements Action {
  readonly type = AlbumsActionTypes.SaveSuccesSharedUsers;
  constructor() { }
}

export class SaveFailSharedUsers implements Action {
  readonly type = AlbumsActionTypes.SaveFailSharedUsers;
  constructor(public payload: HttpErrorResponse) { }
}

export class LoadLibrary implements Action {
  readonly type = AlbumsActionTypes.LoadLibrary;
  constructor(public payload: number) { }
}

export class LoadSuccesLibrary implements Action {
  readonly type = AlbumsActionTypes.LoadSuccesLibrary;
  constructor(public payload: Album) { }
}

export class LoadFailLibrary implements Action {
  readonly type = AlbumsActionTypes.LoadFailLibrary;
  constructor(public payload: HttpErrorResponse) { }
}

export class SetLibraryIndex implements Action {
  readonly type = AlbumsActionTypes.SetLibraryIndex;
  constructor(public payload: number) { }
}

export class SetFullScreenMediaName implements Action {
  readonly type = AlbumsActionTypes.SetFullScreenMediaName;
  constructor(public payload: string) { }
}

export class SetDisplayMedia implements Action {
  readonly type = AlbumsActionTypes.SetDisplayMedia;
  constructor(public payload: boolean) { }
}

export class SetProgressRate implements Action {
  readonly type = AlbumsActionTypes.SetProgressRate;
  constructor(public payload: number) { }
}

export class UpdateEditLibrary implements Action {
  readonly type = AlbumsActionTypes.UpdateEditLibrary;
  constructor(public payload: EditAlbum) {}
}

export class UpdateSuccesEditLibrary implements Action {
  readonly type = AlbumsActionTypes.UpdateSuccesEditLibrary;
  constructor(public payload: EditAlbum) {}
}

export class UpdateFailEditLibrary implements Action {
  readonly type = AlbumsActionTypes.UpdateFailEditLibrary;
  constructor(public payload: HttpErrorResponse) {}
}

// export class UpdateSharedShortLibrary implements Action {
//   readonly type = AlbumsActionTypes.UpdateSharedShortLibrary;
//   constructor(public payload: ShortShortLibrary) {}
// }

// export class UpdateSuccesSharedShortLibrary implements Action {
//   readonly type = AlbumsActionTypes.UpdateSuccesSharedShortLibrary;
//   constructor(public payload: ShortShortLibrary) {}
// }

export class UpdateFailSharedShortLibrary implements Action {
  readonly type = AlbumsActionTypes.UpdateFailSharedShortLibrary;
  constructor(public payload: HttpErrorResponse) {}
}

export class LoadCurrentEditLibrary implements Action {
  readonly type = AlbumsActionTypes.LoadCurrentEditLibrary;
  constructor(public payload: number) {}
}

export class LoadSuccesCurrentEditLibrary implements Action {
  readonly type = AlbumsActionTypes.LoadSuccesCurrentEditLibrary;
  constructor(public payload: EditAlbum) {}
}

export class LoadFailCurrentEditLibrary implements Action {
  readonly type = AlbumsActionTypes.LoadFailCurrentEditLibrary;
  constructor(public payload: any) {}
}

export class SetShowEditPanel implements Action {
  readonly type = AlbumsActionTypes.SetShowEditPanel;
  constructor(public payload: boolean) {}
}

export class SetSuccesMessage implements Action {
  readonly type = AlbumsActionTypes.SetSuccesMessage;
  constructor(public payload: string) {}
}

export class UpdateSuccesMedia implements Action {
  readonly type = AlbumsActionTypes.UpdateSuccesMedia;
  public constructor(public payload: UpdateMedia) {}
}

export class SetTotalPages implements Action {
  readonly type = AlbumsActionTypes.SetTotalPages;
  public constructor(public payload: number) {}
}

export class SetSharedTotalPages implements Action {
  readonly type = AlbumsActionTypes.SetSharedTotalPages;
  public constructor(public payload: number) {}
}

export class AddLibraries implements Action {
  readonly type = AlbumsActionTypes.AddLibraries;
  public constructor(public payload: number, public selectedSort: string) {}
}

export class AddSuccesLibraries implements Action {
  readonly type = AlbumsActionTypes.AddSuccesLibraries;
  public constructor(public payload: ViewAlbum[]) {}
}

export class AddFailLibraries implements Action {
  readonly type = AlbumsActionTypes.AddFailLibraries;
  public constructor(public payload: HttpErrorResponse) {}
}

export class SetUrls implements Action {
  readonly type = AlbumsActionTypes.SetUrls;
  public constructor(public payload: string[]) {}
}

export class SetSelectedSort implements Action {
  readonly type = AlbumsActionTypes.SetSelectedSort;
  public constructor(public payload: string) {}
}

export class SetSharedSelectedSort implements Action {
  readonly type = AlbumsActionTypes.SetSharedSelectedSort;
  public constructor(public payload: string) {}
}

export class SortShortLibraries implements Action {
  readonly type = AlbumsActionTypes.SortShortLibraries;
  public constructor(public payload: string) {}
}

export class SortSharedShortLibraries implements Action {
  readonly type = AlbumsActionTypes.SortSharedShortLibraries;
  public constructor(public payload: string) {}
}

export class FilterShortLibraries implements Action {
  readonly type = AlbumsActionTypes.FilterShortLibraries;
  public constructor(public payload: string) {}
}

export class FilterSharedShortLibraries implements Action {
  readonly type = AlbumsActionTypes.FilterSharedShortLibraries;
  public constructor(public payload: string) {}
}

export class SortMedias implements Action {
  readonly type = AlbumsActionTypes.SortMedias;
  public constructor(public payload: string) {}
}

export class FilterMedias implements Action {
  readonly type = AlbumsActionTypes.FilterMedias;
  public constructor(public payload: string) {}
}

export class DeleteLibrary implements Action {
  readonly type = AlbumsActionTypes.DeleteLibrary;
  public constructor(public payload: number) {}
}

export class DeleteSuccesLibrary implements Action {
  readonly type = AlbumsActionTypes.DeleteSuccesLibrary;
  public constructor(public payload: number) {}
}

export class DeleteFailLibrary implements Action {
  readonly type = AlbumsActionTypes.DeleteFailLibrary;
  public constructor(public payload: HttpErrorResponse) {}
}

export class DeleteMedia implements Action {
  readonly type = AlbumsActionTypes.DeleteMedia;
  public constructor(public payload: number) {}
}

export class DeleteSuccesMedia implements Action {
  readonly type = AlbumsActionTypes.DeleteSuccesMedia;
  public constructor(public payload: number) {}
}

export class DeleteFailMedia implements Action {
  readonly type = AlbumsActionTypes.DeleteFailMedia;
  public constructor(public payload: HttpErrorResponse) {}
}

export class DeleteSharedUser implements Action {
  readonly type = AlbumsActionTypes.DeleteSharedUser;
  public constructor(public payload: number) {}
}

export class SetLibrary implements Action {
  readonly type = AlbumsActionTypes.SetLibrary;
  public constructor(public payload: Album) {}
}

export class SetEditMedia implements Action {
  readonly type = AlbumsActionTypes.SetEditMedia;
  public constructor(public payload: UpdateMedia) {}
}


export class UpdateMediaAction implements Action {
  readonly type = AlbumsActionTypes.UpdateMediaAction;
  public constructor(public payload: UpdateMedia) {}
}

export class UpdateFailMedia implements Action {
  readonly type = AlbumsActionTypes.UpdateFailMedia;
  public constructor(public payload: HttpErrorResponse) {}
}

export class LoadSharedUsers implements Action {
  readonly type = AlbumsActionTypes.LoadSharedUsers;
  constructor(public payload: number) { }
}

export class LoadSuccesSharedUsers implements Action {
  readonly type = AlbumsActionTypes.LoadSuccesSharedUsers;
  constructor(public payload: SharedUser[]) { }
}

export class LoadFailSharedUsers implements Action {
  readonly type = AlbumsActionTypes.LoadFailSharedUsers;
  constructor(public payload: HttpErrorResponse) { }
}

export class AddComment implements Action {
  readonly type = AlbumsActionTypes.AddComment;
  constructor(public payload: any) { }
}

export class AddSuccessComment implements Action {
  readonly type = AlbumsActionTypes.AddSuccessComment;
  constructor(public payload: any) { }
}

export class AddFailComment implements Action {
  readonly type = AlbumsActionTypes.AddFailComment;
  constructor(public payload: HttpErrorResponse) { }
}

export class LoadComment implements Action {
  readonly type = AlbumsActionTypes.LoadComment;
  constructor(public payload: number) { }
}

export class LoadSuccessComment implements Action {
  readonly type = AlbumsActionTypes.LoadSuccessComment;
  constructor(public payload: any) { }
}

export class LoadFailComment implements Action {
  readonly type = AlbumsActionTypes.LoadFailComment;
  constructor(public payload: HttpErrorResponse) { }
}

export class ReOrderAlbum implements Action {
  readonly type = AlbumsActionTypes.ReOrderAlbum;
  constructor(public payload: number[]) { }
}

export class ReOrderAlbumSuccess implements Action {
  readonly type = AlbumsActionTypes.ReOrderAlbumSuccess;
  constructor(public payload: Album) { }
}

export class ReOrderAlbumFail implements Action {
  readonly type = AlbumsActionTypes.ReOrderAlbumFail;
  constructor(public payload: HttpErrorResponse) { }
}


// Define the type of actions possible for our system
export type AlbumsActions = LoadShortLibraries |
LoadSuccesShortLibraries |
LoadFailShortLibraries |
LoadSharedShortLibraries |
LoadSuccesSharedShortLibraries |
LoadFailSharedShortLibraries |
SaveLibrary |
SaveSuccesLibrary |
SaveFailLibrary |
LoadSuggestUsers |
LoadSuccesSuggestUsers |
LoadFailSuggestUsers |
AddSharedUsers |
SaveSharedUsers |
SaveSuccesSharedUsers |
SaveFailSharedUsers |
LoadLibrary |
LoadSuccesLibrary |
LoadFailLibrary |
SetLibraryIndex |
SetFullScreenMediaName |
SetDisplayMedia |
SetProgressRate |
UpdateEditLibrary |
UpdateSuccesEditLibrary |
UpdateFailEditLibrary |
// UpdateSharedShortLibrary |
// UpdateSuccesSharedShortLibrary |
UpdateFailSharedShortLibrary |
LoadCurrentEditLibrary |
LoadSuccesCurrentEditLibrary |
LoadFailCurrentEditLibrary |
SetShowEditPanel |
SetSuccesMessage |
UpdateSuccesMedia |
SetTotalPages |
SetSharedTotalPages |
AddLibraries |
AddSuccesLibraries |
AddFailLibraries |
SetUrls |
SetSelectedSort |
SetSharedSelectedSort |
SortShortLibraries |
SortSharedShortLibraries |
FilterShortLibraries |
FilterSharedShortLibraries |
FilterMedias |
SortMedias |
DeleteLibrary |
DeleteSuccesLibrary |
DeleteFailLibrary |
DeleteMedia |
DeleteSuccesMedia |
DeleteFailMedia |
DeleteSharedUser |
AddMediasToLibrary |
AddMediasSuccessToLibrary |
AddMediasFailToLibrary |
SetLibrary |
SetEditMedia |
UpdateMediaAction |
UpdateFailMedia |
LoadSharedUsers |
LoadSuccesSharedUsers |
LoadFailSharedUsers |
AddComment |
AddSuccessComment |
AddFailComment |
LoadComment |
LoadSuccessComment |
LoadFailComment |
ReOrderAlbum |
ReOrderAlbumSuccess |
ReOrderAlbumFail;
