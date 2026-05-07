import { combineReducers } from 'redux';
import appReducer, { AppState } from './app/reducer';
import authReducer, { AuthState } from './auth/reducer';
import booksReducer, { BooksState } from './books/reducer';

export interface GlobalState {
  app: AppState;
  auth: AuthState;
  books: BooksState;
}

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  books: booksReducer,
});

export default rootReducer;
