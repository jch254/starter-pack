import Loadable from 'react-loadable';

import ComponentLoader from './ComponentLoader';

export default Loadable({
  loading: ComponentLoader,
  loader: () => import(
    /* webpackChunkName: "home" */
    './HomePage',
  ),
});
