export const SET_USER = 'user/SET_USER';

export const setUser = (name, email) => ({
  type: SET_USER,
  payload: {
    name: name,
    email: email,
  }, 
});