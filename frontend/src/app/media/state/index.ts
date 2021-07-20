import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromMedia from './media.reducer';

// Extends the app state to include the image feature.
export interface State extends fromRoot.State {
    medias: fromMedia.MediaState;
}

// Selector functions
export const getImagesFeatureState = createFeatureSelector<fromMedia.MediaState>('medias');

export const getShowEditPanelFeatureState = createSelector(
  getImagesFeatureState,
  state => state.showEditPanel
);

export const getCurrentMediaFeatureState = createSelector(
  getImagesFeatureState,
  state => state.currentMedia
);

export const getErrorMessageFeatureState = createSelector(
  getImagesFeatureState,
  state => state.errorMessage
);

export const getSuccesMessageFeatureState = createSelector(
  getImagesFeatureState,
  state => state.succesMessage
);

export const getSelectedSortFeatureState = createSelector(
  getImagesFeatureState,
  state => state.selectedSort
);
