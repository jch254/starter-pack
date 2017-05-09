import iassign = require('immutable-assign');

import { ResponseError } from '../apiService';
import Book from './Book';

export interface BooksRequest {
  type: 'BOOKS_REQUEST';
  idToken: string;
}

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const booksRequest = (idToken: string): BooksRequest => ({
  type: BOOKS_REQUEST,
  idToken,
});

export interface BooksSuccess {
  type: 'BOOKS_SUCCESS';
  books: { [id: string]: Book; };
}

export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';
export const booksSuccess = (books: { [id: string]: Book; }) => ({
  type: BOOKS_SUCCESS,
  books,
});

export interface BooksFailure {
  type: 'BOOKS_FAILURE';
  error: ResponseError;
}

export const BOOKS_FAILURE = 'BOOKS_FAILURE';
export const booksFailure = (error: ResponseError): BooksFailure => ({
  type: BOOKS_FAILURE,
  error,
});

type BooksAction = BooksRequest | BooksSuccess | BooksFailure;

export interface BooksState {
  isFetching: boolean;
  books: { [id: string]: Book; };
  error: ResponseError | null;
}

export const initialState: BooksState = {
  isFetching: false,
  books: {},
  error: null,
};

export default function reducer(state: BooksState = initialState, action: BooksAction) {
  switch (action.type) {
    case BOOKS_REQUEST:
      return iassign(
        state,
        state => state.isFetching,
        () => true,
      );
    case BOOKS_SUCCESS:
      return iassign(
        state,
        (s) => {
          s.isFetching = false;
          s.books = action.books;

          return s;
        },
      );
    case BOOKS_FAILURE:
      return iassign(
        state,
        (s) => {
          s.isFetching = false;
          s.error = action.error;

          return s;
        },
      );
    default:
      return state;
  }
}
