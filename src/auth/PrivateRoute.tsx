import * as React from 'react';
// tslint:disable-next-line:no-duplicate-imports
import { ComponentType } from 'react';
import { Route } from 'react-router-dom';
import { useAuth0 } from './Auth0Wrapper';

interface PrivateRouteProps {
  component: ComponentType;
  path: string;
  [key: string]: any;
}

const PrivateRoute = ({ component: Component, path, ...rest }: PrivateRouteProps) => {
  const { isLoggingIn, isAuthenticated, loginWithRedirect } = useAuth0();

  React.useEffect(
    () => {
      if (isLoggingIn || isAuthenticated) {
        return;
      }

      const login = async () => {
        await loginWithRedirect({
          appState: { targetUrl: path },
        });
      };

      login();
    },
    [isLoggingIn, isAuthenticated, loginWithRedirect, path],
  );

  const render = (props: any) => isAuthenticated ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
