import Loadable from 'react-loadable';

import ComponentLoader from './ComponentLoader';

export default Loadable({
  LoadingComponent: ComponentLoader,
  loader: () => import('./HomePage'),
});
