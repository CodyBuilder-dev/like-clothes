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