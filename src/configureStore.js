import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import recycleState from 'redux-recycle';
import { Iterable } from 'immutable';

import { reducer as appReducer } from './app';
import { reducer as books } from './books';
import { reducer as authReducer, actions as authActions } from './auth';
import rootSaga from './rootSaga';

const reducer = combineReducers(
  {
    auth: authReducer,
    app: recycleState(appReducer, [authActions.LOGOUT], appReducer.initialState),
    books: recycleState(books, [authActions.LOGOUT], books.initialState),
    router: routerReducer,
  },
);

export default function configureStore(history, initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  if (process.env.NODE_ENV !== 'production') {
    // Log Immutable state beautifully
    const logger = createLogger({
      stateTransformer: state =>
        Object.keys(state).map((key) => {
          if (Iterable.isIterable(state[key])) {
            return state[key].toJS();
          }

          return state[key];
        }),
    });

    middlewares.push(logger);
  }

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension &&
      process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : f => f,
  ));

  sagaMiddleware.run(rootSaga);
  return store;
}
