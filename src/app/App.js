import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Flex } from 'reflexbox';

import { toggleDropdown } from './reducer';
import { getIsDropdownOpen } from './selectors';
import AppFooter from '../shared-components/AppFooter';
import Navbar from '../shared-components/Navbar';
import { actions as authActions, selectors as authSelectors } from '../auth';

const App = ({ children, isDropdownOpen, profile, actions }) => (
  <Flex column style={{ height: '100%' }}>
    <Navbar
      profile={profile}
      handleLogin={() => actions.loginRequest()}
      handleLogout={() => actions.logout()}
      onToggleDropdown={() => actions.toggleDropdown()}
      isDropdownOpen={isDropdownOpen}
    />
    {children}
    <AppFooter />
  </Flex>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
  isDropdownOpen: PropTypes.bool.isRequired,
  profile: PropTypes.object,
  actions: PropTypes.object.isRequired,
};

App.defaultProps = {
  profile: null,
};

const mapStateToProps = state => (
  {
    isDropdownOpen: getIsDropdownOpen(state),
    profile: authSelectors.getProfile(state),
  }
);

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators({ toggleDropdown, ...authActions }, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
