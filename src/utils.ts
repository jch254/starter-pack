import { AuthState } from './auth/reducer';

export const ID_TOKEN = 'id_token';
export const PROFILE = 'profile';

export const setStoredAuthState = (profile: auth0.Auth0UserProfile, idToken: string): void => {
  localStorage.setItem(ID_TOKEN, idToken);
  localStorage.setItem(PROFILE, JSON.stringify(profile));
};

export const removeStoredAuthState = (): void => {
  localStorage.removeItem(ID_TOKEN);
  localStorage.removeItem(PROFILE);
};

export const getStoredAuthState = (): Partial<AuthState> => {
  try {
    const idToken = localStorage.getItem(ID_TOKEN);
    const profile = JSON.parse(localStorage.getItem(PROFILE) as string) as auth0.Auth0UserProfile;

    return { idToken, profile };
  } catch (err) {
    removeStoredAuthState();

    return {};
  }
};
