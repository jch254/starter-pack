import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Flex } from 'rebass';
import { useAuth0 } from '../auth/Auth0Wrapper';
import PrivateRoute from '../auth/PrivateRoute';
import AppFooter from '../shared-components/AppFooter';
import FullscreenLoader from '../shared-components/FullscreenLoader';
import GaTracker from '../shared-components/GaTracker';
import HomePage from '../shared-components/HomePage';
import Navbar from '../shared-components/Navbar';
import ScrollToTop from '../shared-components/ScrollToTop';

// tslint:disable-next-line:space-in-parens
const BooksPage = React.lazy(() => import(/* webpackChunkName: "books" */'../books/BooksPage'));
// tslint:disable-next-line:space-in-parens
const NotFoundPage = React.lazy(() => import(/* webpackChunkName: "not-found" */'../shared-components/NotFoundPage'));

interface AppProps {
  history: History;
}

const App = ({
  history,
}: AppProps) => {
  const { isLoggingIn, loginWithRedirect, logout, user } = useAuth0();

  return (
    <ConnectedRouter history={history}>
      <GaTracker>
        <ScrollToTop>
          {
            isLoggingIn ?
              <FullscreenLoader style={{ height: '100%' }} delay={0} /> :
              <Flex flexDirection="column" style={{ height: '100%' }}>
                <Navbar
                  user={user}
                  handleLogin={() => loginWithRedirect({ appState: { targetUrl: '/books' } })}
                  handleLogout={() => logout()}
                />
                <React.Suspense fallback={<FullscreenLoader />}>
                  <Switch>
                    <Route path="/" exact component={HomePage} />
                    <PrivateRoute path="/books" component={BooksPage} />
                    <Route component={NotFoundPage} />
                  </Switch>
                </React.Suspense>
                <AppFooter />
              </Flex>
          }
        </ScrollToTop>
      </GaTracker>
    </ConnectedRouter>
  );
};

export default App;
