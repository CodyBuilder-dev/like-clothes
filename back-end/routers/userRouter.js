import express from "express"
import routes from "../routes"
import path from "path"
import { 
    read_all_user, 
    create_user, 
} from "../controllers/userController"

const userRouter = express.Router();

userRouter.post(routes.home, create_user);
/**
 * @swagger
 * definitions:
 *  USER:
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
 *  /users:
 *    get:
 *      tags:
 *      - user
 *      description: 모든 유저 정보를 가져온다.
 *      produces:
 *      - applicaion/json
 *      responses:
 *       200:
 *        description: board of selected id column list
 *        schema:
 *          type: USER
 *          items:
 *           $ref: '#/definitions/USER'
 */
userRouter.get(routes.home, read_all_user);
                            
export default userRouter;