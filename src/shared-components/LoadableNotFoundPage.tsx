import LoadableComponent from './LoadableComponent';
import NotFoundPage from './NotFoundPage';

export default LoadableComponent({
  loader: () => System.import<typeof NotFoundPage>('./NotFoundPage'),
  webpackRequireWeakId: () => require.resolveWeak('./NotFoundPage'),
});
