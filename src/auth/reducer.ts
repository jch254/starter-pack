import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import produce from 'immer';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

export interface AuthState {
  auth0Client?: Auth0Client;
}

export const initialState: AuthState = {};

const actionCreator = actionCreatorFactory('AUTH');

export const authActions = {
  setAuth0Client: actionCreator<Auth0Client>('SET_AUTH0_CLIENT'),
};

export default reducerWithInitialState(initialState)
  .case(authActions.setAuth0Client, (state, payload) =>
    produce(state, (draft) => {
      draft.auth0Client = payload;
    }),
  );
