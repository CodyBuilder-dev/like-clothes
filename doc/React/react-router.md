# react-router

## SPA(Single Page Application)

#### 일반 웹 사이트의 동작 과정

http://easypub.co.kr/doit.html에 접근한다고 가정하자. 동작 과정은 아래와 같다.

1. DNS서버에 http://easypub.co.kr을 요청하여 웹 서버를 찾는다.(웹 서버의 IP를 찾는다.)
2. 웹 서버에 doit.html 파일을 요청한다.
3. 웹서버에서 찾는 파일을 보내준다.

위의 과정은 화면의 일부를 바꾸고 싶다면, 바뀐 화면에 해당하는 웹 문서를 일일이 요청, 전달해야 한다.

-> 서버에 저장된 값을 화면에 반영할 수 있도록 ASP(Active Server Page), JSP(Java Server Page) 등 동적인 웹문서 생성 도구를 개발!

이러한 방식을 Server Side Rendering이라 한다.

여기서 더 발전하여! 웹 서버가 아닌 **자바스크립트 코드로 웹 문서를 생성하도록 만든 것이 SPA**이다.



#### SPA의 동작 과정

1. 웹 브라우저에서 노드 서버에 요청하면, 웹 브라우저로 index.html 파일과 bundle.js 파일을 보낸다.

2. 웹 브라우저는 bundle.js 파일에 적힌 리액트 코드를 해석하여 index.html 문서에 반영한다.

   -> index.html은 빈 종이, bundle.js는 화면을 그리는 것!

**SPA는 자바스크립트로 화면을 구성한다.** index.html 위에 여러 화면들을 자바스크립트로 구성한다. 이는 주소에 맞는 화면 컴포넌트를 출력해주는 것.

```javascript
// http://easypub.co.kr/pathname의 요청이 들어온다면

function App({ pathname }) {
    return (
    	<div id="body">
        	{ pathname === "home" && <Home/> }
			{ pathname === "login" && <Login/> }
			{ pathname === "signup" && <Signup/> }
    );
}
```

이런 느낌인데, 이를 깔끔히 정리하기 위해 라우터가 필요하다.

SPA는 이처럼 **서버에서 받은 index.html과 자바스크립트 코드만 사용**하기 때문에, 서버에 추가로 웹 문서를 요청할 필요가 없어 **화면 전환이 빠르다.**



## 리액트 라우터 구성하기

### Route 컴포넌트 사용하기

리액트 라우터는 **사용자가 입력한 주소를 감지하는 역할**. 컨텍스트의 공급자와 같은 역할로 브라우저의 환경에 맞게 하나만 골라 사용하면 된다.

라우터 컴포넌트 아래에 Route, Switch 컴포넌트를 배치하여 주소에 맞는 화면(컴포넌트)을 출력하거나, Link, Redirect 컴포넌트로 주소 이동도 구현할 수 있다.



```javascript
import { BrowserRouter as Router, Route } from 'react-router-dom';

...

function App() {
  return (
    <Router>
      <Route path="/" exact render={() => <MainPage/>} />
    </Router>
   
    ...
    
```

exact : 라우팅 할 때 path값을 정규식 표현으로 읽는데, exact 프로퍼티를 쓰면 완벽히 일치할 때만 화면을 보여준다.



### Switch 컴포넌트 사용하기

보통 사용자가 올바르지 않은 주소에 접속하면 오류 화면을 출력해 준다. 이를 구현하려면 **Switch 컴포넌트와 Route 컴포넌트를 함께 사용**한다! Switch 컴포넌트는 하위에 배치한 여러 Route 컴포넌트 중 가장 먼저 path가 일치하는 컴포넌트 하나를 출력하도록 만들어준다.



잘못된 주소를 입력했을 때 알려주는 NotFound 페이지를 라우팅 해보자!

1. NotFound 컴포넌트 작성하기

   ```javascript
   import React, { PureComponent } from 'react';
   
   class NotFound extends PureComponent {
     render() {
       const { url } = this.props.match || {};
       return (
         <div>
           { url } 페이지를 찾을 수 없습니다.
         </div>
       )
     };
   };
   
   export default NotFound;
   ```

2. 주소가 /가 아니면 NotFound 컴포넌트 출력하기

   ```javascript
   // App.js의 Router 부분 수정
   	<Router>
         <Switch>
           <Route path="/" exact render={() => <MainPage/>} />
           <Route path="*" component={NotFound} />
         </Switch>
       </Router>
   ```




### Link 컴포넌트 사용하기

위의 NotFound.jsx를 다음을 추가한다.

```javascript
import { Link } from 'react-router-dom';
...

<Link to="/">메인으로 이동</Link>
```

링크를 누르면 to 프로퍼티에 입력한 값으로 주소가 바뀐당!



### Redirect 컴포넌트 사용하기

특정 조건을 만족했을 때 다음처럼 리다이렉션 할 수 있다.

```javascript
{isFinished && <Redirect to="/" />}
```

