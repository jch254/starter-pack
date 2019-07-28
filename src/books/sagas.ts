import { SagaIterator } from 'redux-saga';
import { call, spawn, take } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { bindAsyncAction } from 'typescript-fsa-redux-saga';
import { fetchBooks, handleApiError } from '../apiService';
import Book from './Book';
import { booksActions } from './reducer';

const fetchBooksWorker = bindAsyncAction(booksActions.fetchBooks, { skipStartedAction: true })(
  function* (idToken): SagaIterator {
    try {
      const books: Map<string, Book> = yield call(fetchBooks, idToken);

      return books;
    } catch (error) {
      yield call(handleApiError, error);

      throw error;
    }
  },
);

export function* watchBooksRequest() {
  while (true) {
    const action: Action<string> = yield take(booksActions.fetchBooks.started);

    yield spawn(fetchBooksWorker, action.payload);
  }
}
