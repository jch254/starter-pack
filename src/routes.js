import React from 'react';
import { Route, IndexRoute } from 'react-router';

import HomePage from './shared-components/HomePage';
import NotFoundPage from './shared-components/NotFoundPage';
import App from './app/App';
import RestrictedPage from './auth/RestrictedPage';
import BooksPage from './books/BooksPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route component={RestrictedPage}>
      <Route path="/books" component={BooksPage} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
