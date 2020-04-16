import express from "express"
import routes from "../routes"
import path from "path"

import {
    signin,
    social_signin,
    create_user,
    read_user,
    read_all_user,
    update_user,
    update_password,
    delete_user,
} from "../controllers/userController"

const userRouter = express.Router();

userRouter.post(routes.signin, signin);
userRouter.post(routes.social_signin, social_signin);
userRouter.post(routes.create_user, create_user);

userRouter.get(routes.read_user, read_user);
userRouter.get(routes.read_all_user, read_all_user);

userRouter.put(routes.update_user, update_user);
userRouter.put(routes.update_password, update_password);

userRouter.delete(routes.delete_user, delete_user);

// userRouter.post(routes.home, create_user);
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
// userRouter.get(routes.home, read_all_user);
                            
export default userRouter;