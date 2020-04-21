export default function reducer(state = {}, action) { // state의 초기값을 지정하지 않으면 에러가 발생
  const { type, payload } = action;
  switch (type) {
    case 'SELECT_IMAGE': {
      return {
        ...state,
        loading: payload,
      };
    }
    case 'RESET_LOADING': {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};