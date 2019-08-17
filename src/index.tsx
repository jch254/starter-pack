import 'isomorphic-fetch';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Provider as RebassProvider } from 'rebass';
import App from './app/App';
import { Auth0Provider } from './auth/Auth0Wrapper';
import configureStore, { history } from './configureStore';

import './index.css';

// Add ES6 Map support for redux-devtools-extension
// See: https://github.com/zalmoxisus/redux-devtools-extension/issues/124
if (process.env.NODE_ENV !== 'production') {
  require('map.prototype.tojson');
}

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <RebassProvider id="provider">
      <Auth0Provider
        domain={process.env.AUTH0_DOMAIN as string}
        client_id={process.env.AUTH0_CLIENT_ID as string}
        redirect_uri={window.location.origin}
      >
        <App history={history} />
      </Auth0Provider>
    </RebassProvider>
  </Provider>,
  document.getElementById('root'),
);
