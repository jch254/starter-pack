import {
  BOOKS_REQUEST,
  BOOKS_SUCCESS,
  BOOKS_FAILURE,
} from './actions';

export const initialState = {
  isFetching: false,
  books: [],
  error: null,
};

export default function books(state = initialState, action) {
  switch (action.type) {
    case BOOKS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case BOOKS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        books: action.books,
        error: null,
      };
    case BOOKS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
