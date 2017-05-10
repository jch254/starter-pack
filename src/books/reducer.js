import { Map } from 'immutable';

export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';
export const BOOKS_FAILURE = 'BOOKS_FAILURE';

export const initialState = Map({
  isFetching: false,
  books: Map(),
  error: null,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case BOOKS_REQUEST:
      return state.set('isFetching', true);
    case BOOKS_SUCCESS:
      return state.merge({
        isFetching: false,
        books: action.books,
        error: null,
      });
    case BOOKS_FAILURE:
      return state.merge({
        isFetching: false,
        error: action.error,
      });
    default:
      return state;
  }
}

export const booksRequest = idToken => (
  {
    type: BOOKS_REQUEST,
    idToken,
  }
);

export const booksSuccess = books => (
  {
    type: BOOKS_SUCCESS,
    books,
  }
);

export const booksFailure = error => (
  {
    type: BOOKS_FAILURE,
    error,
  }
);
