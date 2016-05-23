export const BOOKS_REQUEST = 'BOOKS_REQUEST';
export function booksRequest(idToken) {
  return {
    type: BOOKS_REQUEST,
    idToken,
  };
}

export const BOOKS_SUCCESS = 'BOOKS_SUCCESS';
export function booksSuccess(books) {
  return {
    type: BOOKS_SUCCESS,
    books,
  };
}

export const BOOKS_FAILURE = 'BOOKS_FAILURE';
export function booksFailure(error) {
  return {
    type: BOOKS_FAILURE,
    error,
  };
}
