import { SET_USER } from '../actions/userActions';

export default function reducer(state = {}, action) { // state의 초기값을
  //지정하지 않으면 에러가 발생
  const { type, payload } = action;
  console.log(action);
  switch (type) {
    case SET_USER: {
      return {
        name: payload.name,
        email: payload.email,
      }
    }

    // 작성 예시
    // case 'SELECT_TEST': {
    //   console.log('SELECT_TEST:', payload);
    //   return {
    //     ...state,
    //     test: payload.test,
    //   };
    // }
    // case 'RESET_LOADING': {
    //   return {
    //     ...state,
    //     loading: false,
    //   };
    // }
    default:
      return state;
  }
};