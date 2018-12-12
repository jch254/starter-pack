import { fork } from 'redux-saga/effects';
import { watchLoginFailure, watchLoginRequest, watchLoginSuccess, watchLogout } from './auth/sagas';
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
