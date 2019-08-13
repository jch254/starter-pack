import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { Flex } from 'rebass';
import { bindActionCreators, Dispatch } from 'redux';
import { authActions } from '../auth/reducer';
import { getProfile } from '../auth/selectors';
import { GlobalState } from '../rootReducer';
import AppFooter from '../shared-components/AppFooter';
import FullscreenLoader from '../shared-components/FullscreenLoader';
import GaTracker from '../shared-components/GaTracker';
import HomePage from '../shared-components/HomePage';
import Navbar from '../shared-components/Navbar';
import ScrollToTop from '../shared-components/ScrollToTop';

// tslint:disable-next-line:space-in-parens
const RestrictedPage = React.lazy(() => import(/* webpackChunkName: "restricted" */'../auth/RestrictedPage'));
// tslint:disable-next-line:space-in-parens
const BooksPage = React.lazy(() => import(/* webpackChunkName: "books" */'../books/BooksPage'));
// tslint:disable-next-line:space-in-parens
const NotFoundPage = React.lazy(() => import(/* webpackChunkName: "not-found" */'../shared-components/NotFoundPage'));

interface AppProps {
  history: History;
}

interface StateProps {
  profile?: auth0.Auth0UserProfile;
}

interface DispatchProps {
  actions: {
    loginRequest: typeof authActions.login.started,
    logout: typeof authActions.logout,
  };
}

const App: React.StatelessComponent<AppProps & StateProps & DispatchProps> = ({
  history,
  profile,
  actions,
}) => (
    <ConnectedRouter history={history}>
      <GaTracker>
        <ScrollToTop>
          <Flex flexDirection="column" style={{ height: '100%' }}>
            <Navbar
              profile={profile}
              handleLogin={actions.loginRequest}
              handleLogout={actions.logout}
            />
            <React.Suspense fallback={<FullscreenLoader />}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/books">
                  <RestrictedPage>
                    <BooksPage />
                  </RestrictedPage>
                </Route>
                <Route component={NotFoundPage} />
              </Switch>
            </React.Suspense>
            <AppFooter />
          </Flex>
        </ScrollToTop>
      </GaTracker>
    </ConnectedRouter>
  );

const mapStateToProps = (state: GlobalState, ownProps: AppProps): StateProps => ({
  profile: getProfile(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  actions: bindActionCreators({ loginRequest: authActions.login.started, logout: authActions.logout }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
