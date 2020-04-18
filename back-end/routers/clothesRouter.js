import express from "express"
import routes from "../routes"

import {
    search_clothes_tag,
    search_clothes,
    read_mycloset,
    read_clothes_item
} from "../controllers/clothesController"

const clothesRouter = express.Router();

clothesRouter.get(routes.search_clothes_tag, search_clothes_tag);
clothesRouter.get(routes.search_clothes, search_clothes);
clothesRouter.get(routes.mycloset, read_mycloset)
clothesRouter.get(routes.clothes_item, read_clothes_item)

export default clothesRouter;