import * as React from 'react';
import * as Loadable from 'react-loadable';

import ComponentLoader from './ComponentLoader';

interface LoadableComponentOptions<P> {
  loader: () => Promise<React.ComponentType<P> | { default: React.ComponentType<P> }>;
  webpackRequireWeakId: () => number;
}

// tslint:disable-next-line:function-name
export default function LoadableComponent<P>(options: LoadableComponentOptions<P>) {
  return Loadable({
    loader: options.loader,
    loading: ComponentLoader,
    webpackRequireWeakId: options.webpackRequireWeakId,
  });
}
