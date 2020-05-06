# AI- 의상 추천 서버
![](ai-server/image.PNG)

## 의상 추천 원리
**유사도기반 의류 추천**  
CNN 통해 의류 feature 추출 → Content based filtering
→ 가장 유사도가 높은 의류를 추천

**세트 의류 추천**  
카테고리 기반 Attribute Matrix 생성 → 카테고리에 가장 잘 어울리는 set 추천

## AI-Server 프로젝트 구조
    ai-server
    ├── controller : 라우팅/동작에 사용되는 utility functions
    ├── data : train/test에 사용되는 데이터
    │   ├── test
    │   └── test
    ├── prep_data : 모델에 맞게 전처리되어 저장된 데이터
    ├── models : pretrained models
    │   ├── keras_pretrained
    │   └── resnet50
    ├── research : 기능 테스트용 jupyter notebooks
    ├── templates : flask template
    ├── app.py : flask app
    ├── requirements.txt : python dependency
    └── README.md

## 실행방법
### 가상환경 생성
    cd ~
    python3 -m virtualenv ai-venv python=3.7
    
### 가상환경 실행
***Linux***

    source ai-venv/bin/activate

***Windows***

    ai-venv\Scripts\activate

### Dependency 설치
    cd ai-server
    pip install -r requirements.txt

### 서버 구종
    python app.py

### 접속 확인
***유사도기반 의류 추천 시스템***
    http://52.78.119.248:5000/ai-server/recommand/clothes-feature

***세트 의류 추천 시스템***
    http://52.78.119.248:5000/ai-server/recommand/clothes-set