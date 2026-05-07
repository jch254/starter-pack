import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '../auth/Auth0Wrapper';
import PrivateRoute from '../auth/PrivateRoute';
import AppFooter from '../shared-components/AppFooter';
import FullscreenLoader from '../shared-components/FullscreenLoader';
import GaTracker from '../shared-components/GaTracker';
import HomePage from '../shared-components/HomePage';
import Navbar from '../shared-components/Navbar';
import { Flex } from '../shared-components/rebassCompat';
import ScrollToTop from '../shared-components/ScrollToTop';

// tslint:disable-next-line:space-in-parens
const BooksPage = React.lazy(() => import(/* webpackChunkName: "books" */'../books/BooksPage'));
// tslint:disable-next-line:space-in-parens
const NotFoundPage = React.lazy(() => import(/* webpackChunkName: "not-found" */'../shared-components/NotFoundPage'));

const App = () => {
  const { isLoggingIn, loginWithRedirect, logout, user } = useAuth0();

  return (
    <GaTracker>
      <ScrollToTop>
        {
          isLoggingIn ?
            <FullscreenLoader style={{ height: '100%' }} delay={0} /> :
            <Flex flexDirection="column" style={{ height: '100%' }}>
              <Navbar
                user={user}
                handleLogin={() => loginWithRedirect({ appState: { targetUrl: '/books' } })}
                handleLogout={() => logout({ returnTo: window.location.origin, client_id: process.env.AUTH0_CLIENT_ID })}
              />
              <React.Suspense fallback={<FullscreenLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/books" element={<PrivateRoute path="/books" component={BooksPage} />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </React.Suspense>
              <AppFooter />
            </Flex>
        }
      </ScrollToTop>
    </GaTracker>
  );
};

export default App;
