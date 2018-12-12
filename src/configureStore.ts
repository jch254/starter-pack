import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

export function configureStore(history: History) {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const store = createStore(
    rootReducer(history),
    window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV !== 'production' ?
      compose(
        applyMiddleware(...middlewares),
        window.__REDUX_DEVTOOLS_EXTENSION__(),
      ) :
      applyMiddleware(...middlewares),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
