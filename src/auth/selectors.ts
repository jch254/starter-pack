import { Auth0Client } from '@auth0/auth0-spa-js';
import { GlobalState } from '../rootReducer';

export const getAuth0Client = (state: GlobalState): Auth0Client | undefined => state.auth.auth0Client;
