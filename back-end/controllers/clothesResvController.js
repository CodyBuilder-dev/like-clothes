import { USER_RESERVATION } from "../models"

// User_reservation 예약하기
export const search_clothes = async (req, res) => {
    try {
        // { tags, brands, code_names, majors, middles, minors }
        let payload = req.body
        const clothes = await USER_RESERVATION.search_clothes(payload)
        res.send(clothes)
    } catch (err) {
        res.send({
            state: "failure",
            desc: "Read clothes failed",
            err
        });
    }
}
