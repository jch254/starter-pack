import Loadable from 'react-loadable';

import ComponentLoader from './ComponentLoader';

type Component<P> = React.SFC<P> | React.ComponentClass<P>;

interface LoadableComponentOptions<P> {
  loader: () => Promise<Component<P>>;
  webpackRequireWeakId: () => number;
}

// tslint:disable-next-line:function-name
export default function LoadableComponent<P>(options: LoadableComponentOptions<P>): Component<P> {
  return Loadable({
    LoadingComponent: ComponentLoader,
    ...options,
  });
}
