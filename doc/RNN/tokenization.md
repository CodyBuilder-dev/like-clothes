# RNN

## Tokenization

word Tokenization

=> 단어로 짜르게 되면 영어는 가능하나 한국어는 안된다 .

종류가 많다. '와 같은 아포스트로피를 제외하느냐 아니면 합치는냐 등등이 있다. 

**from** nltk.tokenize **import** WordPunctTokenizer  

**from** nltk.tokenize **import** word_tokenize  

**from** tensorflow.keras.preprocessing.text **import** text_to_word_sequence



주의해야 할 점

1. 구두점이나 특수 문자를 단순 제외해서는 안된다. 
2. 줄임말과 단어 내에 띄어쓰기가 있는 경우



표준 토큰화 Penn Treebank Tokenization

**import** kss



## **품사 태깅(Part-of-speech tagging)**

단어의 표기는 같지만, 품사에 따라서 의미가 달라지기도 한다. 예를 들어 영어 단어 'fly'는 동사로 '날다'라는 의미를 갖지만, 명사로는 '파리'라는 의미를 갖는다.



앞서 사용한 Okt 형태소 분석기와 결과가 다른 것을 볼 수 있습니다. 각 형태소 분석기는 성능과 결과가 다르게 나오기 때문에, 형태소 분석기의 선택은 사용하고자 하는 필요 용도에 어떤 형태소 분석기가 가장 적절한지를 판단하고 사용하면 됩니다. 예를 들어서 속도를 중시한다면 메캅을 사용할 수 있습니다.

