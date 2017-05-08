import LoadableComponent from './LoadableComponent';
import HomePage from './HomePage';

export default LoadableComponent({
  loader: () => System.import<typeof HomePage>('./HomePage'),
  webpackRequireWeakId: () => require.resolveWeak('./HomePage'),
});
