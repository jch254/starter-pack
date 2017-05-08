import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';

import App from './app/App';
import { configureStore } from './configureStore';

import './index.css';

const history = createBrowserHistory();
const store = configureStore(history);

declare global {
  interface Window {
    devToolsExtension: any;
  }

  // TODO: Remove once TypeScript supports dynamic imports. Webpack handles System.import calls.
  // See https://github.com/Microsoft/TypeScript/issues/12364#issuecomment-288087153
  interface System {
    import<T> (modulePath: string): Promise<T>;
  }

  var System: System;
}

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root'),
);


