import LoadableComponent from '../shared-components/LoadableComponent';

import BooksPage from './BooksPage';

export default LoadableComponent({
  loader: () => System.import<typeof BooksPage>('./BooksPage'),
  webpackRequireWeakId: () => require.resolveWeak('./BooksPage'),
});
