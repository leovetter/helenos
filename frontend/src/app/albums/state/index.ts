import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromAlbums from './albums.reducer';

// Extends the app state to include the library feature.
// This is required because libraries are lazy loaded.
// So the reference to LibraryState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    libraries: fromAlbums.AlbumsState;
}

// Selector functions
export const getLibrariesFeatureState = createFeatureSelector<fromAlbums.AlbumsState>('albums');


export const getShortLibrariesFeatureState = createSelector(
  getLibrariesFeatureState,
  state => state.shortLibraries
);

export const getSharedShortLibrariesFeatureState = createSelector(
  getLibrariesFeatureState,
  state => state.sharedShortLibraries
);

export const getLibraryFeatureState = createSelector(
  getLibrariesFeatureState,
  state => state.library
);

export const getLibraryIndexFeatureState = createSelector(
  getLibrariesFeatureState,
  state => state.libraryIndex
);

export const getSuggestUsersFeatureState = createSelector(
  getLibrariesFeatureState,
  state => state.suggestUsers
);

export const getSharedUsersFeatureState = createSelector(
  getLibrariesFeatureState,
  state => state.sharedUsers
);

export const getErrorMessageFeatureState = createSelector(
  getLibrariesFeatureState,
  state => state.errorMessage
);

export const getFullScreenImageNameFeatureState = createSelector(
  getLibrariesFeatureState,
  state => state.fullScreenImageName
);

export const getDisplayImageFeatureState = createSelector(
  getLibrariesFeatureState,
  state => state.displayImage
);

export const getProgressFeatureState = createSelector(
  getLibrariesFeatureState,
  state => state.progress
);

export const getShowEditPanelFeatureState = createSelector(
  getLibrariesFeatureState,
  state => state.showEditPanel
);

export const getCurrentEditLibraryFeatureState = createSelector(
  getLibrariesFeatureState,
  state => state.currentEditLibrary
);

export const getSuccesMessageFeatureState = createSelector(
  getLibrariesFeatureState,
  state => state.succesMessage
);

export const getTotalPagesFeatureState = createSelector(
  getLibrariesFeatureState,
  state => state.totalPages
);

export const getUrlsFeatureState = createSelector(
  getLibrariesFeatureState,
  state => state.urls
);

export const getSelectedSortFeatureState = createSelector(
  getLibrariesFeatureState,
  state => state.selectedSort
);

export const getSharedSelectedSortFeatureState = createSelector(
  getLibrariesFeatureState,
  state => state.sharedSelectedSort
);

export const getCurrentMediaFeatureState = createSelector(
  getLibrariesFeatureState,
  state => state.currentMedia
);
