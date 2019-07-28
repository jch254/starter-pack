import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import recycleState from 'redux-recycle';
import appReducer, { initialState as appInitialState, AppState } from './app/reducer';
import authReducer, { authActions, AuthState } from './auth/reducer';
import booksReducer, { initialState as booksInitialsState, BooksState } from './books/reducer';

export interface GlobalState {
  auth: AuthState;
  app: AppState;
  books: BooksState;
  router: RouterState;
}

export default (history: History) => combineReducers<GlobalState>({
  auth: authReducer,
  app: recycleState(appReducer, [authActions.logout], appInitialState),
  books: recycleState(booksReducer, [authActions.logout], booksInitialsState),
  router: connectRouter(history),
});
