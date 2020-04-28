export const SET_AUTHENTICATION = 'authentication/SET_AUTHENTICATION';

export const setAuthentication = (isAuthenticated) => ({
  type: SET_AUTHENTICATION,
  payload: {
    isAuthenticated: isAuthenticated,
  },
});