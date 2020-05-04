// reducer들을 통합할 configureStore 파일을 정의한다.
import { createStore, combineReducers } from 'redux';
import reducers from './reducers';

export const initState = {
  loading: false,
  authentication: {
    isAuthenticated: !!localStorage.isAuthenticated,
  },
  user: {
    name: 'hyunjin',
    email: 'jhjhyjin@naver.com',
  }
};

export default initStates => createStore(
  combineReducers(reducers),
  initStates,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);