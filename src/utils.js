import Immutable, { Map } from 'immutable';

export const ID_TOKEN = 'id_token';
export const PROFILE = 'profile';

export const setStoredAuthState = (profile, idToken) => {
  localStorage.setItem(ID_TOKEN, idToken);
  localStorage.setItem(PROFILE, JSON.stringify(profile));
};

export const removeStoredAuthState = () => {
  localStorage.removeItem(ID_TOKEN);
  localStorage.removeItem(PROFILE);
};

export const getStoredAuthState = () => {
  try {
    const idToken = localStorage.getItem(ID_TOKEN);
    const profile = Immutable.fromJS(JSON.parse(localStorage.getItem(PROFILE)));

    return new Map({ idToken, profile });
  } catch (err) {
    removeStoredAuthState();

    return new Map();
  }
};
