import createBrowserHistory from 'history/createBrowserHistory';
import * as iassign from 'immutable-assign';
import 'isomorphic-fetch';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Provider as RebassProvider } from 'rebass';
import App from './app/App';
import { configureStore } from './configureStore';

import './index.css';

iassign.setOption({
  freeze: process.env.NODE_ENV !== 'production',
  copyFunc: (value: any, propName: string) => {
    if (value instanceof Map) {
      return new Map(value) as any;
    }

    return undefined;
  },
});

// Add ES6 Map support for redux-devtools-extension
// See: https://github.com/zalmoxisus/redux-devtools-extension/issues/124
if (process.env.NODE_ENV !== 'production') {
  require('map.prototype.tojson');
}

const history = createBrowserHistory();
const store = configureStore(history);

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <RebassProvider id="provider">
      <App history={history} />
    </RebassProvider>
  </Provider>,
  document.getElementById('root'),
);
