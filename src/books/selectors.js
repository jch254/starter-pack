import { createSelector } from 'reselect';

const getBooks = state => state.books.get('books');

export const getError = state => state.books.get('error');

export const getIsFetching = state => state.books.get('isFetching');

export const getSortedBooks = createSelector(
  [getBooks],
  books => books.sortBy(book => book.get('title')),
);
