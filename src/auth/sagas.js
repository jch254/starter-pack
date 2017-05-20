import Auth0Lock from 'auth0-lock';
import { call, put, take } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import Immutable from 'immutable';

import { setStoredAuthState, removeStoredAuthState } from '../utils';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  loginFailure,
  loginSuccess,
} from './reducer';

export function* loginRequestSaga() {
  const lock = new Auth0Lock(
    process.env.AUTH0_CLIENT_ID,
    process.env.AUTH0_DOMAIN,
    {
      auth: { redirect: false },
      languageDictionary: { title: 'Starter Pack' },
    },
  );

  const showLock = () =>
    new Promise((resolve, reject) => {
      lock.on('hide', () => reject('Lock closed'));

      lock.on('authenticated', (authResult) => {
        lock.getUserInfo(authResult.accessToken, (error, profile) => {
          if (!error) {
            const immutableProfile = Immutable.fromJS(profile);

            lock.hide();
            resolve({ profile: immutableProfile, idToken: authResult.idToken });
          }
        });
      });

      lock.on('unrecoverable_error', (error) => {
        lock.hide();
        reject(error);
      });

      lock.show();
    });

  try {
    const { profile, idToken } = yield call(showLock);

    yield put(loginSuccess(profile, idToken));
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

    setStoredAuthState(profile, idToken);
  }
}

export function* watchLoginFailure() {
  while (true) {
    yield take(LOGIN_FAILURE);

    removeStoredAuthState();
  }
}

export function* watchLogout() {
  while (true) {
    yield take(LOGOUT);

    removeStoredAuthState();

    yield put(push('/'));
  }
}
