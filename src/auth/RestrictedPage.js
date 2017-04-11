import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FullscreenLoader from '../shared-components/FullscreenLoader';

import { loginRequest } from './reducer';
import { getIdToken } from './selectors';

class RestrictedPage extends PureComponent {
  componentWillMount() {
    const { actions, idToken } = this.props;

    if (!idToken) {
      actions.loginRequest();
    }
  }

  render() {
    const { children, idToken } = this.props;

    return idToken ? children : <FullscreenLoader delay={0} />;
  }
}

RestrictedPage.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  idToken: PropTypes.string,
};

RestrictedPage.defaultProps = {
  idToken: null,
};

const mapStateToProps = state => (
  {
    idToken: getIdToken(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators({ loginRequest }, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(RestrictedPage);
