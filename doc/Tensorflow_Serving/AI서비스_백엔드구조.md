# AI웹서비스 백엔드 구조
웹서비스에 텐서플로우,케라스 등의 머신러닝 AI 라이브러리를 도입할 경우, 백엔드 구조를 어떤 식으로 가져갈 수 있는지 살펴보고 각자의 장단점을 간단히 살펴보자

## 백엔드 서버와 AI를 통합
### Backend without TF Serving
구조 : ![](doc/Image/ai_archi1.png)  
장점 : 
1. 비교적 쉬운 구현난이도
2. 프로젝트 규모가 작을 경우 관리가 용이  

단점 : 
1. Data preprocessing/AI Evaluation을 Backend 서버 내에서 모두 처리하므로 서버 부하 매우 큼  
2. 백엔드 프레임워크가 python으로 강제되고, python 프레임워크가 아닐 경우 전처리 난이도 상승
3. AI 모델에서 발생한 Error가 백엔드 서버 내로 전파
4. 확장성, 유연성 측면에서 불리

## 백엔드 서버와 AI를 분리
### Backend with TF Serving
구조 : ![](doc/Image/ai_archi2.png)  
장점 :  
1. 확장성, 유연성, 유지보수성 측면에서 모두 우수  
2. 대부분의 상용서비스에서 채택하는 구조로, AWS등의 클라우드 서비스와 쉬운 연동  
3. gRPC, Protobuf 등의 AI를 위한 프로토콜 적용 가능

단점 :  
1. 사실상 백엔드를 2개 구성하는 형태이므로 작업량 증가  

