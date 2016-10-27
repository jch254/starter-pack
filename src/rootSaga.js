import { fork } from 'redux-saga/effects';

import { sagas as authSagas } from './auth';
import { sagas as booksSagas } from './books';

export default function* rootSaga() {
  yield [
    fork(authSagas.watchLoginRequest),
    fork(authSagas.watchLoginSuccess),
    fork(authSagas.watchLoginFailure),
    fork(authSagas.watchLogout),
    fork(booksSagas.watchBooksRequest),
  ];
}
