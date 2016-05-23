import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Flex } from 'reflexbox';

import { toggleDropdown } from './actions';
import { getDropdownOpen } from './selectors';

import AppFooter from '../shared-components/AppFooter';
import Navbar from '../shared-components/Navbar';
import { actions as authActions, selectors as authSelectors } from '../auth';

export default class App extends Component {
  handleLogin = () => {
    this.props.dispatch(authActions.loginRequest());
  }

  handleLogout = () => {
    this.props.dispatch(authActions.logout());
  }

  toggleDropdown = () => {
    this.props.dispatch(toggleDropdown());
  }

  render() {
    const { children, dropdownOpen, profile } = this.props;

    return (
      <Flex column style={{ height: '100%' }}>
        <Navbar
          profile={profile}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          toggleDropdown={this.toggleDropdown}
          dropdownOpen={dropdownOpen}
        />
        {children}
        <AppFooter />
      </Flex>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  dropdownOpen: PropTypes.bool.isRequired,
  profile: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    dropdownOpen: getDropdownOpen(state),
    profile: authSelectors.getProfile(state),
  };
};

export default connect(mapStateToProps)(App);
