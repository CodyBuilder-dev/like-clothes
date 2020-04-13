# MCJ Git Conventions

---

## 1. Introduction

![](./SourceImages/Github.png)

Git 과 같은 협업 툴을 이용하면서, 팀에서 원활한 코드 관리를 위한 commit 정책은 필수가 되었다. 그래서 Commit, Branch, Merge 등의 정책을 정해서 협업에 도움을 주고자 한다.



## 2. Commit Issue

Git commit 정책은 [Angular Git Commit Conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)를 바탕으로 한다. 이 내용은 다음과 같다.

>- __Feat (feature)__
>
>  새로운 내용 추가, 즉, Jira Issue Task 수행과 직결되는 내용의 추가에 대해서 **Feat** 태그를 쓰도록 한다.
>
>- __Fix (bug fix)__ - 버그 수정
>
>- __Docs (documentation)__ - 문서 추가, 문서 수정
>
>- __Style (formatting, missing semi colons, …)__
>
>  코드 포맷팅, 세미콜론 누락 등, 코드 자체의 변경이 없는 경우에 **Style** 태그를 쓰도록 한다.
>
>- __Refactor (Refactor)__
>
>  코드 리팩토링, 코드의 기능은 변하지 않지만 코드의 구조가 바뀌었을 때, **Refactor** 태그를 쓰도록 한다.
>
>- __Test (when adding missing tests)__ - 테스트 내용 추가
>
>- __Chore (maintain)__
>
>  코드 관리, 구조 변경 등의 이슈 발생 시 **Chore** 태그를 쓰도록 한다.
>

Commit 형식은 다음과 같다.

- `git commit -m "[Feat] <Message>, <Jira Key>"`
- Jira Key 1개 당 Commit message 1개를 원칙으로 한다.
- Commit message는 50자를 초과하지 않도록 한다.



## 3. Branch

![](./SourceImages/GitFlow_with_Releasing_Number.jpg)

Git repository를 구성하는 Branch는 다음과 같이 정해진다.

>- __Master__ : 제품으로 출시될 수 있는 Branch
>- __Hotfix__ : 제품에서 발생한 버그를 수정하는 Branch
>- __Release__ : 이번에 출시될 버전을 준비하는 Branch
>- __Develop__ : 다음에 출시될 버전을 개발하는 Branch
>- __Feature__ : Develop의 하위 Branch로, 기능을 개발하는 Branch



## 3-1. Feature Branch

Branch는 위와 같이 관리되며, Feature Branch의 생성 규칙은 다음과 같다.

- Naming 규칙은 다음과 같다.

  `feature-<AI front back>-<Action or Category>`

- Action, Category 부분은 추상적이지 않게, 기능을 명시하는 방향으로 기술한다.

- Ex) feature-AI-cnnlayer 와 같은 형식으로 Branch Name을 구성한다.



## 3-2. Branch commands (추후 추가)

(추후 수정)

## 3-3. Release

제품의 Release는 매주 금요일 진행되며, 버전 관리는 추가 기능의 중요도 여부와 프로젝트의 수행 정도에 따라 이루어진다.



## 3-4. Merge

- Merge 작업은 1개의 Branch의 작업 완료 단계에 수행되며, Merge message 형식은 아래과 같이 통일한다.

   `<Merged Branch> to <Target Branch>`

  

## 4. Git Command (추후 추가)

(추후 수정)



### [  참고  ]

[우아한형제들 기술 블로그]

https://woowabros.github.io/experience/2017/10/30/baemin-mobile-git-branch-strategy.html

[Angular Git Commit Message Conventions]

https://gist.github.com/stephenparish/9941e89d80e2bc58a153