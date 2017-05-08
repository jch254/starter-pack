import { fork } from 'redux-saga/effects';

import { watchLoginRequest, watchLoginSuccess, watchLoginFailure, watchLogout } from './auth/sagas';
import { watchBooksRequest } from './books/sagas';

export default function* rootSaga() {
  yield [
    fork(watchLoginRequest),
    fork(watchLoginSuccess),
    fork(watchLoginFailure),
    fork(watchLogout),
    fork(watchBooksRequest),
  ];
}
