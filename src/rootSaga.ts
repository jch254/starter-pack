import { all } from 'redux-saga/effects';
import { watchLoginRequest, watchLogout } from './auth/sagas';
import { watchBooksRequest } from './books/sagas';

export default function* rootSaga() {
  yield all([
    watchLoginRequest(),
    watchLogout(),
    watchBooksRequest(),
  ]);
}
