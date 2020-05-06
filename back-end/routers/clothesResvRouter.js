import express from "express"
import routes from "../routes"
import { onlyPrivate } from "../middleware"
import {
    register_clothes_reservation,
    deregister_clothes_reservation,
    read_clothes_reservation
} from "../controllers/clothesResvController"

const clothesResvRouter = express.Router();


clothesResvRouter.get(routes.home, onlyPrivate, read_clothes_reservation);

clothesResvRouter.post(routes.home, onlyPrivate, register_clothes_reservation);

clothesResvRouter.delete(routes.home, onlyPrivate, deregister_clothes_reservation);

export default clothesResvRouter;