import LoadableComponent from '../shared-components/LoadableComponent';

export default LoadableComponent({
  loader: () => import(
    /* webpackChunkName: "books" */
    './BooksPage',
  ),
  webpackRequireWeakId: () => require.resolveWeak('./BooksPage'),
});
