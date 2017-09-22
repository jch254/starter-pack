import Loadable from 'react-loadable';

import ComponentLoader from '../shared-components/ComponentLoader';

export default Loadable({
  loading: ComponentLoader,
  loader: () => import(
    /* webpackChunkName: "restricted" */
    './RestrictedPage',
  ),
});
