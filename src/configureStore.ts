import { History } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export function configureStore(history: History) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const store = createStore(
    rootReducer,
    window.devToolsExtension && process.env.NODE_ENV !== 'production' ?
      compose(
        applyMiddleware(...middlewares),
        window.devToolsExtension(),
      ) :
      applyMiddleware(...middlewares),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

