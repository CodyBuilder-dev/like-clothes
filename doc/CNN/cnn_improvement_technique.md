# :strawberry:  뉴널 네트워크 성능 향상을 위한 기법 

## 🤔 오버피팅이 의심이 의심된다면

- 트레이닝 데이터셋 늘리기 :star:

- 모델의 복잡도 줄이기 :star:

- 모델 복잡도에 페널티 주기

  



## :train: 트레이닝 데이터셋 늘리기

데이터 부풀리기(data aurgmentation) 을 사용하여 여러 데이터로 늘리기



## :red_car: 모델의 복잡도 줄이기

### Activation Func 최적화

- #### Activation Func란?

  입력신호의 총합을 출력신호로 변환
  
  은닝칭이 깊어지는 효과를 위해서는 비선형함수를 사용해야 함

---

### Activation Func

- sigmoid
- ReLU
- Leaky LeLU
- ELU

---

#### Sigmoid

<a href="https://www.codecogs.com/eqnedit.php?latex=h(x)&space;=&space;\frac{1}{1&space;&plus;&space;exp(-x)}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?h(x)&space;=&space;\frac{1}{1&space;&plus;&space;exp(-x)}" title="h(x) = \frac{1}{1 + exp(-x)}" /></a>

> ####  장점
>
> - 연속 함수(매끈함이 신경망 학습에 아주 중요함)
>
> #### 단점
>
> - 계산이 복잡(지수함수 계산)
> - 활성화함수 결과 중심이 0이 아님(0.5임)
>   - 한 노드에 대해 모든 파라미터w의 미분값은 모두 같은 부호를 띈다. 따라서 같은 방향으로 update되는데 이러한 과정은 학습을 지그재그형태로 만들어 느리게 만드는 원인이됨
> - 그라이언트가 죽는 현상(gradient vanishing)
>   - 양 극단 미분값이 0에 가깝기 때문에 발생
>   - 뒤쪽의 layer가 saturation되면  앞의 모든 layer도 포화되어 가중치 업데이트 중지
>   - 은닉층 4단 5단 이상부터는 초기화가 거의 되지 않는다.



#### ReLU

<a href="https://www.codecogs.com/eqnedit.php?latex=h(x)&space;=&space;max(0,&space;x)" target="_blank"><img src="https://latex.codecogs.com/gif.latex?h(x)&space;=&space;max(0,&space;x)" title="h(x) = max(0, x)" /></a>

> #### 장점
>
> - 양 극단이 포화되지 않음
> - 계산이 매우 효율적
> - 수렴속도가 시그모이드류 함수 대비 6배 빠름
>
> #### 단점
>
> - 입력값이 음수인 경우 항상 0을 출력



#### Leaky ReLU

max(0.1x, x)

> ReLU가 음수에서 항상 0이 나오는 문제를 해결



#### ELU

max(alpha* (exp(x)-1), x)

> ReLU가 음수에서 항상 0이 나오는 문제를 해결

---

### 출력층 Activation Func

#### softmax

<a href="https://www.codecogs.com/eqnedit.php?latex=y_k&space;=&space;\frac{exp(a_k)}{\sum_{i=1}^{n}exp(a_i)}" target="_blank"><img src="https://latex.codecogs.com/gif.latex?y_k&space;=&space;\frac{exp(a_k)}{\sum_{i=1}^{n}exp(a_i)}" title="y_k = \frac{exp(a_k)}{\sum_{i=1}^{n}exp(a_i)}" /></a>

> #### 장점
>
> - 클래스를 분류할때, 점수 벡터를 클래스별 **확률**로 해석하고 **분류**할 수 있음
> - 각 점수 벡테에 지수를 취한 후, 정규호 상수로 나누어 총 합이 1이 됨

---

### :full_moon_with_face: Activation Func에 따른 하이퍼 파라미터 적용

#### 	Bayesian Optimization 

- 너무 복잡..! 시간도 오래걸린다.

#### 	Xivar Optimization

- 정규분포에 따른 것. 전 레이어 파라미터의 개수를 가지고 분산을 정함

- sigmoid류 함수를 사용할 때 좋다!

#### 	He Optimization

- relu함수를 사용할 때 좋다.



---

### Loss Func 최적화

**평균제곱오차(MSE)**

<a href="https://www.codecogs.com/eqnedit.php?latex=E&space;=&space;\frac{1}{2}\sum_{k}{}(y_k-t_k)^2" target="_blank"><img src="https://latex.codecogs.com/gif.latex?E&space;=&space;\frac{1}{2}\sum_{k}{}(y_k-t_k)^2" title="E = \frac{1}{2}\sum_{k}{}(y_k-t_k)^2" /></a>

- 결과가 멀어지는 제곱으로 손실값이 더 커져서 오차를 파악하기 좋음

**교차 엔트로피 오차**(CEE)

<a href="https://www.codecogs.com/eqnedit.php?latex=E&space;=&space;-\sum_{k}{}t_kln(y_k)" target="_blank"><img src="https://latex.codecogs.com/gif.latex?E&space;=&space;-\sum_{k}{}t_kln(y_k)" title="E = -\sum_{k}{}t_kln(y_k)" /></a>

- 출력값이 원핫 인코딩일때만 사용 가능
- log함수 특성상 정답으로 멀어지면 cost를 엄청 준다.
- 예측값이 0에 수렴하면 로그값이 무한대가 됨(그래서 1e-07을 분모에 더해줌)
- CEE를 사용하려면 입력이 0~1이 좋ㅇ다. 그러므로 가장 마지막 전단계에서 시그모이드류 함수를 사용



## :electric_plug: 모델 복잡도에 페널티 주기

### Normalization

#### 	Preprocessing normalization

- 입력 데이터를 평균으로 빼고 분산으로 나누기
- 이러면 가중치 초기화에 따른 영향이 적어짐
- 또한 그라이언트 배니싱 같은 문제를 어느정도 해결할 수 있음.

#### 	Batch normalization

- 입력 데이터를 평균으로 빼고 분산으로 나누기
- 이러면 가중치 초기화에 따른 영향이 적어짐
- 또한 그라이언트 배니싱 같은 문제를 어느정도 해결할 수 있음.

#### 	L1 규제

#### 	L2 규제


haha
