import * as actions from './actions';
import reducer from './reducer';
import * as sagas from './sagas';
import * as selectors from './selectors';

import RestrictedPage from './RestrictedPage';

const components = {
  RestrictedPage,
};

export { actions, components, reducer, sagas, selectors };
