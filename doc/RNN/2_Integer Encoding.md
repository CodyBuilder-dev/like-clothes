컴퓨터는 텍스트보다 숫자를 더 잘 처리할 수 있다. 이를 위해 자연어 처리에서 텍스트를 숫자로 바꾸는 여러가지 기법들이 있다. 이 기법들을 적용시키기 위한 첫 단계로 단어를 고유한 정수에 맵핑시키는 전처리 작업이 필요할 때가 있다. 예를 들어 500개의 단어가 있다면 단어에 고유한 인덱스를 부여하는 데 랜덤으로 부여하거나, 빈도수로 정렬 후 높은 단어부터 부여한다.

1. 정수 인코딩

   왜 이런 과정이 필요한 지는 원-핫 인코딩, 워드 임베딩 챕터에서 알아보자고 한다. 아래 원-핫 인코딩 파트에 정리해 두겠다.

   1) Python - dictionary 사용하기

   ```python
   "A barber is a person. a barber is good person. a barber is huge person. he Knew A Secret! The Secret He Kept is huge secret. ..."
   
   # 문장 토큰화 -> 단어 토큰화 후 모든 단어를 소문자화하고 불용어를 제거한다.
   [['barber', 'person'], ['barber', 'good', 'person'], ['barber', 'huge', 'person'], ['knew', 'secret'], ['secret', 'kept', 'huge', 'secret'] ... ]
   
   # 단어의 중복을 제거하고 빈도수를 기록한다. 빈도수가 높은 순서대로 정렬한다.
   [('barber', 8), ('secret', 6), ('huge', 5), ('kept', 4), ('person', 3),  ...]
   
   # 높은 빈도수를 가진 단어일수록 낮은 정수 인덱스를 부여한다. 빈도수가 낮은 단어(1)를 제외시킨다. 빈도수가 낮은 단어는 자연어 처리에서 의미를 가지지 않을 가능성이 높기 때문이다. 빈도수가 높은 상위 5개 단어만 사용해볼 것이다. 
   {'barber': 1, 'secret': 2, 'huge': 3, 'kept': 4, 'person': 5}
   ```

   이제 단어 토큰화가 된 상태로 sentences에 있는 단어를 정수로 바꿀 것이다. 예를 들어 첫 번째 문장인 ['barber', 'person']은 [1, 5]로 인코딩한다. 그런데 두 번째 문장인 ['barber', 'good', 'person']에는 빈도수가 낮아 dict에 존재하지 않는 단어인 'good'이 있다. 이처럼 단어 집합에 존재하지 않는 단어들을 Out-Of-Vocabulary(OOV)라고 한다. OOV를 키값으로 dict에 인코딩하겠다.

   ```python
   # 최종적으로 문장을 정수 인코딩했을 때 다음과 같다. OOV 값이 6이 된다.
   [[1, 5], [1, 6, 5], [1, 3, 5], [6, 2], [2, 4, 3, 2], [3, 2], [1, 4, 6], [1, 4, 6], [1, 4, 2], [6, 6, 3, 2, 6, 1, 6], [1, 6, 3, 6]]
   ```

   좀 더 쉽게 하기 위해서 Counter, FreqDist, enumerate 또는 케라스 토크나이저를 사용하는 것을 권장한다.

   2) Python - collections.Counter 사용하기

   ```python
   # 단어 토큰화 된 결과를 1차원 배열로 펼친다.
   words = ['barber', 'person', 'barber', 'good', 'person', 'barber', 'huge', 'person', 'knew', 'secret', ...]
   
   # 중복을 제거하고 단어의 빈도수를 기록
   vocab = Counter(words)
   print(vocab)
   
   Counter({'barber': 8, 'secret': 6, 'huge': 5, 'kept': 4, 'person': 3, 'word': 2, ...})
   
   # 빈도수 상위 5개만 저장
   vocab = vocab.most_common(5)
   print(vocab)
   
   [('barber', 8), ('secret', 6), ('huge', 5), ('kept', 4), ('person', 3)]
   
   # 정수 인덱스 부여하기
   ```

   3) NLTK - FreqDist 사용하기

   Python의 Counter()과 같은 방법으로 사용할 수 있다. 

   np.hstack - numpy의 배열 연결 함수: 행의 수가 같은 배열을 옆으로 연결하여 열의 수가 더 많은 배열로 만든다.

2. 케라스의 텍스트 전처리

   ```python
   from tensorflow.keras.preprocessing.text import Tokenizer
   
   tokenizer = Tokenizer()
   
   # 코퍼스를 입력으로 하면 빈도수를 기준으로 단어 집합을 생성한다.
   tokenizer.fit_on_texts(sentences)
   
   # 단어 인덱스가 어떻게 부여되었는지 확인
   print(tokenizer.word_index)
   
   # 단어 사용 횟수를 카운트하여 확인
   print(tokenizer.word_counts)
   
   # 정해진 인덱스로 변환
   print(tokenizer.texts_to_sequences(sentences))
   
   # 빈도수가 높은 상위 5개 단어 사용
   vocab_size = 5
   tokenizer = Tokenizer(num_words = vocab_size + 1)
   # num_words는 숫자를 0부터 카운트하기 때문에 +1을 해주어야 함, 이유는 자연어 처리에서 패딩이라는 작업 때문
   tokenizer.fit_on_texts(sentences)
   
   print(tokenizer.word_index)
   print(tokenizer.word_counts)
   # 이렇게 해도 상위 5개 말고 전체를 보여준다. 실제 적용은 아래와 같이 texts_to_sequences를 사용해야 한다.
   print(tokenizer.texts_to_sequences(sentences))
   ```

   케라스 토크나이저는 기본적으로 단어를 정수로 바꾸는 과정에서 OOV를 제거해버린다. 보존하고 싶다면 oov_token을 사용해야 한다.

   ```python
   vocab_size = 5
   tokenizer = Tokenizer(num_words = vocab_size + 2, oov_token = 'OOV')
   # 숫자 0과 OOV를 고려해서 단어 집합의 크기는 +2를 해주어야 함.
   tokenizer.fit_on_texts(sentences)
   # oov_token 사용 시 OOV의 인덱스는 1이다.
   ```

3. <추가> 원-핫 인코딩

   문자를 숫자로 바꾸는 기법 중 가장 기본적인 표현 방법이다. 먼저 단어 집합에 대해서 정의해보자. 

   **단어 집합**이란 서로 다른 단어들의 집합이다. 'book'과 'books'와 같은 단어의 변형 형태도 다른 단어로 간주한다. 

   텍스트의 단어 집합을 생성하고 고유한 숫자를 부여하는 정수 인코딩을 진행한다. 숫자로 바뀐 단어들을 벡터로 다루고 싶다.

   1) 원-핫 인코딩이란?

   단어 집합의 크기를 벡터의 차원으로 하고, 표현하고 싶은 단어의 인덱스에 1의 값을 부여하고, 다른 인덱스에는 0을 부여하는 단어의 벡터 표현 방식이다. 이렇게 표현된 벡터를 원-핫 벡터라고 한다.

   **ex) 문장: 나는 자연어 처리를 배운다**

   ```python
   # 토큰화
   token=okt.morphs("나는 자연어 처리를 배운다")
   ['나', '는', '자연어', '처리', '를', '배운다']
   
   # 인덱스 부여
   {'나': 0, '는': 1, '자연어': 2, '처리': 3, '를': 4, '배운다': 5}
   
   # 원-핫 벡터 생성 함수
   def one_hot_encoding(word, word2index):
       one_hot_vector = [0]*(len(word2index))
       index=word2index[word]
       one_hot_vector[index]=1
       return one_hot_vector
   
   one_hot_encoding("자연어",word2index)
   [0, 0, 1, 0, 0, 0]
   ```

   토큰 입력을 받아 해당 토큰에 대한 원-핫 벡터를 생성한다. "자연어"는 단어 집합에서 인덱스가 2이므로, 원-핫 벡터의 2인덱스 값이 1이며, 나머지 값은 0이다.

   2) 케라스를 이용한 원-핫 인코딩

   케라스에서는 to_categorical() 함수로 원-핫 인코딩을 쉽게 수행할 수 있다.

   ```python
   from tensorflow.keras.preprocessing.text import Tokenizer
   from tensorflow.keras.utils import to_categorical
   
   text="나랑 점심 먹으러 갈래 점심 메뉴는 햄버거 갈래 갈래 햄버거 최고야"
   t = Tokenizer()
   t.fit_on_texts([text])
   print(t.word_index) # 각 단어에 대한 인코딩 결과 출력
   
   {'갈래': 1, '점심': 2, '햄버거': 3, '나랑': 4, '먹으러': 5, '메뉴는': 6, '최고야': 7}
   ```

   t에 생성된 단어 집합에 있는 단어들로만 구성된 텍스트가 있다면, 정수 시퀀스로 변환이 가능하다.

   ```python
   sub_text="점심 먹으러 갈래 메뉴는 햄버거 최고야"
   encoded=t.texts_to_sequences([sub_text])[0]
   print(encoded)
   
   [2, 5, 1, 6, 3, 7]
   
   # 원-핫 인코딩
   one_hot = to_categorical(encoded)
   print(one_hot)
   
   [[0. 0. 1. 0. 0. 0. 0. 0.] #인덱스 2의 원-핫 벡터
    [0. 0. 0. 0. 0. 1. 0. 0.] #인덱스 5의 원-핫 벡터
    [0. 1. 0. 0. 0. 0. 0. 0.] #인덱스 1의 원-핫 벡터
    [0. 0. 0. 0. 0. 0. 1. 0.] #인덱스 6의 원-핫 벡터
    [0. 0. 0. 1. 0. 0. 0. 0.] #인덱스 3의 원-핫 벡터
    [0. 0. 0. 0. 0. 0. 0. 1.]] #인덱스 7의 원-핫 벡터
   ```

   3) 원-핫 인코딩의 한계

   - 단어의 개수가 늘어날수록, 벡터를 저장하기 위해 필요한 공간이 계속 늘어난다. 벡터의 차원이 계속 늘어난다고도 표현한다. 원-핫 벡터는 단어 집합의 크기가 곧 벡터의 차원 수가 된다. 이는 저장 공간 측면에서 매우 비효율적인 표현 방법이다.
   - 단어의 유사도를 표현하지 못한다. 늑대, 호랑이, 강아지, 고양이를 원-핫 인코딩해서 각각 [1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]를 부여받는다. 유사도를 표현할 수가 없다. 단어 간 유사성을 알 수 없는 것은 검색 시스템 등에서 심각한 문제이다. 연관 검색어를 보여줄 수 없다. 이러한 단점을 해결하기 위해 단어의 잠재 의미를 반영하여 다차원 공간에 벡터화 하는 기법으로 1. 카운트 기반의 벡터화 방법 LSA,HAL 과 2. 예측 기반 벡터화 방법 NNLM, RNNLM, Word2Vec, FastText 와 3. 카운트와 예측 기반 모두 사용하는 GloVe 라는 방법이 존재한다.

   4) 원-핫 해싱

   * 단어 집합의 고유 토큰 수가 너무 커서 모두 다루기 어려울 때 사용한다.
   * 단어(key)를 value값으로 해싱하여 고정된 크기의 벡터로 변환
   * 명시적인 단어 인덱스가 필요없기 때문에 메모리 절약이 가능, 전체 데이터를 확인하지 않고 토큰 생성이 가능(바로 데이터 조회 가능)
   * 해시 충돌이 발생할 수 있음