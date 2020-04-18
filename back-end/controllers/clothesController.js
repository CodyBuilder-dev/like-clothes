import { CLOTHES, CLOTHES_ITEM, USER_AND_CLOTHES } from "../models"

// CLOTHES_ITEM, USER_AND_CLOTHES 등록
export const register_clothes_item = async (req, res) => {
    try {
        const reg_user = res.locals.user;
        const { clothes_id, color, description, status, size, length, shoulder, waist } = req.body;

        const clothes_item = await CLOTHES_ITEM.create({
            clothes_id,
            color,
            description,
            status,
            size,
            length,
            shoulder,
            waist
        })
        USER_AND_CLOTHES.create({
            user_email: reg_user.email,
            clothes_item_id: clothes_item.id,
            in_closet: 1
        })
    } catch (err) {

    }
}

// CLOTHES_ITEM, USER_AND_CLOTHES 등록 해제
export const deregister_clothes_item = async (req, res) => {
    try {
        const reg_user = res.locals.user;
        const { clothes_item_id } = req.body;
        const clothes_item = await CLOTHES_ITEM.destroy({
            where: {
                clothes_item_id
            }
        })
    } catch (err) {
    }
}

// CLOTHES_ITEM 정보 가져오기
export const get_clothes_item = async (req, res) => {
    try {
        const reg_user = res.locals.user;
        const { clothes_item_id } = req.body;
        // const clothes_item = await CLOTHES_ITEM.destroy({
        //     where: {
        //         clothes_item_id
        //     }
        // })
    } catch (err) {

    }
}


// MY_CLOSET에 옷 등록하기 (USER_AND_CLOTHES 등록)
export const register_closet = async (req, res) => {
    try {
        const reg_user = res.locals.user;
        const { clothes_item_id } = req.body;

        USER_AND_CLOTHES.create({
            user_email: reg_user.email,
            clothes_item_id,
            in_closet: 0
        })
    } catch (err) {

    }
}

// MY_CLOSET에 옷 등록 해제하기 (USER_AND_CLOTHES 등록)
export const deregister_closet = async (req, res) => {
    try {
        const reg_user = res.locals.user;
        const { clothes_item_id } = req.body;

        USER_AND_CLOTHES.destroy({
            where: {
                user_email: reg_user.id,
                clothes_item_id: clothes_item_id
            }
        })
    } catch (err) {

    }
}


// CLOTHES_AND_TAGS(tag) 정보가 일치하는 옷 반환
export const search_clothes_tag = async (req, res) => {
    try {
        let { tags } = req.body
        const clothes = await CLOTHES.search_tags(tags)
        res.send(clothes)
    } catch (err) {
        res.send({
            state: "failure",
            desc: "Read clothes info failed",
            err
        });
    }
}

// CLOTHES_AND_TAGS(tag), CLOTHES(brand, code_name), CLOTHES_AND_CLOTEHS_CLASS(major, middle, minor)  정보가 일치하는 옷 반환
export const search_clothes = async (req, res) => {
    try {
        // { tags, brands, code_names, majors, middles, minors }
        let payload = req.body
        const clothes = await CLOTHES.search_clothes(payload)
        console.log(clothes)
        res.send(clothes)
    } catch (err) {
        res.send({
            state: "failure",
            desc: "Read clothes failed",
            err
        });
    }
}
