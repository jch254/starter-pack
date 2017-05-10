import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import recycleState from 'redux-recycle';

import { reducer as appReducer, actions as appActions } from './app';
import { reducer as booksReducer, actions as booksActions } from './books';
import { reducer as authReducer, actions as authActions } from './auth';

export default combineReducers({
  auth: authReducer,
  app: recycleState(appReducer, [authActions.LOGOUT], appActions.initialState),
  books: recycleState(booksReducer, [authActions.LOGOUT], booksActions.initialState),
  router: routerReducer,
});
