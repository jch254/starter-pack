import 'isomorphic-fetch';
import { put } from 'redux-saga/effects';

import { actions as authActions } from './auth';
import { checkStatus, parseJSON } from './utils';

const baseUrl = 'YOUR API BASE URL';

function getFetchInit(idToken, requestMethod, body) {
  const requestHeaders = new Headers();
  requestHeaders.append('Authorization', `Bearer ${idToken}`);
  requestHeaders.append('Content-Type', 'application/json');

  const fetchInit = { method: requestMethod, headers: requestHeaders };

  if (body) {
    fetchInit.body = JSON.stringify(body);
  }

  return fetchInit;
}

export function fetchBooks(idToken) {
  // This app reads data from books.json as this is just a demonstration
  // Normally an API call would be made (see below)
  // The API should check validity of idToken and return unauthorised if not valid
  // The app would then prompt the user to log in again

  // return fetch(
  //   `${baseUrl}/v1/books`, getFetchInit(idToken, 'GET'))
  //   .then(checkStatus)
  //   .then(parseJSON)
  //   .then(json => ({ books: json }))
  //   .catch(error => Promise.reject(error));

  const books = require('./books/books.json');

  return new Promise((resolve) => {
    resolve({ books: books.sort((a, b) => a.title.localeCompare(b.title)) });
  });
}

export function* handleApiError(error, failureAction) {
  const response = error.response;

  if (response === undefined) {
    yield put(failureAction(error.message));
  } else {
    if (response.status === 401) {
      // Unauthorised - show login
      yield put(authActions.loginRequest());
    } else {
      const responseError = {
        status: response.status,
        statusText: response.statusText,
        message: error.message,
      };

      yield put(failureAction(responseError));
    }
  }
}
