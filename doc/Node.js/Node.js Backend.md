# **Node.js Backend**

---

## 1. Node.js

 확장성 있는 네트워크 애플리케이션(Server) 개발에 사용되는 소프트웨어 플랫폼. 2009년 5월 27일 처음 등장, 오픈소스 JavaScript 엔진인 크롬 V8 + 비동기 이벤트 처리 라이브러리인 libuv를 결합한 플랫폼.

![](../../Images/Node.js.png)

- **설치**

   NVM(Node Version Manager)을 이용해 쉽게 Node.js를 설치하는 것이 가능하다. bash를 지원하는 리눅스, 맥에서는 아래와 같이 설치가 가능하다.

  `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash`

  

   윈도우에서는 다음 링크에서 설치가 가능하다.

  https://github.com/coreybutler/nvm-windows
  



## 2. Node.js 의 특징

  - **Google V8 JavaScript 엔진**

  - **고성능 네트워크 서버**

  - **단일 쓰레드(Single Thread) 이벤트 루프(Event Loop) 기반**

  - **비동기 I/O 처리(Non-Blocking I/O)**

     쓰레드 기반 동기 방식(Blocking I/O) : 하나의 쓰레드가 request를 받으면 모든 처리가 완료될 때까지 기다리다가 처리 결과가 완료되면 다시 응답을 보내는 처리 방식. 기존 업무 처리 전에 request가 들어오면 새로운 쓰레드가 업무를 처리함. 동시에 많은 request 발생 시 많은 쓰레드를 필요로 해 서버 과부하가 발생한다.

     이에 반해 단일 쓰레드 이벤트 루프 기반의 비동기방식은 하나의 쓰레드가 request를 받으면 다음 처리에 요청을 보내고 다음 작업을 처리하다가, 먼저 요청한 작업이 끝나면 이벤트를 받아서 응답을 보냄.

  - **JavaScript 기반**

  - **개발 생산성 향상**

  - **NPM(Node Package Manager)을 이용한 방대한 모듈(Module) 제공**



## 3. Node.js의 장단점

- **장점**
  - **JavaScript를 사용해 Server 단 로직을 처리할 수 있어 새로운 언어 습득에 대한 부담 없이 서버 기술을 빠르게 개발 및 응용이 가능**
  - Non-Blocking I/O와 단일 쓰레드 이벤트 루프를 통한 높은 처리 성능
  - 이벤트 기반 비동기 방식이라 Server 부하가 적음
  - NPM(Node Package Manager)을 통한 다양한 모듈 제공
- **단점**
  - 이벤트 기반 비동기방식이기 떄문에 로직이 복잡한 경우 콜백함수를 다루는 데 문제가 생길 수 있음
  - 비동기 방식으로 이벤트를 보내고, 응답이 오면 처리하는 방식이기 때문에 동기 방식과 설계가 달라져야 함
  - **Single Thread 이기 때문에 하나의 작업 자체가 많이 걸리는 웹서비스에는 부적합**
  - 코드 수행 과정에서의 디버깅 과정에 어려움이 있음



## 4. 이런 웹 서비스에  Node.js를 사용하세요!!

- **로직이 간단한 서비스**
- **동시에 여러 request를 처리하는 과정이 필요한 서비스**
- **빠른 응답시간을 요구하는 서비스**
- 개발 시간이 촉박할 때
- 비동기 I/O 방식이 어울리는 서비스(네트워크 스트리밍, 채팅 서비스)



## 5. 아 여기서 Node.js는 좀...

- **단일 처리가 오래 걸리는 서비스(Single Thread이기 떄문)**
- 서버에서 수행되어야 하는 작업이 많은 경우(CallBack Hell에 빠질 우려가 큼)
- 업무 복잡도/난이도가 높은 경우, 에러 발생 시 서버가 죽기 때문에 코드 품질이 더욱 더 중요해짐.



## [ References ]

[node js 란? 어떤 웹서비스에 사용해야할까?](https://junspapa-itdev.tistory.com/3)

[Node.JS Use Case: When & How Node.JS Should be Used](https://www.simform.com/nodejs-use-case/)