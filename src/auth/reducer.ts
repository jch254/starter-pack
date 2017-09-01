import * as iassign from 'immutable-assign';

import { getStoredAuthState } from '../utils';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export interface LoginRequest {
  type: 'LOGIN_REQUEST';
}

export interface LoginSuccess {
  type: 'LOGIN_SUCCESS';
  profile: auth0.Auth0UserProfile;
  idToken: string;
}

export interface LoginFailure {
  type: 'LOGIN_FAILURE';
  error: string;
}

export interface Logout {
  type: 'LOGOUT';
}

export const logout = (): Logout => ({
  type: LOGOUT,
});

type AuthAction = LoginRequest | LoginSuccess | LoginFailure | Logout;

export interface AuthState {
  isLoggingIn: boolean;
  idToken?: string;
  profile?: auth0.Auth0UserProfile;
  error?: string;
}

export const initialState: AuthState = {
  isLoggingIn: false,
};

export default function reducer(
  state: AuthState = { ...initialState, ...getStoredAuthState() },
  action: AuthAction,
): AuthState {
  switch (action.type) {
    case LOGIN_REQUEST:
      return iassign(
        state,
        state => state.isLoggingIn,
        () => true,
      );
    case LOGIN_SUCCESS:
      return iassign(
        state,
        (s) => {
          s.isLoggingIn = false;
          s.idToken = action.idToken;
          s.profile = action.profile;

          return s;
        },
      );
    case LOGIN_FAILURE:
      return iassign(
        state,
        (s) => {
          s.isLoggingIn = false;
          s.idToken = undefined;
          s.profile = undefined;
          s.error = action.error;

          return s;
        },
      );
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export const loginRequest = (): LoginRequest => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (profile: auth0.Auth0UserProfile, idToken: string): LoginSuccess => ({
  type: LOGIN_SUCCESS,
  profile,
  idToken,
});

export const loginFailure = (error: string): LoginFailure => ({
  type: LOGIN_FAILURE,
  error,
});
