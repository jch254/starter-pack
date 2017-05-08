import LoadableComponent from '../shared-components/LoadableComponent';

import RestrictedPage from './RestrictedPage';

export default LoadableComponent({
  loader: () => System.import<typeof RestrictedPage>('./RestrictedPage'),
  webpackRequireWeakId: () => require.resolveWeak('./RestrictedPage'),
});
