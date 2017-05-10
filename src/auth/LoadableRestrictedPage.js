import Loadable from 'react-loadable';

import ComponentLoader from '../shared-components/ComponentLoader';

export default Loadable({
  LoadingComponent: ComponentLoader,
  loader: () => import('./RestrictedPage'),
});
