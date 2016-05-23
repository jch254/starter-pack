import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './actions';

import { getStoredAuthData } from '../utils';

export const initialState = {
  isLoggingIn: false,
  idToken: null,
  profile: null,
  error: null,
};

function initializeState() {
  const storedAuthData = getStoredAuthData();
  return Object.assign({}, initialState, storedAuthData);
}

export default function auth(state = initializeState(), action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        idToken: action.idToken,
        profile: action.profile,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        idToken: null,
        profile: null,
        error: action.error,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
