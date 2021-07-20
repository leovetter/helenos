import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromProfile from './profile.reducer';

// Extends the app state to include the library feature.
// This is required because libraries are lazy loaded.
// So the reference to LibraryState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    profile: fromProfile.ProfileState;
}

// Selector functions
export const getProfileFeatureState = createFeatureSelector<fromProfile.ProfileState>('profile');

