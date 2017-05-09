import HomePage from './HomePage';
import LoadableComponent from './LoadableComponent';

export default LoadableComponent({
  loader: () => System.import<typeof HomePage>('./HomePage'),
  webpackRequireWeakId: () => require.resolveWeak('./HomePage'),
});
