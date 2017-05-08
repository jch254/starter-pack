import * as React from 'react';

import FullscreenLoader from './FullscreenLoader';

interface ComponentLoaderProps {
  isLoading: boolean;
  error: Error | null;
  pastDelay: boolean;
}

class ComponentLoader extends React.PureComponent<ComponentLoaderProps, {}> {
  render() {
    const { isLoading, pastDelay } = this.props;

    return isLoading && pastDelay ? <FullscreenLoader delay={0} /> : null;
  }
}

export default ComponentLoader;
