import createBrowserHistory from 'history/createBrowserHistory';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app/App';
import { configureStore } from './configureStore';

import './index.css';

const history = createBrowserHistory();
const store = configureStore(history);

declare global {
  interface Window {
    devToolsExtension: any;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root'),
);


