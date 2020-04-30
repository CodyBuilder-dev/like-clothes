import { USER_RESERVATION } from "../models"
import { errChk } from "./errChk"

// User_reservation 예약하기
export const register_clothes_reservation = (req, res) => {
    try {
        const signin_user = res.locals.user;
        const {clothes_item_id, reserved_date } = req.body;
        console.log({clothes_item_id, reserved_date })
        USER_RESERVATION.create({
            user_email : signin_user.email,
            clothes_item_id,
            reserved_date
        }).then(()=> {
            res.send("success");
        })
    } catch (err) {
        errChk(res, err.message, "register clothes reservation failed");
    }
}

// User_reservation 예약취소
export const deregister_clothes_reservation = (req, res) => {
    try {
        const signin_user = res.locals.user;
        const {user_reservation_id} = req.body
        USER_RESERVATION.destroy({
            where: { id : user_reservation_id }
        }).then(()=> {
            res.send("success");
        })
    } catch (err) {
        errChk(res, err.message, "deregister clothes reservation failed");
    }
}

// User_reservation 예약하기
export const read_clothes_reservation = (req, res) => {
    try {
        const signin_user = res.locals.user;
        USER_RESERVATION.read_clothes_reservation(signin_user.email)
        .then((reservation)=> {
            res.send(reservation);
        })
    } catch (err) {
        errChk(res, err.message, "read clothes reservation failed");
    }
}

