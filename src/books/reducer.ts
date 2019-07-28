import produce from 'immer';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { ResponseError } from '../apiService';
import Book from './Book';

export interface BooksState {
  isFetching: boolean;
  books: Map<string, Book>;
  error?: ResponseError;
}

export const initialState: BooksState = {
  isFetching: false,
  books: new Map<string, Book>(),
};

const actionCreator = actionCreatorFactory('BOOKS');

export const booksActions = {
  fetchBooks: actionCreator.async<string, Map<string, Book>, ResponseError>('FETCH_BOOKS'),
};

export default reducerWithInitialState(initialState)
  .case(booksActions.fetchBooks.started, state =>
    produce(state, (draft) => {
      draft.isFetching = true;
    }),
  )
  .case(booksActions.fetchBooks.done, (state, payload) =>
    produce(state, (draft) => {
      draft.isFetching = false;
      draft.books = payload.result;
    }),
  )
  .case(booksActions.fetchBooks.failed, (state, payload) =>
    produce(state, (draft) => {
      draft.isFetching = false;
      draft.error = payload.error;
    }),
  );
