import produce from 'immer';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { getStoredAuthState } from '../utils';

export interface AuthState {
  isLoggingIn: boolean;
  idToken?: string;
  profile?: auth0.Auth0UserProfile;
  error?: string;
}

export const initialState: AuthState = {
  isLoggingIn: false,
};

export interface LoginResponse {
  profile: auth0.Auth0UserProfile;
  idToken: string;
}

const actionCreator = actionCreatorFactory('AUTH');

export const authActions = {
  login: actionCreator.async<void, LoginResponse, string>('LOGIN'),
  logout: actionCreator<void>('LOGOUT'),
};

export default reducerWithInitialState({ ...initialState, ...getStoredAuthState() })
  .case(authActions.login.started, state =>
    produce(state, (draft) => {
      draft.isLoggingIn = true;
    }),
  )
  .case(authActions.login.done, (state, payload) =>
    produce(state, (draft) => {
      draft.isLoggingIn = false;
      draft.idToken = payload.result.idToken;
      draft.profile = payload.result.profile;
    }),
  )
  .case(authActions.login.failed, (state, payload) =>
    produce(state, (draft) => {
      draft.isLoggingIn = false;
      draft.idToken = undefined;
      draft.profile = undefined;
      draft.error = payload.error;
    }),
  )
  .case(authActions.logout, state =>
    produce(state, (draft) => {
      draft.isLoggingIn = false;
      draft.idToken = undefined;
      draft.profile = undefined;
      draft.error = undefined;
    }),
  );
