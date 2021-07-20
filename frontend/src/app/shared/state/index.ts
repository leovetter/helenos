import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromShared from './shared.reducer';

// Extends the app state to include the library feature.
// This is required because libraries are lazy loaded.
// So the reference to LibraryState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    shared: fromShared.SharedState;
}

// Selector functions
export const getSharedFeatureState = createFeatureSelector<fromShared.SharedState>('shared');

export const getUserFeatureState = createSelector(
  getSharedFeatureState,
  state => state.user
);

export const getAudioContextState = createSelector(
  getSharedFeatureState,
  state => state.audioContext
);

export const getCurrentAudioState = createSelector(
  getSharedFeatureState,
  state => state.currentAudio
);

export const getErrorMessageFeatureState = createSelector(
  getSharedFeatureState,
  state => state.errorMessage
);

export const getPersonFeatureState = createSelector(
  getSharedFeatureState,
  state => state.person
);

export const getPlayerFeatureState = createSelector(
  getSharedFeatureState,
  state => state.player
);

export const getSettingsFeatureState = createSelector(
  getSharedFeatureState,
  state => state.settings
);
