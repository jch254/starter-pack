import { AuthState } from './auth/reducer';

const AUTH = 'AUTH';

export const setStoredAuthState = (profile?: auth0.Auth0UserProfile, idToken?: string): void => {
  const localStorageState = {
    profile,
    idToken,
  };

  localStorage.setItem(AUTH, JSON.stringify(localStorageState));
};

export const removeStoredAuthState = (): void => {
  localStorage.removeItem(AUTH);  
};

export const getStoredAuthState = (): Partial<AuthState> => {
  try {
    return JSON.parse(localStorage.getItem(AUTH) || '{}');
  } catch (err) {
    removeStoredAuthState();

    return {};
  }
};
