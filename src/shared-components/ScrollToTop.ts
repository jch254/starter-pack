import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface ScrollToTopProps {
  children?: any;
}

type Props = ScrollToTopProps & RouteComponentProps<any>;

class ScrollToTop extends React.PureComponent<Props, {}> {
  componentDidUpdate(prevProps: Props) {
    // TODO: Restore scroll position on browser back button etc.
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

export default withRouter<ScrollToTopProps>(ScrollToTop);
