import { combineReducers } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import recycleState from 'redux-recycle';

import authReducer, { AuthState, LOGOUT } from './auth/reducer';
import appReducer, { AppState, initialState as appInitialState } from './app/reducer';
import booksReducer, { BooksState, initialState as booksInitialsState } from './books/reducer';

export interface GlobalState {
  auth: AuthState;
  app: AppState;
  books: BooksState;
  router: RouterState;
}

export default combineReducers<GlobalState>({
  auth: authReducer,
  app: recycleState(appReducer, [LOGOUT], appInitialState),
  books: recycleState(booksReducer, [LOGOUT], booksInitialsState),
  router: routerReducer,
});
