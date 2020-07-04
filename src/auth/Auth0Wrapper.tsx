import createAuth0Client, {
  getIdTokenClaimsOptions,
  Auth0Client,
  Auth0ClientOptions,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  IdToken,
  LogoutOptions,
  PopupLoginOptions,
  RedirectLoginOptions,
} from '@auth0/auth0-spa-js';
import { replace } from 'connected-react-router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './reducer';
import { getAuth0Client } from './selectors';

export interface Auth0Context {
  isAuthenticated: boolean;
  user?: any;
  isLoggingIn: boolean;
  isPopupOpen: boolean;
  loginWithPopup: (options?: PopupLoginOptions) => Promise<void>;
  getIdTokenClaims: (options?: getIdTokenClaimsOptions) => Promise<IdToken>;
  loginWithRedirect: (options?: RedirectLoginOptions) => Promise<void>;
  getTokenSilently: (options?: GetTokenSilentlyOptions) => Promise<any>;
  getTokenWithPopup: (options?: GetTokenWithPopupOptions) => Promise<string>;
  logout: (options?: LogoutOptions) => void;
}

export const Auth0Context = React.createContext<Auth0Context>({} as Auth0Context);

export const useAuth0 = () => React.useContext(Auth0Context);

interface Auth0ProviderProps extends Auth0ClientOptions {
  children: any;
}

export const Auth0Provider = ({
  children,
  ...auth0Options
}: Auth0ProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<any>();
  const [isLoggingIn, setIsLoggingIn] = React.useState(true);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);
  const dispatch = useDispatch();
  const auth0Client = useSelector(getAuth0Client);

  React.useEffect(
    () => {
      const initAuth0 = async () => {
        const auth0Client = await createAuth0Client(auth0Options as Auth0ClientOptions);

        dispatch(authActions.setAuth0Client(auth0Client));

        if (window.location.search.includes('code=')) {
          const { appState } = await auth0Client.handleRedirectCallback();

          dispatch(replace(appState && appState.targetUrl ? appState.targetUrl : '/'));
        }

        const isAuthenticated = await auth0Client.isAuthenticated();

        setIsAuthenticated(isAuthenticated);

        if (isAuthenticated) {
          const user = await auth0Client.getUser();

          setUser(user);
        }

        setIsLoggingIn(false);
      };

      initAuth0();
    },
    [],
  );

  const loginWithPopup = async (options?: PopupLoginOptions) => {
    setIsPopupOpen(true);

    try {
      await (auth0Client as Auth0Client).loginWithPopup(options);
    } catch (error) {
      console.error(error);
    } finally {
      setIsPopupOpen(false);
    }

    const user = await (auth0Client as Auth0Client).getUser();

    setUser(user);
    setIsAuthenticated(true);
  };

  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        isLoggingIn,
        isPopupOpen,
        loginWithPopup,
        getIdTokenClaims: (options?: getIdTokenClaimsOptions) => (auth0Client as Auth0Client).getIdTokenClaims(options),
        loginWithRedirect: (options?: RedirectLoginOptions) => (auth0Client as Auth0Client).loginWithRedirect(options),
        getTokenSilently: (options?: GetTokenSilentlyOptions) => (auth0Client as Auth0Client).getTokenSilently(options),
        getTokenWithPopup: (options?: GetTokenWithPopupOptions) => (auth0Client as Auth0Client).getTokenWithPopup(options),
        logout: (options?: LogoutOptions) => (auth0Client as Auth0Client).logout(options),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
