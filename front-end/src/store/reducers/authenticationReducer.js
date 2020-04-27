import { SET_AUTHENTICATION } from '../actions/authenticationActions';

export default function reducer(state = {}, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_AUTHENTICATION: {
      return {
        isAuthenticated: payload.isAuthenticated,
      }
    }
    default:
      return state;
    }
}