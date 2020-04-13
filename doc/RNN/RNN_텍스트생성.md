## RNN을 이용한 텍스트 생성
RNN을 이용해서, 문장 데이터를 학습해 텍스트 생성을 수행하는 네트워크를 만들 수 있다.  
구조는 아래와 같다.  
![](rnn_text.png)  
`train data : 문장의 일부분`  
`label data : 문장의 다음에 오는 단어`


## 코드
해당 작업을 수행한 코드는 아래에 있다
[jupyter notebook](rnn-text-generation.ipynb)