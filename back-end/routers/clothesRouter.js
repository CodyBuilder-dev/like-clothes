import express from "express"
import routes from "../routes"
import { onlyPrivate } from "../middleware"
import {
    search_clothes_tag,
    search_clothes,
    read_mycloset,
    read_wishlist,
    read_clothes_item,
    register_clothes_item_in_mycloset,
    register_wish_list_item,
    deregister_clothes_item_in_mycloset,
    deregister_wish_list_item,
    update_clothes_item_in_mycloset,
    read_random_clothes,
    record_user_clothes
} from "../controllers/clothesController"

const clothesRouter = express.Router();


clothesRouter.get(routes.random_clothes, read_random_clothes);
clothesRouter.get(routes.clothes_item, read_clothes_item);
clothesRouter.get(routes.mycloset, read_mycloset);
clothesRouter.get(routes.wish_list, onlyPrivate, read_wishlist);
clothesRouter.get(routes.search_clothes_tag, search_clothes_tag);
clothesRouter.get(routes.search_clothes, search_clothes);

clothesRouter.post(routes.clothes_item, onlyPrivate, register_clothes_item_in_mycloset);
clothesRouter.post(routes.wish_list, onlyPrivate, register_wish_list_item);
clothesRouter.post(routes.record_user_clothes, onlyPrivate, record_user_clothes);


clothesRouter.put(routes.clothes_item, onlyPrivate, update_clothes_item_in_mycloset);

clothesRouter.delete(routes.clothes_item, onlyPrivate, deregister_clothes_item_in_mycloset);
clothesRouter.delete(routes.wish_list, onlyPrivate, deregister_wish_list_item);

export default clothesRouter;