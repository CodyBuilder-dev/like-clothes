import express from "express"
import routes from "../routes"

import {
    search_clothes_tag,
    search_clothes
} from "../controllers/clothesController"

const clothesRouter = express.Router();

clothesRouter.get(routes.search_clothes_tag, search_clothes_tag);
clothesRouter.get(routes.search_clothes, search_clothes);


export default clothesRouter;