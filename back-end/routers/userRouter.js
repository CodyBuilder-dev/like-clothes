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
    follow_user_toggle,
} from "../controllers/userController"

const userRouter = express.Router();

userRouter.post(routes.signin, signin);
userRouter.post(routes.social_signin, social_signin);
userRouter.post(routes.create_user, create_user);
userRouter.post(routes.follow_user_toggle, follow_user_toggle);

userRouter.get(routes.read_user, read_user);
userRouter.get(routes.read_all_user, read_all_user);

userRouter.put(routes.update_user, update_user);
userRouter.put(routes.update_password, update_password);

userRouter.delete(routes.delete_user, delete_user);

export default userRouter;

/**
 * @swagger
 * definitions:
 *  USER:
 *   type: object
 *   required:
 *     - email
 *     - password
 *     - name
 *     - nickname
 *     - address
 *     - age
 *     - gender
 *   properties:
 *     email:
 *       type: string
 *       description: 사용자 E-mail
 *     password:
 *       type: string
 *       description: 사용자 Password
 *     name:
 *       type: string
 *       description: 사용자 이름
 *     nickname:
 *       type: string
 *       description: 사용자 닉네임
 *     address:
 *       type: string
 *       description: 사용자 실 거주지
 *     phone_num:
 *       type: string
 *       description: 사용자 전화번호
 *     profile_img:
 *       type: string
 *       description: 사용자 프로필 이미지
 *     description:
 *       type: string
 *       description: 사용자 자기소개
 *     age:
 *       type: integer
 *       description: 사용자 나이
 *     gender:
 *       type: string
 *       description: 사용자 성별
 */

/**
 * @swagger
 * definitions:
 *  USER_AND_USER:
 *   type: object
 *   required:
 *     - follower_email
 *     - following_email
 *   properties:
 *     follower_email:
 *       type: string
 *       description: Follower 사용자의 이메일(자기 자신)
 *     following_email:
 *       type: string
 *       description: Following 이메일
 */

/**
 * @swagger
 *  /signin:
 *    post:
 *      tags:
 *      - USER
 *      description: 유저 Login API
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

userRouter.post(routes.signin, signin);
userRouter.post(routes.social_signin, social_signin);
userRouter.post(routes.create_user, create_user);
userRouter.post(routes.follow_user_toggle, follow_user_toggle);

userRouter.get(routes.read_user, read_user);
userRouter.get(routes.read_all_user, read_all_user);

userRouter.put(routes.update_user, update_user);
userRouter.put(routes.update_password, update_password);

userRouter.delete(routes.delete_user, delete_user);