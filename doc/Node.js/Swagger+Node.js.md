# **Swagger + Node.js**

---

## 1. Swagger

![](../../Images/Swagger.png){: width="500" height="500"}

 **Swagger** 는 Backend 와 Frontend 사이에서 어떤 방식으로 데이터를 받을지에 대한 API 명세서를 관리할 수 있는 도구이다.

 [Swagger Hub](https://swagger.io/tools/swaggerhub/) 에서 가입 후에 사용할 수 있다. 또한 Swagger에 등록한 API는 [jsonplaceholder](https://jsonplaceholder.typicode.com/) 를 이용해 확인할 수 있다.



## 2. Swagger 설치

`yarn add swagger-jsdoc swagger-ui-express`

`npm install swagger-jsdoc swagger-ui-express`



## 3. Node.js 에 Swagger 적용

```javascript
// app.js

import swagger from './swaggerSetting.js'

app.use(swagger);
```

```javascript
// swaggerSetting.js

import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import express from 'express'

const router = express.Router();

const options = {
    // API 문서 설정
    swaggerDefinition: {
        info: { // API informations (required)
            title : 'AI_Project', // Title (required)
            version: '1.0.0', // Version (required)
            description: 'Swagger for API Management' // Description (optional)
        },
        host: 'localhost:8000', // Host (optional)
        basePath: '/', // Base path (optional)

        // securityDefinitions: {
        //     jwt: {
        //       type: 'apiKey',
        //       name: 'Authorization',
        //       in: 'header'
        //     }
        // },
        // security: [
        //     { jwt: [] }
        // ]
    },

    // Swagger API가 존재하는 곳, 파일에 들어간 주석을 분석한다.
    apis: ['./controllers/*.js']
};

const swaggerSpec = swaggerJsdoc(options);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
```

```javascript
// board.js (게시판 CRUD 예시)

import express from 'express';
import db from '../models';

const router = express.Router();

/**
 * @swagger
 * definitions:
 *  boardItem:
 *   type: object
 *   required:
 *     - boardTitle
 *     - boardContent
 *     - boardState
 *     - boardType
 *   properties:
 *     id:
 *       type: integer
 *       description: ObjectId
 *     boardTitle:
 *       type: string
 *       description: 게시글 제목
 *     boardContent:
 *       type: string
 *       description: 게시글 내용
 *     boardState:
 *       type: boolean
 *       description: 게시글 숨김상태여부
 *     boardType:
 *       type: string
 *       description: 게시글 타입
 */

/**
 * @swagger
 *  /boards:
 *    get:
 *      tags:
 *      - board
 *      description: 모든 게시글을 가져온다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      responses:
 *       200:
 *        description: board of column list
 *        schema:
 *          type: array
 *          items:
 *           $ref: '#/definitions/boardItem'
 */
router.get('/boards', async(req, res) => {
    const board = await db.board.findAll({});

    return res.json(board);
});

/**
 * @swagger
 *  /boards/:id:
 *    get:
 *      tags:
 *      - board
 *      description: 지정된 게시글을 가져온다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      responses:
 *       200:
 *        description: board of selected id column list
 *        schema:
 *          type: array
 *          items:
 *           $ref: '#/definitions/boardItem'
 */
router.get('/boards/:id', async(req, res) => {
    const board = await db.board.findOne({
        where: {id: req.params.id}
    });

    return res.json(board);
});

/**
 * @swagger
 *  /boards/:id:
 *    post:
 *      tags:
 *      - board
 *      description: 게시글을 수정한다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: boardTtile
 *        in: body
 *        description: "게시글 제목"
 *        required: true
 *        type: string
 *      - name: boardContent
 *        in: body
 *        description: "게시글 내용"
 *        required: true
 *        type: string
 *      - name: boardState
 *        in: body
 *        description: "게시글 상태"
 *        required: true
 *        type: boolean
 *      - name: boardType
 *        in: body
 *        description: "게시글 타입"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: board of selected id column list
 *        schema:
 *          type: array
 *          items:
 *           $ref: '#/definitions/boardItem'
 */
router.post('/boards/:id', async(req, res) => {
    const data = {
        boardTitle: req.body.boardTitle,
        boardContent: req.body.boardContent,
        boardState: req.body.boardState,
        boardType: req.body.boardType,
    };
    
    const board = await db.board.update(data, {
        where: {id: req.params.id}
    });

    return res.json(board);
});

/**
 * @swagger
 *  /boards:
 *    put:
 *      tags:
 *      - board
 *      description: 게시글을 추가한다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: boardTtile
 *        in: body
 *        description: "게시글 제목"
 *        required: true
 *        type: string
 *      - name: boardContent
 *        in: body
 *        description: "게시글 내용"
 *        required: true
 *        type: string
 *      - name: boardState
 *        in: body
 *        description: "게시글 상태"
 *        required: true
 *        type: boolean
 *      - name: boardType
 *        in: body
 *        description: "게시글 타입"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: add board column list
 *        schema:
 *          type: array
 *          items:
 *           $ref: '#/definitions/boardItem'
 */
router.put('/boards', async(req, res) => {
    const board = await db.board.create({
        boardTitle: req.body.boardTitle,
        boardContent: req.body.boardContent,
        boardState: req.body.boardState,
        boardType: req.body.boardType,
    });

    return res.json(board);
});

/**
 * @swagger
 *  /boards/:id:
 *    delete:
 *      tags:
 *      - board
 *      description: 지정된 게시글을 삭제한다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      responses:
 *       200:
 *        description: board of selected id column list
 *        schema:
 *          type: boolean
 *          items:
 *           ref: 'true'
 */
router.delete('/boards/:id', async(req, res) => {
    const board = await db.board.destroy({
        where: {id: req.params.id},
    });

    return res.json(board);
});

export default router;
```



## 4. Express + Swagger

<iframe width="100%" height="500" src="https://www.youtube.com/embed/CE01dwNEkEU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>



## 5. Swagger Form

```javascript
/**
 * @swagger
 *  /boards/:id:
 *    post:
 *      tags:
 *      - board
 *      description: 게시글을 수정한다.
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: boardTtile
 *        in: body
 *        description: "게시글 제목"
 *        required: true
 *        type: string
 *      - name: boardContent
 *        in: body
 *        description: "게시글 내용"
 *        required: true
 *        type: string
 *      - name: boardState
 *        in: body
 *        description: "게시글 상태"
 *        required: true
 *        type: boolean
 *      - name: boardType
 *        in: body
 *        description: "게시글 타입"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: board of selected id column list
 *        schema:
 *          type: array
 *          items:
 *           $ref: '#/definitions/boardItem'
 */

/*
@swagger
	- swagger를 입력하면 그 부분부터 파싱
/boards/:id:
	- route 입력
post:
	- 데이터의 전송 방식
tags:
	- 해당하는 API 의 Tag 지정
description:
	- API description 입력
produces:
	- Parameter content type을 입력(applicaion/json)
parameters:
	- API Parameter 입력
    
- name: boardTitle
  in: body
  description: "게시글 제목"
  required: true
  type: string
와 같은 형식으로 API 
*/
```



@swagger
	- swagger를 입력하면 그 부분부터 파싱
/boards/:id:
	- route 입력
post:
	- 데이터의 전송 방식
tags:
	- 해당하는 API 의 Tag 지정
description:
	- API description 입력
produces:
	- Parameter content type을 입력(applicaion/json)
parameters:
	- API Parameter 입력
    

- name: boardTtile
  in: body
  description: "게시글 제목"
  required: true
  type: string
와 같은 형식으로 게시글 입력

## [ Reference ]

[Express에 Swagger 사용하기](https://velog.io/@hyeong412/TIL-Express-에-Swagger-사용하기-xkk43n5icz)

[express-swagger 사용법](https://blog.naver.com/PostView.nhn?blogId=dilrong&logNo=221423928067&parentCategoryNo=&categoryNo=6&viewDate=&isShowPopularPosts=false&from=postView)