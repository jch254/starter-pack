import { all } from 'redux-saga/effects';
import { watchBooksRequest } from './books/sagas';

export default function* rootSaga() {
  yield all([
    watchBooksRequest(),
  ]);
}
