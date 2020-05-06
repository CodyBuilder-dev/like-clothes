import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import routes from "./routes"
import userRouter from "./routers/userRouter"
import clothesRouter from "./routers/clothesRouter"
import clothesResvRouter from "./routers/clothesResvRouter"
import swagger from "./swagger/swaggerSetting"
import {localsMiddleWare} from "./middleware"

const app = express();
dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet()); // 보안을 위한 것
app.use(morgan("dev"));

app.use(swagger);
app.use(localsMiddleWare);
app.use(routes.image, express.static(process.env.IMAGE_PATH));
app.use(routes.user, userRouter);
app.use(routes.clothes, clothesRouter);
app.use(routes.clothes_resv, clothesResvRouter);
export default app;

