import 'isomorphic-fetch';
import { call, put, take } from 'redux-saga/effects';

import { fetchBooks, handleApiError } from '../apiService';

import Book from './Book';
import {
  booksFailure,
  booksSuccess,
  BooksRequest,
  BOOKS_REQUEST,
} from './reducer';

export function* fetchBooksSaga(idToken: string) {
  try {
    const books: { [id: string]: Book; } = yield call(fetchBooks, idToken);

    yield put(booksSuccess(books));
  } catch (error) {
    yield call(handleApiError, error, booksFailure);
  }
}

export function* watchBooksRequest() {
  while (true) {
    const { idToken }: BooksRequest = yield take(BOOKS_REQUEST);

    yield call(fetchBooksSaga, idToken);
  }
}
