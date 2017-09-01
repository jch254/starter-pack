import { GlobalState } from '../rootReducer';

export const getError = (state: GlobalState): string | undefined => state.auth.error;

export const getIdToken = (state: GlobalState): string | undefined => state.auth.idToken;

export const getIsLoggingIn = (state: GlobalState): boolean => state.auth.isLoggingIn;

export const getProfile = (state: GlobalState): auth0.Auth0UserProfile | undefined => state.auth.profile;
