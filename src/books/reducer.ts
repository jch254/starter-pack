import * as iassign from 'immutable-assign';
import { ResponseError } from '../apiService';
import Book from './Book';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';
export const BOOKS_FAILURE = 'BOOKS_FAILURE';

export interface BooksRequest {
  type: 'BOOKS_REQUEST';
  idToken: string;
}

export interface BooksSuccess {
  type: 'BOOKS_SUCCESS';
  books: Map<string, Book>;
}

export interface BooksFailure {
  type: 'BOOKS_FAILURE';
  error?: ResponseError;
}

type BooksAction = BooksRequest | BooksSuccess | BooksFailure;

export interface BooksState {
  isFetching: boolean;
  books: Map<string, Book>;
  error?: ResponseError;
}

export const initialState: BooksState = {
  isFetching: false,
  books: new Map<string, Book>(),
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

export const booksRequest = (idToken: string): BooksRequest => ({
  type: BOOKS_REQUEST,
  idToken,
});

export const booksSuccess = (books: Map<string, Book>): BooksSuccess => ({
  type: BOOKS_SUCCESS,
  books,
});

export const booksFailure = (error?: ResponseError): BooksFailure => ({
  type: BOOKS_FAILURE,
  error,
});
