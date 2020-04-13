import express from "express"
import routes from "../routes"
import path from "path"
import { 
    read_users, 
    read_user, 
} from "../controllers/userController"

const userRouter = express.Router();

userRouter.get(routes.home, read_user);
                            
export default userRouter;