import { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ga from 'react-ga';

class GaTracker extends PureComponent {
  constructor(props) {
    super(props);

    if (process.env.NODE_ENV === 'production' && process.env.GA_ID) {
      ga.initialize(process.env.GA_ID);
    }
  }

  componentDidUpdate(prevProps) {
    if (process.env.NODE_ENV === 'production' && this.props.location !== prevProps.location) {
      ga.pageview(window.location.pathname);
    }
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

GaTracker.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withRouter(GaTracker);
