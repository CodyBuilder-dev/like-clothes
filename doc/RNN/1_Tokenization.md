자연어 처리에서 크롤링 등으로 얻어낸 코퍼스 데이터가 필요에 맞게 전처리되지 않은 상태라면, 해당 데이터를 용도에 맞게 토큰화 & 정제 & 정규화하는 일을 해야 한다.

- 토큰화에 대한 설명

주어진 코퍼스에서 토큰이라 불리는 단위로 나누는 작업을 토큰화라고 한다. 토큰의 단위는 상황에 따라 다르지만, 보통 의미있는 단위로 토큰을 정의한다.

1. 단어 토큰화

   토큰의 기준을 단어로 하는 경우. 단어 단위 외에도 단어구, 의미를 갖는 문자열로 간주되기도 함. 

   **ex) 구두점(. , ? ; ! 등의 기호)과 같은 문자를 제외시켜보자**

   ```
   입력: Time is an illusion. Lunchtime double so!
   출력: "Time", "is", "an", "illustion", "Lunchtime", "double", "so"
   구두점을 지운 뒤에 띄어쓰기 기준으로 잘라낸 가장 기초적인 예제
   ```

   보통 토큰화 작업은 단순히 구두점이나 특수문자를 전부 제거하는 정제(cleaning) 작업을 수행하는 것만으로 해결되지 않는다. 구두점이나 특수문자를 전부 제거하면 토큰이 의미를 잃어버리는 경우가 발생하기도 한다. 심지어 띄어쓰기 단위로 자르면 사실상 단어 토큰이 구분되는 영어와 달리, 한국어는 띄어쓰기만으로는 단어 토큰을 구분하기 어렵다.

2. 토큰화 중 생기는 선택의 순간

   토큰화를 하다보면, 예상하지 못한 경우가 있어서 토큰화의 기준을 생각해봐야 하는 경우가 발생한다. 물론, 이러한 선택은 해당 데이터를 가지고 어떤 용도로 사용할 것인지에 따라, 그 용도에 영향이 없는 기준으로 정하면 된다. 

   **ex) Don't와 Jone's**

   ```python
   # NLTK - word_tokenize
   from nltk.tokenize import word_tokenize  
   print(word_tokenize("Don't"))
   
   ['Do', "n't"]
   ```

   ```python
   # NLTK - wordPunctTokenizer
   from nltk.tokenize import WordPunctTokenizer  
   print(WordPunctTokenizer().tokenize("Don't"))
   
   ['Don', "'", 't']
   ```

   ```python
   # Keras - text_to_word_sequence
   from tensorflow.keras.preprocessing.text import text_to_word_sequence
   print(text_to_word_sequence("Don't"))
   
   ["don't"]
   ```

3. 토큰화에서 고려해야할 사항

   1) 구두점이나 특수 문자를 단순 제외해서는 안 됨

   2) 줄임말과 단어 내에 띄어쓰기가 있는 경우

4. 문장 토큰화

   보통 갖고있는 코퍼스가 정제되지 않은 상태라면, 코퍼스는 문장 단위로 구분되어있지 않을 가능성이 높다. 이를 사용하고자 하는 용도에 맞게 하기 위해서는 문장 토큰화가 필요할 수 있다.

   ? . ! 기준으로 잘라내면 되지 않을까? ㅇㅇ안됭

   **ex1) IP 192.168.56.31 서버에 들어가서 로그 파일 저장해서 ukairia777@gmail.com로 결과 좀 보내줘. 그러고나서 점심 먹으러 가자.**

   **ex2) Since I'm actively looking for Ph.D. students, I get the same question a dozen times every year.**

   이런 경우 때문에, 사용하는 코퍼스가 어떤 국적의 언어인지 또는 해당 코퍼스 내에서 특수문자들이 어떻게 사용되고 있는지에 따라서 직접 규칙들을 정의해보아야한다. 그렇지만 갖고있는 코퍼스 데이터에 오타나, 문장의 구성이 엉망이라면 정해놓은 규칙이 소용이 없을 수도 있다.

   ```python
   # NLTK - sent_tokenize
   from nltk.tokenize import sent_tokenize
   text="His barber kept his word. But keeping such a huge secret to himself was driving him crazy. Finally, the barber went up a mountain and almost to the edge of a cliff. He dug a hole in the midst of some reeds. He looked about, to mae sure no one was near."
   print(sent_tokenize(text))
   
   ['His barber kept his word.', 'But keeping such a huge secret to himself was driving him crazy.', 'Finally, the barber went up a mountain and almost to the edge of a cliff.', 'He dug a hole in the midst of some reeds.', 'He looked about, to mae sure no one was near.']
   # 잘 분류해냄! 그렇다면 온점을 중간에 넣으면?
   
   text="I am actively looking for Ph.D. students. and you are a Ph.D student."
   print(sent_tokenize(text))
   
   ['I am actively looking for Ph.D. students.', 'and you are a Ph.D student.']
   # 단순 온점을 구분자로 하여 문장을 구분하지 않기 때문에, 성공적으로 Ph.D를 인식해냄
   ```

   한국어는 어떻게? KSS

   ```python
   # pip install kss (윈도우 지원X, 리눅스 or 구글 Colab 사용)
   import kss
   text='딥 러닝 자연어 처리가 재미있기는 합니다. 그런데 문제는 영어보다 한국어로 할 때 너무 어려워요. 농담아니에요. 이제 해보면 알걸요?'
   print(kss.split_sentences(text))
   
   ['딥 러닝 자연어 처리가 재미있기는 합니다.', '그런데 문제는 영어보다 한국어로 할 때 너무 어려워요.', '농담아니에요.', '이제 해보면 알걸요?']
   # 중간에 온점 들어간 예제는 이 글에는 없네염
   ```

5. 이진 분류기

   문장 토큰화에서의 예외 사항을 발생시키는 온점의 처리를 위해서 입력에 따라 두 개의 클래스로 분류하는 이진 분류기(binary classifier)를 사용하기도 한다.

   1) 온점(.)이 단어의 일부분일 경우. 즉, 온점이 약어(abbreivation)로 쓰이는 경우

   2) 온점(.)이 정말로 문장의 구분자(boundary)일 경우

   이진 분류기는 임의로 정한 여러가지 규칙을 코딩한 함수이거나, 머신러닝을 통해 구현함.

   어떤 온점이 주로 약어로 쓰이는 지 알아야 어떤 클래스에 속하는 지 결정할 수 있다. 그렇기 때문에 약어 사전이 유용하게 쓰인다.

   오픈 소스는 NLTK, OpenNLP, 스탠포드 CoreNLP, splitta, LingPipe 등

6. 한국어에서의 토큰화의 어려움

   1) 한국어는 형태소라는 개념을 이해해야 한다. 영어에서의 단어 토큰화와 유사한 형태를 얻으려면 어절이 아닌 형태소 토큰화가 필요하다.

   2) 한국어는 띄어쓰기가 영어보다 덜 지켜진다. 이유는 잘 띄어쓰지 않아도 글을 쉽게 이해할 수 있는 언어이기 때문에, 언어적 특성의 차이.

7. 품사 태깅

   **ex) 'fly' 동사:날다 / 명사:파리**

   단어 토큰화 과정에서 각 단어가 어떤 품사로 쓰였는지를 구분하는 작업

8. NLTK와 KoNLPy를 이용한 영어, 한국어 토큰화 실습

   ```python
   # NLTK - 위 예제에서 토큰화된 결과
   ['I', 'am', 'actively', 'looking', 'for', 'Ph.D.', 'students', '.', 'and', 'you', 'are', 'a', 'Ph.D.', 'student', '.']
   
   from nltk.tag import pos_tag
   x=word_tokenize(text)
   pos_tag(x)
   
   # 품사 태깅 결과
   [('I', 'PRP'), ('am', 'VBP'), ('actively', 'RB'), ('looking', 'VBG'), ('for', 'IN'), ('Ph.D.', 'NNP'), ('students', 'NNS'), ('.', '.'), ('and', 'CC'), ('you', 'PRP'), ('are', 'VBP'), ('a', 'DT'), ('Ph.D.', 'NNP'), ('student', 'NN'), ('.', '.')]
   ```

    한국어 형태소 토큰화

   ```python
   # KoNLPy - Okt 조사를 기본적으로 분리하고 있음
   from konlpy.tag import Okt  
   okt=Okt()  
   print(okt.morphs("열심히 코딩한 당신, 연휴에는 여행을 가봐요"))
   
   # 형태소 추출
   ['열심히', '코딩', '한', '당신', ',', '연휴', '에는', '여행', '을', '가봐요']
   
   print(okt.pos("열심히 코딩한 당신, 연휴에는 여행을 가봐요"))
   
   # 품사 태깅
   [('열심히','Adverb'), ('코딩', 'Noun'), ('한', 'Josa'), ('당신', 'Noun'), (',', 'Punctuation'), ('연휴', 'Noun'), ('에는', 'Josa'), ('여행', 'Noun'), ('을', 'Josa'), ('가봐요', 'Verb')]
   
   print(okt.nouns("열심히 코딩한 당신, 연휴에는 여행을 가봐요"))
   
   # 명사 추출
   ['코딩', '당신', '연휴', '여행']
   ```

   ```python
   # KoNLPy - Kkma
   from konlpy.tag import Kkma  
   kkma=Kkma()  
   print(kkma.morphs("열심히 코딩한 당신, 연휴에는 여행을 가봐요"))
   
   # 형태소 추출
   ['열심히', '코딩', '하', 'ㄴ', '당신', ',', '연휴', '에', '는', '여행', '을', '가보', '아요']
   
   print(kkma.pos("열심히 코딩한 당신, 연휴에는 여행을 가봐요"))
   
   # 품사 태깅
   [('열심히','MAG'), ('코딩', 'NNG'), ('하', 'XSV'), ('ㄴ', 'ETD'), ('당신', 'NP'), (',', 'SP'), ('연휴', 'NNG'), ('에', 'JKM'), ('는', 'JX'), ('여행', 'NNG'), ('을', 'JKO'), ('가보', 'VV'), ('아요', 'EFN')]
   
   print(kkma.nouns("열심히 코딩한 당신, 연휴에는 여행을 가봐요"))
   
   # 명사 추출
   ['코딩', '당신', '연휴', '여행']
   ```

   형태소 분석기 중 Mecab은 속도가 빠르다고 한다. 사용하고자 하는 필요 용도에 따라 골라 사용하면 되겠다.

9. [한국어 형태소 분석기 비교](./1-1_한국어 형태소 분석기 비교.md)

