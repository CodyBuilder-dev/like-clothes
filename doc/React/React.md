# React

## 엘리먼트 렌더링

엘리먼트는 React 앱의 가장 작은 단위이다.

```react
const element = <h1>Hello, world!</h1>
```

이렇듯, 리액트의 엘리먼트는 일반 객체이다.

React DOM은 React 엘리먼트와 일치하도록 DOM을 업데이트 한다.



index.js파일의 아래의 부분을 보자.

```react
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

index.html 파일을 살펴보면

```react
<div id="root"></div>
```

위와 같은 부분이 있는데, index.html에서는 단지 위의 태그 하나만 수행할 뿐이다. 그런데 화면이 렌더링 되는 이유는, 이 id="root"가 돔의 최상위에서 하위의 컴포넌트들을 실행하기 때문이다. 위의 index.js의 ReactDOM.render()의 두번째 인자를 통해 수행된다. 이는 **모든 엘리먼트를 React DOM에서 관리하기 때문에, 루트 DOM 노드**라고 한다.



## Components and Props

### 함수 컴포넌트

```react
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

이 함수는 데이터를 가진 하나의 "props" (props는 속성을 나타내는 데이터) 객체 인자를 받은 후 React 엘리먼트를 반환하므로 유효한 React 컴포넌트이다. 이러한 컴포넌트는 JavaScript 함수이기 때문에 말 그대로 "함수 컴포넌트"라고 부른다.



### 클래스 컴포넌트

```react
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```



### 컴포넌트 렌더링

아래는 React 엘리먼트를 DOM 태그로 나타낸 것이다.

```react
const element = <div />;
```

이를 사용자 정의 컴포넌트로 나타내면 아래와 같다.

```react
const element = <Welcome name="Sara" />;
```

React가 사용자 정의 컴포넌트로 작성한 엘리먼트를 발견하면 JSX 어트리뷰트와 자식을 해당 컴포넌트에 단일 객체로 전달하는데, 이 객체를 **props**라 한다.

```react
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

### 컴포넌트 합성

컴포넌트는 자신의 출력에 다른 컴포넌트를 참조하는 것이 가능하다. 

```react
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
```

일반적으로 새 React 앱은 **최상위에 단일 App 컴포넌트**를 가지고 있다. 하지만 기존 앱에 React를 통합하는 경우에는 **Button과 같은 작은 컴포넌트부터 시작해서 뷰 계층의 상단으로 올라가면서 점진적으로 작업**해야 할 수 있습니다.

### 컴포넌트 추출

다음과 같은 컴포넌트 구조가 있다고 하자.

```react
function Comment(props) {
  return (
    <div className="UserInfo">
      <img className="Avatar"
      	src={props.author.avatarUrl}
		alt={props.author.name}
	  />
      <div className="UserInfo-name">
        {props.author.name}
	  </div>
  	</div>
  )
}
```

여기에서 컴포넌트를 일부 추출하여 더욱 간단히 나타내면 아래와 같다. Avatar를 추출하자.

```react
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

다음으로, user를 추출하자.

```react
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

이를 다시 조합하면 아래와 같아진다.

```react
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
    </div>
  );
}
```

재사용 가능한 컴포넌트를 만들어 놓는 것은 더 큰 앱에서 작업할 때 두각을 나타낸다! UI 일부가 여러 번 사용되거나 (`Button`, `Panel`, `Avatar`), UI 일부가 자체적으로 복잡한 (`App`, `FeedStory`, `Comment`) 경우에는 재사용 가능한 컴포넌트로 만드는 것이 좋다. 또 props의 이름은 사용될 context가 아닌 컴포넌트 자체의 관점에서 짓는 것을 권장한다. 그리고 **props는 읽기 전용이다.**



## State and Lifecycle

State는 props와 유사하지만, **비공개이며 컴포넌트에 의해 완전히 제어된다.**

아래는 함수형 컴포넌트 Clock이 자체 컴포넌트에서 값이 변경되도록 구현하기 위해 짠 소스이다.

```react
function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

그렇지만 이는 Clock 컴포넌트에서 자체적으로 DOM을 수정하는 것이 아니다. 이를 위해서는 **state**가 필요하다. state를 사용하기 위해 Clock 컴포넌트를 class형 컴포넌트로 다시 구현한 형태는 아래와 같다.

```react
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

`render` 메서드는 업데이트가 발생할 때마다 호출되지만, 같은 DOM 노드로 <Clock />을 렌더링하는 경우 `Clock` 클래스의 단일 인스턴스만 사용된다. 이것은 **로컬 state와 생명주기 메서드와 같은 부가적인 기능을 사용할 수 있게 해준다.**

이를 적용한 소스는 아래와 같다.

1. `render()` 메서드 안에 있는 `this.props.date`를 `this.state.date`로 변경한다.
2. 초기 `this.state`를 지정하는 [class constructor](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes#Constructor_(생성자))를 추가한다. 클래스 컴포넌트는 항상 `props`로 기본 constructor를 호출해야 한다.

```react
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```



### 생명주기 메서드를 클래스에 추가하기

많은 컴포넌트가 있는 애플리케이션에서 컴포넌트가 삭제될 때 해당 컴포넌트가 사용 중이던 리소스를 확보하는 것이 중요.

1. `Clock`이 처음 DOM에 렌더링 될 때마다 [타이머를 설정](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval)하려고 한다. 이것은 React에서 "마운팅"이라고 한다.

2. 또한 `Clock`에 의해 생성된 DOM이 삭제될 때마다 [타이머를 해제](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval)하려고 합니다.

위의 두 가지를 적용하기 위한 방법은 **생명주기 메서드**를 사용하는 것이다.

```react
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

`componentDidMount()` 메서드는 컴포넌트 출력물이 DOM에 렌더링 된 후에 실행된다. 이 장소가 타이머를 설정하기에 좋은 장소다.

```react
componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

componentWillUnmount() {
    clearInterval(this.timerID);
}
```

`this.props`가 React에 의해 스스로 설정되고 `this.state`가 특수한 의미가 있지만, 타이머 ID와 같이 데이터 흐름 안에 포함되지 않는 어떤 항목을 보관할 필요가 있다면 **자유롭게 클래스에 수동으로 부가적인 필드를 추가해도 된다**. 또한 tick() 메서드를 구현하면 아래와 같다.

```react
tick() {
    this.setState({
      date: new Date()
    });
  }
```

현재 어떤 상황이고 메서드가 어떻게 호출되는지 순서대로 빠르게 요약해 보겠습니다.

1. `<Clock />`가 `ReactDOM.render()`로 전달되었을 때 React는 `Clock` 컴포넌트의 constructor를 호출합니다. `Clock`이 현재 시각을 표시해야 하기 때문에 현재 시각이 포함된 객체로 `this.state`를 초기화합니다. 나중에 이 state를 업데이트할 것입니다.
2. React는 `Clock` 컴포넌트의 `render()` 메서드를 호출합니다. 이를 통해 React는 화면에 표시되어야 할 내용을 알게 됩니다. 그 다음 React는 `Clock`의 렌더링 출력값을 일치시키기 위해 DOM을 업데이트합니다.
3. `Clock` 출력값이 DOM에 삽입되면, React는 `componentDidMount()` 생명주기 메서드를 호출합니다. 그 안에서 `Clock` 컴포넌트는 매초 컴포넌트의 `tick()` 메서드를 호출하기 위한 타이머를 설정하도록 브라우저에 요청합니다.
4. 매초 브라우저가 `tick()` 메서드를 호출합니다. 그 안에서 `Clock` 컴포넌트는 `setState()`에 현재 시각을 포함하는 객체를 호출하면서 UI 업데이트를 진행합니다. `setState()` 호출 덕분에 React는 state가 변경된 것을 인지하고 화면에 표시될 내용을 알아내기 위해 `render()` 메서드를 다시 호출합니다. 이 때 `render()` 메서드 안의 `this.state.date`가 달라지고 렌더링 출력값은 업데이트된 시각을 포함합니다. React는 이에 따라 DOM을 업데이트합니다.
5. `Clock` 컴포넌트가 DOM으로부터 한 번이라도 삭제된 적이 있다면 React는 타이머를 멈추기 위해 `componentWillUnmount()` 생명주기 메서드를 호출합니다.



### State를 올바르게 사용하기

#### 직접 State를 수정하지 마세요.

```react
// Wrong
this.state.comment = 'Hello';

// Correct
this.setState({comment: 'Hello'});
```

`this.state`를 지정할 수 있는 유일한 공간은 바로 **constructor**입니다.

### 

#### State 업데이트는 비동기적일 수 있다.

React는 성능을 위해 여러 `setState()` 호출을 단일 업데이트로 한꺼번에 처리할 수 있다. 이는 `this.props`와 `this.state`가 비동기적으로 업데이트될 수 있기 때문에 다음 state를 계산할 때 해당 값에 의존해서는 안 된다. 예를 들면, 아래와 같다.

```react
// Wrong. 값이 업데이트되는 타이밍에 따라서 잘못된 값이 전달될 수 있다.
this.setState({
  counter: this.state.counter + this.props.increment,
});

// Correct. 함수화하여 인자를 통해 전달하면 그 순간의 옳은 데이터를 전달할 수 있다.
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```



#### State 업데이트는 병합된다.

`setState()`를 호출할 때 React는 제공한 객체를 현재 state로 병합한다.

예를 들어, state는 다양한 독립적인 변수를 포함할 수 있다.

```react
constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

별도의 `setState()` 호출로 이러한 변수를 독립적으로 업데이트할 수 있다.

```react
componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

병합은 얕게 이루어지기 때문에 `this.setState({comments})`는 `this.state.posts`에 영향을 주진 않지만 `this.state.comments`는 완전히 대체된다.



#### 데이터는 아래로 흐른다. 단방향 데이터 흐름이라고 한다.

부모 컴포넌트나 자식 컴포넌트 모두 특정 컴포넌트가 유상태인지 또는 무상태인지 알 수 없고, 그들이 함수나 클래스로 정의되었는지에 대해서 관심을 가질 필요가 없다.

컴포넌트는 자신의 state를 자식 컴포넌트에 props로 전달할 수 있다.

```react
// 자신의 컴포넌트로 props를 전달할 때
<FormattedDate date={this.state.date} />

// props로 전달된 데이터가 부모의 state에서 온 건지, props였다가 또 props로 온 건지, 아니면 수동으로 입력한 것인지 알 필요가 없다.
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```



## 이벤트 처리하기

### React에서 이벤트를 처리하는 형식

- 이벤트는 카멜 케이스(camelCase)를 사용한다.
- JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러를 전달한다.

```react
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

[ES6 클래스](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes)를 사용하여 컴포넌트를 정의할 때, 일반적인 패턴은 이벤트 핸들러를 클래스의 메서드로 만드는 것이다. 예를 들어, 다음 `Toggle` 컴포넌트는 사용자가 “ON”과 “OFF” 상태를 토글 할 수 있는 버튼을 렌더링한다.

```react
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

#### JSX 콜백 안에서 `this`의 의미

JavaScript에서 클래스 메서드는 기본적으로 [바인딩](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)되어 있지 않다. `this.handleClick`을 바인딩하지 않고 `onClick`에 전달하였다면, 함수가 실제 호출될 때 `this`는 `undefined`가 된다.

이는 React만의 특수한 동작이 아니며, [JavaScript에서 함수가 작동하는 방식](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/)의 일부. 일반적으로 `onClick={this.handleClick}`과 같이 뒤에 `()`를 사용하지 않고 메서드를 참조할 경우, 해당 **메서드를 바인딩 해야 한다.**

만약 `bind`를 호출하는 것이 불편하다면, 이를 해결할 수 있는 두 가지 방법이 있다. 실험적인 [퍼블릭 클래스 필드 문법](https://babeljs.io/docs/plugins/transform-class-properties/)을 사용하고 있다면, 클래스 필드를 사용하여 콜백을 올바르게 바인딩할 수 있다.

```react
class LoggingButton extends React.Component {
  // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
  // 주의: 이 문법은 *실험적인* 문법입니다.
  handleClick = () => {
    console.log('this is:', this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

또는 콜백에 화살표 함수를 사용한다.

```react
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 합니다.
    return (
      <button onClick={() => this.handleClick()}>
        Click me
      </button>
    );
  }
}
```

이 문법의 문제점은 `LoggingButton`이 **렌더링될 때마다 다른 콜백이 생성된다는 것**. 대부분의 경우 문제가 되지 않으나, **콜백이 하위 컴포넌트에 props로서 전달된다면 그 컴포넌트들은 추가로 다시 렌더링을 수행할 수도 있다.** 이러한 종류의 성능 문제를 피하고자, 생성자 안에서 바인딩하거나 클래스 필드 문법을 사용하는 것을 권장한다.



### 이벤트 핸들러에 인자 전달하기

```react
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

위의 두 가지 형태 모두 가능.