export const ID_TOKEN = 'id_token';
export const PROFILE = 'profile';

export const setStoredAuthData = (profile, idToken) => {
  localStorage.setItem(ID_TOKEN, idToken);
  localStorage.setItem(PROFILE, JSON.stringify(profile));
};

export const removeStoredAuthData = () => {
  localStorage.removeItem(ID_TOKEN);
  localStorage.removeItem(PROFILE);
};

export const getStoredAuthData = () => {
  try {
    const idToken = localStorage.getItem(ID_TOKEN);
    const profile = JSON.parse(localStorage.getItem(PROFILE));

    return { idToken, profile };
  } catch (err) {
    removeStoredAuthData();

    return {};
  }
};
