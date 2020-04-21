import routes from "./routes"
import jwt from "jsonwebtoken"
import {USER} from "./models"

export const localsMiddleWare = async (req, res, next) => {
    try {
        const accessToken = await req.get('Authorization');
        if (typeof accessToken != 'undefined') {
            const decoded = await jwt.verify(accessToken, process.env.JWT_KEY)
            if (decoded) {
                const user = await USER.findOne({ where: { email: decoded.email } });
                res.locals.user = user.dataValues;
            } 
        }
        res.locals.siteName = "LikeClothes";
        next();
    }
    catch(err) {
        next();
    }
};

export const onlyPublic = (req, res, next) => {
    if (res.locals.user) {
        res.send("You're already logged in")
    } else {
        next();
    }
}

export const onlyPrivate = (req, res, next) => {
    if (res.locals.user) {
        next();
    } else {
        res.send("You're not logged in")
    }
}

