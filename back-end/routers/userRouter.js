import express from "express"
import routes from "../routes"
import path from "path"

import {
    signin,
    social_signin,
    signup,
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
userRouter.post(routes.signup, signup);
userRouter.post(routes.follow_user_toggle, follow_user_toggle);

userRouter.get(routes.user_email, read_user);
userRouter.get(routes.home, read_all_user);

userRouter.put(routes.home, update_user);
userRouter.put(routes.password, update_password);

userRouter.delete(routes.home, delete_user);

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
 *      description: User Login
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: email
 *        in: body
 *        description: "사용자 E-mail"
 *        required: true
 *        type: string
 *      - name: password
 *        in: body
 *        description: "사용자 password"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: Return User Login Object
 *        schema:
 *          type: applicaion/json
 *          items:
 *           $ref: '#/definitions/USER'
 */

/**
 * @swagger
 *  /social-signin:
 *    post:
 *      tags:
 *      - USER
 *      description: User Social Login
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      responses:
 *       200:
 *        description: Return Social User Social Login Object
 *        schema:
 *          type: applicaion/json
 *          items:
 *           $ref: '#/definitions/USER'
 */

/**
 * @swagger
 *  /create-user:
 *    post:
 *      tags:
 *      - USER
 *      description: User Signup
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      - name: email
 *        in: body
 *        description: "사용자 E-mail"
 *        required: true
 *        type: string
 *      - name: password
 *        in: body
 *        description: "사용자 password"
 *        required: true
 *        type: string
 *      - name: nickname
 *        in: body
 *        description: "사용자 nickname"
 *        required: true
 *        type: string
 *      - name: address
 *        in: body
 *        description: "사용자 실 주소"
 *        required: true
 *        type: string
 *      - name: age
 *        in: body
 *        description: "사용자 나이"
 *        required: true
 *        type: integer
 *      - name: gender
 *        in: body
 *        description: "사용자 성별"
 *        required: true
 *        type: string
 *      - name: phone_num
 *        in: body
 *        description: "사용자 이동전화 번호"
 *        required: true
 *        type: string
 *      - name: description
 *        in: body
 *        description: "사용자 간략 소개"
 *        required: true
 *        type: string
 *      responses:
 *       200:
 *        description: Return User Signup Object
 *        schema:
 *          type: applicaion/json
 *          items:
 *           $ref: '#/definitions/USER'
 */
 
/**
 * @swagger
 *  /read-user/:email:
 *    get:
 *      tags:
 *      - USER
 *      description: Read User Info
 *      produces:
 *      - applicaion/json
 *      parameters:
 *      responses:
 *       200:
 *        description: Return One User Info
 *        schema:
 *          type: array
 *          items:
 *           $ref: '#/definitions/boardItem'
 */