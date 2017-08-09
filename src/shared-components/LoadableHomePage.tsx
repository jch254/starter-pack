import LoadableComponent from './LoadableComponent';

export default LoadableComponent({
  loader: () => import(
    /* webpackChunkName: "home" */
    './HomePage',
  ),
  webpackRequireWeakId: () => require.resolveWeak('./HomePage'),
});
