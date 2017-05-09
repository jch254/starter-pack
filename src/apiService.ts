import 'isomorphic-fetch';
import { Action } from 'redux';
import { put } from 'redux-saga/effects';

import { loginRequest } from './auth/reducer';
import Book from './books/Book';

const books = require('./books/books.json');

// interface FetchInit {
//   method: string;
//   headers: Headers;
//   body: string;
// }

// const getFetchInit = (idToken: string, requestMethod: string, body: any): FetchInit => {
//   const requestHeaders = new Headers();

//   requestHeaders.append('Authorization', `Bearer ${idToken}`);
//   requestHeaders.append('Content-Type', 'application/json');

//   const fetchInit = { method: requestMethod, headers: requestHeaders } as FetchInit;

//   if (body) {
//     fetchInit.body = JSON.stringify(body);
//   }

//   return fetchInit;
// };

export async function fetchBooks(idToken: string): Promise<{ [id: string]: Book; }> {
  // This app reads data from books.json as this is just a demonstration
  // Normally an API call would be made (see below)
  // The API should check validity of idToken and return unauthorised if not valid
  // The app would then prompt the user to log in again
  // See https://github.com/jch254/serverless-node-dynamodb-api for an example

  // const response = await fetch(`${process.env.API_BASE_URI}/items`, getFetchInit(idToken, 'GET'));

  try {
    return books
      .reduce(
        (returnedBooks: { [id: string]: Book; }, book: Book) => {
          returnedBooks[book.id] = book;
          
          return returnedBooks;
        },
        {},
      );
  } catch (err) {
    throw new Error(`Error occurred downstream: ${err}`);
  }
}

export interface ResponseError extends Error {
  response?: Response;
}

export function* handleApiError(error: ResponseError, failureAction: (error: ResponseError | null) => Action) {
  const response = error.response;

  if (response !== undefined) {
    if (response.status === 401) {
      // Unauthorised - show login
      yield put(failureAction(null));
      yield put(loginRequest());
    }
  } else {
    yield put(failureAction(error));
  }
}
