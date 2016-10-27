export const getError = state => state.auth.get('error');

export const getIdToken = state => state.auth.get('idToken');

export const getIsLoggingIn = state => state.auth.get('isLoggingIn');

export const getProfile = state => state.auth.get('profile');
