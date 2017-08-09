import Loadable, { LoadedComponent, OptionsWithoutResolve } from 'react-loadable';

import ComponentLoader from './ComponentLoader';

interface LoadableComponentOptions<P> {
  loader: () => Promise<LoadedComponent<P> | { default: LoadedComponent<P> }>;
  webpackRequireWeakId: () => number;
}

// tslint:disable-next-line:function-name
export default function LoadableComponent<P>(options: LoadableComponentOptions<P>): LoadedComponent<P> {
  return Loadable({
    LoadingComponent: ComponentLoader,
    loader: options.loader,
    webpackRequireWeakId: options.webpackRequireWeakId,
  } as OptionsWithoutResolve<P>);
}
