export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  };
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export function loginSuccess(profile, idToken) {
  return {
    type: LOGIN_SUCCESS,
    profile,
    idToken,
  };
}

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error,
  };
}

export const LOGOUT = 'LOGOUT';
export function logout() {
  return {
    type: LOGOUT,
  };
}
