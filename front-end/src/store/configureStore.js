// reducer들을 통합할 configureStore 파일을 정의한다.
import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

export default initStates => createStore(
  combineReducers(reducers),
  initStates,
  composeWithDevTools(), // 미들웨어 함수가 이런 것으로 대체되었다.
);