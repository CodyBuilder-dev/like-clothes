# AI- 의상 추천 서버
![](ai-server/image.PNG)

## 의상 추천 원리
CNN 통한 feature 추출 - Content based filtering

## AI-Server 프로젝트 구조
    ai-server
    ├── controller : 라우팅에 사용되는 utils
    ├── data : train/test에 사용되는 데이터
    │   ├── test
    │   └── test
    ├── models : pretrained models
    │   ├── keras_pretrained
    │   └── resnet50
    ├── prep : 전처리를 거쳐 저장된 data
    ├── research : 기능 구현 테스트용 jupyter notebooks
    ├── templates : flask template
    ├── app.py : flask app
    ├── requirements.txt : python dependency
    └── README.md

## 실행방법
### 가상환경 생성
    cd ~
    python3 -m virtualenv ai-venv python=3.7
    
### 가상환경 실행
    cd ~
    source ai-venv/bin/activate
python app.py

### Dependency 설치
    cd ai-server
    pip install -r requirements.txt

### 서버 구종
    python app.py

### 접속 확인
    52.78.119.248:5000/ai-server