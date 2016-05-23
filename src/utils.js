export function checkStatus(response) {
  if (!response.ok) {   // (response.status < 200 || response.status > 300)
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

export function parseJSON(response) {
  return response.json();
}

export const ID_TOKEN = 'id_token';
export const PROFILE = 'profile';

export function setStoredAuthData(profile, idToken) {
  localStorage.setItem(ID_TOKEN, idToken);
  localStorage.setItem(PROFILE, JSON.stringify(profile));
}

export function removeStoredAuthData() {
  localStorage.removeItem(ID_TOKEN);
  localStorage.removeItem(PROFILE);
}

export function getStoredAuthData() {
  try {
    const idToken = localStorage.getItem(ID_TOKEN);
    const profile = JSON.parse(localStorage.getItem(PROFILE));

    return { idToken, profile };
  } catch (err) {
    removeStoredAuthData();

    return {};
  }
}
