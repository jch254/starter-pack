import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { GlobalState } from '../rootReducer';

export const getAuth0Client = (state: GlobalState): Auth0Client | undefined => state.auth.auth0Client;
