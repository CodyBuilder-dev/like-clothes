import { CLOTHES, CLOTHES_ITEM } from "../models"

export const register_clothes_item = async (req, res) => {
    try {
        const reg = res.locals.user;
        const { clothes_id, color, description, status, size, length, shoulder, waist } = req.body;
    } catch (err) {

    }
}