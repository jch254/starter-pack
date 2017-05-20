import { createSelector } from 'reselect';

import { ResponseError } from '../apiService';
import { GlobalState } from '../rootReducer';

import Book from './Book';

const getBooks = (state: GlobalState): Map<string, Book> => state.books.books;

export const getError = (state: GlobalState): ResponseError | null => state.books.error;

export const getIsFetching = (state: GlobalState): boolean => state.books.isFetching;

export const getSortedBooks = createSelector(
  [getBooks],
  (books: Map<string, Book>) => new Map<string, Book>(
    [...books].sort(([idA, bookA], [idB, bookB]) => bookA.title.localeCompare(bookB.title)),
  ),
);
