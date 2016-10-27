import Auth0Lock from 'auth0-lock';
import 'isomorphic-fetch';
import { call, put, take } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  loginFailure,
  loginSuccess,
} from './actions';

import { setStoredAuthData, removeStoredAuthData } from '../utils';

export function* loginRequestSaga() {
  const lock = new Auth0Lock(process.env.AUTH0_CLIENT_ID, process.env.AUTH0_DOMAIN, { auth: { redirect: false } });

  const showLock = () =>
    new Promise((resolve, reject) => {
      lock.on('hide', () => reject('Lock closed'));
      lock.on('authenticated', (authResult) => {
        lock.getProfile(authResult.idToken, (error, profile) => {
          if (!error) {
            lock.hide();
            resolve({ profile, token: authResult.idToken });
          }
        });
      });

      lock.show();
    });

  try {
    const { profile, token } = yield call(showLock);

    yield put(loginSuccess(profile, token));
    yield put(push('/books'));
  } catch (error) {
    yield put(loginFailure(error));
    yield put(push('/'));
  }
}

export function* watchLoginRequest() {
  while (true) {
    yield take(LOGIN_REQUEST);
    yield call(loginRequestSaga);
  }
}

export function* watchLoginSuccess() {
  while (true) {
    const { profile, idToken } = yield take(LOGIN_SUCCESS);

    setStoredAuthData(profile, idToken);
  }
}

export function* watchLoginFailure() {
  while (true) {
    yield take(LOGIN_FAILURE);

    removeStoredAuthData();
  }
}

export function* watchLogout() {
  while (true) {
    yield take(LOGOUT);

    removeStoredAuthData();

    yield put(push('/'));
  }
}
