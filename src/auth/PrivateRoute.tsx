import * as React from 'react';
import { ComponentType } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from './Auth0Wrapper';

interface PrivateRouteProps {
  component: ComponentType;
  path: string;
}

const PrivateRoute = ({ component: Component, path }: PrivateRouteProps) => {
  const { isLoggingIn, isAuthenticated, loginWithRedirect } = useAuth0();
  const location = useLocation();

  React.useEffect(
    () => {
      if (isLoggingIn || isAuthenticated) {
        return;
      }

      const login = async () => {
        await loginWithRedirect({
          appState: { targetUrl: location.pathname || path },
        });
      };

      login();
    },
    [isLoggingIn, isAuthenticated, loginWithRedirect, location.pathname, path],
  );

  return isAuthenticated ? <Component /> : null;
};

export default PrivateRoute;
