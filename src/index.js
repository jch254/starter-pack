import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import useScroll from 'react-router-scroll';
import ga from 'react-ga';

import configureStore from './configureStore';
import routes from './routes';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

if (process.env.NODE_ENV === 'production') {
  ga.initialize(process.env.GA_ID);
}

function logPageView() {
  if (process.env.NODE_ENV === 'production') {
    ga.pageview(window.location.pathname);
  }
}

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={history}
      routes={routes}
      render={applyRouterMiddleware(useScroll())}
      onUpdate={logPageView}
    />
  </Provider>,
  document.getElementById('root')
);
