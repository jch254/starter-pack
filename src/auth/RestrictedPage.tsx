import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { GlobalState } from '../rootReducer';
import FullscreenLoader from '../shared-components/FullscreenLoader';

import { loginRequest } from './reducer';
import { getIdToken } from './selectors';

export interface RestrictedPageProps {
  children?: any;
}

interface StateProps {
  idToken?: string;
}

interface DispatchProps {
  actions: {
    loginRequest: typeof loginRequest;
  };
}

class RestrictedPage extends React.PureComponent<RestrictedPageProps & StateProps & DispatchProps, {}> {
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

const mapStateToProps = (state: GlobalState, ownProps: RestrictedPageProps): StateProps => ({
  idToken: getIdToken(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  actions: bindActionCreators({ loginRequest }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RestrictedPage);
