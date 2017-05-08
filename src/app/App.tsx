import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Flex } from 'reflexbox';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { History } from 'history';

import { loginRequest, LoginRequest, logout, Logout } from '../auth/reducer';
import { getProfile } from '../auth/selectors';
import { GlobalState } from '../rootReducer';
import AppFooter from '../shared-components/AppFooter';
import Navbar from '../shared-components/Navbar';
import ScrollToTop from '../shared-components/ScrollToTop';
import GaTracker from '../shared-components/GaTracker';
import RestrictedPage from '../auth/LoadableRestrictedPage';
import BooksPage from '../books/LoadableBooksPage';
import HomePage from '../shared-components/LoadableHomePage';
import NotFoundPage from '../shared-components/LoadableNotFoundPage';

import { toggleDropdown, ToggleDropdown } from './reducer';
import { getIsDropdownOpen } from './selectors';

interface AppProps {
  history: History;
}

interface StateProps {
  isDropdownOpen: boolean;
  profile: auth0.Auth0UserProfile | null;
}

interface DispatchProps {
  actions: {
    toggleDropdown: () => ToggleDropdown,
    loginRequest: () => LoginRequest,
    logout: () => Logout,
  };
}

const App: React.StatelessComponent<AppProps & StateProps & DispatchProps> = ({
  history,
  isDropdownOpen,
  profile,
  actions,
}) => (
  <ConnectedRouter history={history}>
    <GaTracker>
      <ScrollToTop>
        <Flex column style={{ height: '100%' }}>
          <Navbar
            profile={profile}
            handleLogin={() => actions.loginRequest()}
            handleLogout={() => actions.logout()}
            onToggleDropdown={() => actions.toggleDropdown()}
            isDropdownOpen={isDropdownOpen}
          />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/books">
              <RestrictedPage>
                <BooksPage />
              </RestrictedPage>
            </Route>
            <Route component={NotFoundPage} />
          </Switch>
          <AppFooter />
        </Flex>
      </ScrollToTop>
    </GaTracker>
  </ConnectedRouter>
);

const mapStateToProps = (state: GlobalState, ownProps: AppProps): StateProps => ({
  isDropdownOpen: getIsDropdownOpen(state),
  profile: getProfile(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  actions: bindActionCreators({ toggleDropdown, loginRequest, logout }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
