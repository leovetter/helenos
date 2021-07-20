import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../state/app.state';
import * as fromUsers from './user.reducer';

// Extends the app state to include the user feature.
// This is required because libraries are lazy loaded.
// So the reference to UserState cannot be added to app.state.ts directly.
export interface State extends fromRoot.State {
    users: fromUsers.UserState;
}

// Selector functions
export const getUsersFeatureState = createFeatureSelector<fromUsers.UserState>('users');


