import express from "express"
import routes from "../routes"
import path from "path"
import { 
    read_all_user, 
    create_user, 
} from "../controllers/userController"

const userRouter = express.Router();

userRouter.post(routes.home, create_user);
userRouter.get(routes.home, read_all_user);
                            
export default userRouter;