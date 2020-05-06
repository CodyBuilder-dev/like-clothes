import { SET_USER } from '../actions/userActions';

export default function reducer(state = {}, action) { // state의 초기값을
  //지정하지 않으면 에러가 발생
  const { type, payload } = action;
  switch (type) {
    case SET_USER: {
      return {
        name: payload.name,
        email: payload.email,
      }
    }
    default:
      return state;
  }
};