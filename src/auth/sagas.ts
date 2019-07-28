import Auth0Lock from 'auth0-lock';
import { push } from 'connected-react-router';
import { SagaIterator } from 'redux-saga';
import { call, put, spawn, take } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import { removeStoredAuthState, setStoredAuthState } from '../utils';
import { authActions } from './reducer';

interface ShowLock {
  profile: auth0.Auth0UserProfile;
  idToken: string;
}

const loginWorker = bindAsyncAction(authActions.login, { skipStartedAction: true })(
  function* (): SagaIterator {
    const lock = new Auth0Lock(
      process.env.AUTH0_CLIENT_ID as string,
      process.env.AUTH0_DOMAIN as string,
      {
        auth: { redirect: false },
        languageDictionary: { title: 'Starter Pack' },
      },
    );

    const showLock = () =>
      new Promise<ShowLock>((resolve, reject) => {
        lock.on('hide', () => reject('Lock closed'));

        lock.on('authenticated', (authResult: auth0.Auth0DecodedHash) => {
          lock.getUserInfo(
            authResult.accessToken as string,
            (error: auth0.Auth0Error, profile: auth0.Auth0UserProfile) => {
              if (!error) {
                lock.hide();
                resolve({ profile, idToken: authResult.idToken as string });
              }
            },
          );
        });

        lock.on('unrecoverable_error', (error) => {
          lock.hide();
          reject(error);
        });

        lock.show();
      });

    try {
      const { profile, idToken }: ShowLock = yield call(showLock);

      yield call(setStoredAuthState, profile, idToken);
      yield put(push('/books'));

      return { profile, idToken };
    } catch (error) {
      yield call(removeStoredAuthState);
      yield put(push('/'));

      throw error;
    }
  },
);

export function* watchLoginRequest() {
  while (true) {
    const action: Action<void> = yield take(authActions.login.started);

    yield spawn(loginWorker, action.payload);
  }
}

export function* watchLogout() {
  while (true) {
    yield take(authActions.logout);

    yield call(removeStoredAuthState);
    yield put(push('/'));
  }
}
