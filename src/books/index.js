import * as actions from './actions';
import reducer from './reducer';
import * as sagas from './sagas';
import * as selectors from './selectors';

import BooksPage from './BooksPage';

const components = {
  BooksPage,
};

export { actions, components, reducer, sagas, selectors };
