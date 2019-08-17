import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import appReducer, { AppState } from './app/reducer';
import authReducer, { AuthState } from './auth/reducer';
import booksReducer, { BooksState } from './books/reducer';

export interface GlobalState {
  app: AppState;
  auth: AuthState;
  books: BooksState;
  router: RouterState;
}

const rootReducer = (history: History) => combineReducers({
  app: appReducer,
  auth: authReducer,
  books: booksReducer,
  router: connectRouter(history),
});

export default rootReducer;
