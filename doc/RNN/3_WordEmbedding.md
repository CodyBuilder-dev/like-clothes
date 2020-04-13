### 기본 배경 조사

- 텍스트는 가장 흔한 시퀀스의 형태. 보통은 단어 수준으로 작업

- 텍스트를 이해하는 것이 아닌 ***통계적 구조***를 통해 문제 해결

- 모든 신경망과 마찬가지로 전처리를 통해 입력할 수 있는 데이터 형태로 변환 필요

- 텍스트를 수치형 텐서로 변환하는 과정을 

  *텍스트 벡터화(Vectorizing Text)*

  - 텍스트를 단어로 나누고 각 단어를 하나의 벡터로 변환
  - 텍스트를 문자로 나누고 각 문자를 하나의 벡터로 변환
  - 텍스트에서 단어나 문자의 **n-gram**을 추출하여 각 n-gram을 하나의 벡터로 변환. n-gram은 연속된 단어나 문자의 그룹으로, 텍스트에서 단어나 문자를 하나씩 이동하면서 추출

- 토큰(token) : 텍스트를 나누는 단위

- 토큰화(tokenizer) : 텍스트를 토큰으로 나누는 것

- 텍스트 데이터는 이런 토큰화를 적용하고, 수치형 벡터에 연결하는 작업이 필요.

  - 원-핫 인코딩(one-hot encoding)
  - 워드 임베딩(word embedding)



## 임베딩

[임베딩 공부 링크](https://subinium.github.io/Keras-6-1/)

### 워드 임베딩(Word Embedding)이란?
→*`단어`*를 *`벡터`*로 표현 하는 것

- 밀집 단어를 사용
- 원-핫 인코딩은  희소하고 고차원의 벡터를 만들지만, 단어 임베딩은 저차원의 실수형 벡터를 사용
- 단어 임베딩은 데이터로부터 학습
- 보통 256, 512, 1024 차원의 단어 임베딩(원-핫 인코딩은 2만 차원 또는 그 이상의 벡터인 경우가 많음. 즉, 단어 임베딩이 더 많은 정보를 적은 차원에 저장)
- 만드는 방법
  - 관심 대상인 문제와 함께 단어 임베딩을 학습 - 랜덤한 단어 벡터로 시작해서 신경망의 가중치를 학습하는 것과 같은 방식으로 단어 벡터를 학습
  - 다른 머신 러닝 작업에서 미리 계산된 단어 임베딩을 로드(사전 훈련된 단어 임베딩(oretrained word embedding))



### Embedding 층을 사용하여 단어 임베딩 학습하기

단어와 밀집 벡터를 연관 짓는 **가장 간단한 방법은 랜덤하게 벡터를 선택하는 것**입니다. 이 방식의 문제점은 *임베딩 공간이 구조적이지 않다*는 것입니다. *의미 관계가 유사하더라도 완전 다른 임베딩*을 가집니다. 그렇기에 단어 사이에 있는 **의미 관계를 반영하여 임베딩을 진행**해야 합니다.

![img](https://www.researchgate.net/profile/Venkatesh_Saligrama/publication/304163868/figure/fig1/AS:375256100425729@1466479434837/Comparison-of-gender-bias-of-profession-words-across-two-embeddings-word2vec-trained-on.png)구글링해서 가져온 예시

단어 임베딩은 **언어를 기하학적 공간에 매핑하는 것**입니다. 일반적으로 두 단어 벡터 사이의 거리(L2 거리)는 이 단어 사이의 의미 거리와 관계되어 있습니다. 거리 외에 임베딩 공간의 특정 방향도 의미를 가질 수 있습니다.

**의미있는 기하학적 변환의 예시**는 성별, 복수(plural)과 같은 벡터가 있습니다. (‘king’ + ‘female’ => ‘queen’) 단어 임베딩 공간은 전형적으로 이런 해석 가능하고 잠재적으로 유용한 수천 개의 벡터를 특성으로 가집니다.

하지만 **사람의 언어를 완벽하게 매핑해서 이상적인 단어 임베딩 공간을 만들기는 어렵습니다.** 언어끼리도 **종류가 많고** 언어는 **특정 문화와 환경을 반영**하기 때문에 서로 동일하지 않습니다. 그렇기에 **각 언어와 상황에 따라 임베딩 공간을 학습하는 것이 타당**합니다.

이를 역전파 + 케라스를 이용해서 `Embedding` 층을 학습할 수 있습니다.

```python
# 코드 6-5 Embedding층의 객체 생성하기

from keras.layers import Embedding

# Embedding 층은 적어도 두 개의 매개변수를 받습니다.
# 가능한 토큰의 개수(여기서는 1,000으로 단어 인덱스 최댓값 + 1입니다)와 임베딩 차원(여기서는 64)입니다
# 인덱스는 0을 사용하지 않으므로 단어 인덱스는 1~999사이의 정수입니다
embedding_layer = Embedding(1000, 64)
```

`Embedding` 층을 정수 인덱스를 밀집 벡터로 매핑하는 딕셔너리로 이해하는 것이 좋습니다. 정수를 입력으로 받아 내부 딕셔너리에서 이 정수에 연관된 벡터를 찾아 반환합니다. 딕셔너리 탐색은 효율적으로 수행됩니다. (텐서플로 백엔드에서는 tf.nn.embedding_lookup()함수를 사용하여 병렬 처리)

단어 인덱스 -> Embdding 층 -> 연관된 단어 벡터

`Embedding` 층은 크기가 `(samples, sequences_length)`인 2D 정수 텐서를 입력으로 받습니다. 각 샘플은 정수의 시퀀스입니다. 가변 길이의 경우, 제로패딩 또는 자름으로 크기를 맞춥니다.

`Embedding` 층은 크기가 `(samples, sequences_length, embedding_dimensionality)`인 3D 정수 텐서를 반환합니다. 이런 3D 텐서는 RNN 층이나 1D 합성곱 층에서 처리됩니다.

객체를 생성할 때 가중치는 다른 층과 마찬가지로 랜덤으로 초기화됩니다. 훈련하면서 이 단어 벡터는 역전파를 통해 점차 조정되어 이어지는 모델이 사용할 수 있도록 임베딩 공간을 구성합니다. 훈련이 끝나면 임베딩 공간은 특정 문제에 특화된 구조를 가지게 됩니다.

이제 이를 IMDB 영화 리뷰 감성 예측 문제에 적용합니다.

- 빈도 높은 10000단어를 추출하고 리뷰에서 20개 단어 이후는 버림
- 8차원 임베딩
- 정수 시퀸스 입력을 임베딩 시퀀스로 바꿈 (2D -> 3D)
- 2D로 펼쳐 분류를 위한 Dense층 훈련

```
# 코드 6-6 Embedding 층에 사용할 IMDB 데이터 로드하기
# 코드 6-7 IMDB 데이터에 Embedding 층과 분류기 사용하기
from keras.datasets import imdb
from keras import preprocessing

# 특성으로 사용할 단어의 수
max_features = 10000
# 사용할 텍스트의 길이(가장 빈번한 max_features 개의 단어만 사용합니다)
maxlen = 20

# 정수 리스트로 데이터를 로드합니다.
(x_train, y_train), (x_test, y_test) = imdb.load_data(num_words=max_features)

# 리스트를 (samples, maxlen) 크기의 2D 정수 텐서로 변환합니다.
x_train = preprocessing.sequence.pad_sequences(x_train, maxlen=maxlen)
x_test = preprocessing.sequence.pad_sequences(x_test, maxlen=maxlen)

from keras.models import Sequential
from keras.layers import Flatten, Dense, Embedding

model = Sequential()
# 나중에 임베딩된 입력을 Flatten 층에서 펼치기 위해 Embedding 층에 input_length를 지정합니다.
model.add(Embedding(10000, 8, input_length=maxlen))
# Embedding 층의 출력 크기는 (samples, maxlen, 8)가 됩니다.

# 3D 임베딩 텐서를 (samples, maxlen * 8) 크기의 2D 텐서로 펼칩니다.
model.add(Flatten())

# 분류기를 추가합니다.
model.add(Dense(1, activation='sigmoid'))
model.compile(optimizer='rmsprop', loss='binary_crossentropy', metrics=['acc'])
model.summary()

history = model.fit(x_train, y_train,
                    epochs=10,
                    batch_size=32,
                    validation_split=0.2)
```

각 에포크당 2초정도 소모되었습니다. 약 74~75%의 검증 정확도를 가집니다. 하지만 여기서는 단어를 독립적으로 다뤘고, 단어 사이의 관계 그리고 문장 구조는 무시하였습니다.

각 시퀀스 전체를 고려한 특성을 학습하도록 임베딩 층 위에 순환 층이나 1D 합성곱 층을 추가하는 것이 좋습니다. 다음 절에서 이에 관해 다룹니다.

#### 사전 훈련된 단어 임베딩 사용하기

컨브넷과 마찬가지로 사전 훈련된 단어 임베딩을 사용할 수 있습니다. 데이터가 적을 때 매우 유용합니다. 단어 임베딩은 일반적으로 단어 출현 통계를 사용하여 계산합니다. 신경망을 사용하는 것도 있고 그렇지 않은 방법도 존재합니다. 단어를 위해 밀집된 저차원 임베딩 공간을 비지도 학습 방법으로 계산하는 방법도 연구되고 있습니다.

- [**Word2Vec**](https://wikidocs.net/22660) : 성공적인 단어 임베딩 방법으로 **성별처럼 구체적인 의미가 있는 속성**을 잡아 냄
-  [**GloVe**](https://wikidocs.net/22885) : 스탠포드에서 개발한 이 기법은 동시 출현 통계를 기록한 행렬을 분해하는 기법을 사용합니다. 이 개발자들은 위키피디아 데이터와 커먼 크롤 데이터에서 가져온 수백만 개의 영어 토큰에 대해서 임베딩을 계산했습니다. [다음 절](https://subinium.github.io/Keras-6-1/)에서 GloVe 임베딩을 케라스 모델에 적용해봅시다.



[임베딩 예제 따라하기](https://wikidocs.net/33793)