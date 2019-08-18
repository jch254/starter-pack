import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { AnyAction } from 'redux';
import { put, select } from 'redux-saga/effects';
import { getAuth0Client } from './auth/selectors';
import Book from './books/Book';
import { GlobalState } from './rootReducer';

const books = require('./books/books.json');

// const getFetchInit = (requestMethod: string, idToken?: string, body?: any): RequestInit => {
//   const requestHeaders = new Headers();

//   if (idToken) {
//     requestHeaders.append('Authorization', `Bearer ${idToken}`);
//   }

//   requestHeaders.append('Content-Type', 'application/json');

//   const fetchInit = { method: requestMethod, headers: requestHeaders } as RequestInit;

//   if (body) {
//     fetchInit.body = JSON.stringify(body);
//   }

//   return fetchInit;
// };

export async function fetchBooks(idToken: string): Promise<Map<string, Book>> {
  // This app reads data from books.json as this is just a demonstration
  // Normally an API call would be made (see below)
  // The API should check validity of idToken and return unauthorised if not valid
  // The app would then prompt the user to log in again
  // See https://github.com/jch254/serverless-node-dynamodb-api for an example

  // const response = await fetch(`${process.env.API_BASE_URI}/items`, getFetchInit('GET', idToken));

  try {
    return books
      .reduce(
        (returnedBooks: Map<string, Book>, book: Book) => {
          returnedBooks.set(book.id, book);

          return returnedBooks;
        },
        new Map<string, Book>(),
      );
  } catch (err) {
    throw new Error(`Error occurred downstream: ${err}`);
  }
}

export interface ResponseError extends Error {
  response?: Response;
}

export function* handleApiError(error: any, failureAction?: (error?: any) => AnyAction) {
  const response = error.response;

  if (response !== undefined) {
    if (response.status === 401) {
      // Unauthorised - show login
      if (failureAction !== undefined) {
        yield put(failureAction());
      }

      const auth0Client: Auth0Client = yield select(getAuth0Client);
      const path: string = yield select((state: GlobalState) => state.router.location.pathname);

      auth0Client.logout({ returnTo: window.location.origin, client_id: process.env.AUTH0_CLIENT_ID });
      auth0Client.loginWithRedirect({ appState: { targetUrl: path } });
    }
  } else {
    if (failureAction !== undefined) {
      yield put(failureAction());
    }
  }
}
