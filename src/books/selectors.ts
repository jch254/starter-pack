import { createSelector } from 'reselect';

import { ResponseError } from '../apiService';
import { GlobalState } from '../rootReducer';

import Book from './Book';

const getBooks = (state: GlobalState): { [id: string]: Book; } => state.books.books;

export const getError = (state: GlobalState): ResponseError | null => state.books.error;

export const getIsFetching = (state: GlobalState): boolean => state.books.isFetching;

export const getSortedBooks = createSelector(
  [getBooks],
  (books: { [id: string]: Book; }) => Object.keys(books)
    .sort((a, b) => books[a].title.localeCompare(books[b].title))
    .reduce(
      (returnedBooks: { [id: string]: Book; }, id: string) => {
        returnedBooks[id] = books[id];
        
        return returnedBooks;
      },
      {},
    ),
);
