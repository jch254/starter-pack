import { ThemeProvider } from '@emotion/react';
import 'isomorphic-fetch';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { Auth0Provider } from './auth/Auth0Wrapper';
import configureStore from './configureStore';

import './index.css';

const theme = {
  colors: {
    primary: '#07c',
    secondary: '#30c',
    text: '#333',
    background: '#fff',
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72, 96],
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  lineHeights: {
    solid: 1,
    title: 1.25,
    copy: 1.5,
  },
};

// Add ES6 Map support for redux-devtools-extension
// See: https://github.com/zalmoxisus/redux-devtools-extension/issues/124
if (process.env.NODE_ENV !== 'production') {
  require('map.prototype.tojson');
}

const store = configureStore();
const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Auth0Provider
          domain={process.env.AUTH0_DOMAIN as string}
          client_id={process.env.AUTH0_CLIENT_ID as string}
          redirect_uri={window.location.origin}
        >
          <App />
        </Auth0Provider>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
);
