# Redux

데이터 관리를 위해 만들어진 것
데이터를 **스토어(store)**에서 관리한다.

컨텍스트의 공급자, 소비자와 비슷한 관계인데, **여러 개의 공급자를 관리하던 컨텍스트**와는 달리 리덕스에서는 '**스토어에서 모든 데이터를 관리**한다.

#### 그럼 둘 중 어떤걸 쓸까?

- 서버에서 가져온 데이터를 이용하여 새로운 결과물을 만드는 경우 -> 리덕스
- 컴포넌트의 통합 데이터를 관리하는 경우 -> 컨텍스트



#### 리액트의 데이터 전달을 위한 개념들을 다시 정리하면

- 프로퍼티 : 상위 컴포넌트에서 하위 컴포넌트로 전달되는 읽기 전용 데이터
- state : 컴포넌트의 state를 저장하고 변경할 수 있는 데이터
- 컨텍스트 : 부모 컴포넌트에서 생성하여 모든 자식 컴포넌트에 전달하는 데이터
- 리덕스 : 서버에서 받은 데이터를 앱 전체에 전달하거나 관리



```bash
yarn add redux react-redux

# 필요에 따라 chrome extension에 redux devtools도 설치한다
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related?hl=ko

# 리덕스 코드와 크롬 확장 도구를 이어주기 위해 개발자 확장 라이브러리도 설치
yarn add redux-devtools-extension --dev
```



#### 리덕스로 빈 스토어 생성해 보기

```javascript
createStore(reducer, /* 초깃값 */, /* 미들웨어 함수 */);
```

초깃값과 함수는 생략 가능.



#### 스토어 생성 및 redux-devtools 개발자 도구 연동

```javascript
import React, { PureComponent } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

class ReduxApp extends PureComponent {
  // store = createStore(state => state); 초깃값, 함수 없이 생성 가능
  store = createStore(
    state => state, // reducer가 있어야 할 자리. 현재는 단순히 state를 받아
      				// 다시 state를 리턴하는 구조
    { loading: false, name: '두잇 리액트' },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  render() {
    return (
      <Provider store={this.store}> // this.store는 위에서 만든 store
      리덕스 예제
      </Provider>
    )
  }
}

export default ReduxApp;
```



## 액션과 리듀서

#### 액션

type과 payload(payload의 명칭은 달라져도 된다.)로 이루어진 객체

```javascript
{
    type: 'SET_LOADING',
    payload: true,
}
{
    type: 'SET_USER',
    payload: { name: 'Park', age: 20 }.
}
{
    type: 'RESET_LOADING'
    // payload 생략 가능
}
```



#### 리듀서

다음과 같은 간단한 함수 구조

```javascript
function reducer(state, action) { return state; }
```

리듀서는 스토어의 이전 데이터(state), 액션(action)을 받아 새로운 데이터를 반환한다.

아래는 스토어의 이전 데이터를 새로운 데이터로 변경하는 예이다.

```javascript
// 함수이기 때문에 이와 같이 만들 수도 있다.
const reducer = (state, action) => state + action.payload;
```

- 리듀서가 반환하는 값의 자료형은 스토어의 이전 데이터와 동일해야 한다.
  - 대부분의 경우 객체를 사용하기 때문에, 자료형까지는 신경쓰지 않아도..



#### dispatch() 함수

액션은 dispatch() 함수를 통해 reducer로 전달

위의 소스에서 store = create( ... ); 의 하위에 아래의 소스를 추가한다.

```javascript
componentDidMount() {
    this.store.dispatch({ // dispatch의 인자로 액션을 담는다.
      type: 'SET_LOADING',
      payload: true,
    });
  }
```



#### 리듀서에 대해 깊게 보자

- 리듀서라는 이름은 배열 함수 중 reduce()에서 따온 것

- 리듀서는 변환 함수 배열을 최종 스토어 데이터로 변환

아래는 실제 Store 클래스의 일부이다

```javascript
class Store {
  state = {};
  dispatch(action) {
    const reducer1 = state => state;
    const reducer2 = (state, action) => state + action.payload;
    /* 여러가지 더 있다. */
    const reducers = [reducer1, reducer2, /* 여러가지들 */];
    
    const updatedState = reducers.reduce(
      (nextState, reducer) => reducer(nextState, action),
      this.state
    );
    this.state = updatedState;
  }
}
```



### 리듀서 구현하고 수행해보기

이제까지의 예에서는 단순히 action으로 들어온 값을 그대로 다음 상태로 사용하기만 하였다(state => state). 하지만 실제로는 action의 type 프로퍼티에 따라서 다른 작업을 실행할 수 있도록 구현한다.

1. 리듀서 구현하기

   switch문을 사용하여 각 액션 타입에 맞는 작업 수행하기

   ```javascript
   const reducer = (state, action) => {
     const { type, payload } = action;
     switch (type) {
       case 'SET_LOADING': {
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
       case 'SET_USER': {
         return {
           ...state,
           user: payload,
         }
       }
       default:
         return state;
     }
   };
   ```

2. 리듀서 동작 확인해보기

   ```javascript
   store = createStore(
       reducer,
       { loading: false, name: '두잇 리액트' },
       window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     );
     componentDidMount() {
       this.store.dispatch({
         type: 'SET_LOADING',
         payload: true,
       });
       this.store.dispatch({
         type: 'RESET_LOADING',
       });
       this.store.dispatch({
         type: 'SET_USER',
         payload: {
           name: 'Park',
           age: 20,
         }
       })
     }
   ```

3. 제대로 동작하는지 여부는 크롬 리덕스 확장 도구에서 확인해보자!



## 리듀서 분리하기

이제까지는 하나의 리듀서가 스토어 전체를 관리하도록 구현하였다. 리듀서(또는 액션)도 마찬가지로 데이터의 종류에 맞게 분리하는 것이 코드를 효율적으로 관리할 수 있어 좋다.

1. 각 리듀서를 데이터 종류에 맞게 분리한다.

   loadingReducer.js

   ```javascript
   export default function reducer(state = {}, action) { // state의 초기값을
       												//지정하지 않으면 에러가 발생
     const { type, payload } = action;
     switch (type) {
       case 'SET_LOADING': {
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
   ```

   userReducer.js

   ```javascript
   export default function reducer(state = {}, action) {
     const { type, payload } = action;
     switch (type) {
       case 'SET_USER': {
         return {
           ...state,
           user: payload,
         };
       }
       default:
         return state;
     }
   };
   ```

2. 분리한 리듀서가 하나처럼 동작하기 위해 index.js로 묶어 익스포트한다.

   index.js

   ```javascript
   import loading from './loadingReducer';
   import user from './userReducer';
   
   export default {
     loading,
     user,
   };
   ```

3. 분리한 리듀서가 스토어에 적용될 수 있도록 스토어 설정 파일을 만든다.

   여러 개의 리듀서는 combineReducers() 함수로 묶어 createStore() 함수의 인자로 전달한다.

   configureStore.js

   ```javascript
   
   import { createStore, combineReducers } from 'redux';
   import { composeWithDevTools } from 'redux-devtools-extension';
   import reducers from './reducers';
   
   export default initStates => createStore(
     combineReducers(reducers),
     initStates,
     composeWithDevTools(), // 미들웨어 함수가 이런 것으로 대체되었다.
   );
   ```

4. 기존의 ReduxApp을 다음으로 수정한다.

   ```javascript
   import configureStore from './configureStore';
   
   ...
   
   /*
     store = createStore(
       reducer,
       { loading: false, name: '두잇 리액트' },
       window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     );
     */
    
     store = configureStore({ loading: false, });
   ```

5. 위의 과정을 모두 거치고 리듀서의 리턴 값을 확인해보면 loading = { loading: false }의 이중 구조를 만들게 되는데, 이는 combineReducers() 과정에서 index.js에 지정한 리듀서 이름인 loading을 키로 사용해서 리턴 값을 loading 키의 반환값 형태로 만들기 때문. 리듀서의 논리 리턴으로부터 변경하자.



### 액션 분리하기

1. dispatch() 함수에 적용했던 액션을 분리하기 위해 loadingActions.js 파일로 구성한다.

   ```javascript
   export const SET_LOADING = 'loading/SET_LOADING';
   export const RESET_LOADING = 'loading/RESET_LOADING';
   
   export const setLoading = loading => ({ //
     type: SET_LOADING,
     payload: loading,
   });
   
   export const resetLoading = () => ({
     type: RESET_LOADING,
   });
   ```

   타입에 'loading/SET_LOADING'을 직접 선언함으로 loading에 사용되는 것임을 강조해준다.

2. 기존의  loadingReducer.js 파일의 case 값들을 위와 맞추어 바꿔준다. import하고 값을 지정하게 하면 값이 달라져도 관리가 되겠죠?

3. ReduxApp에도 수정사항 적용해주기.

4. user action도 마찬가지로 변경해준다.