import { CLOTHES, CLOTHES_ITEM, USER_AND_CLOTHES } from "../models"

// CLOTHES_ITEM, USER_AND_CLOTHES 등록
export const register_clothes_item = async (req, res) => {
    try {
        // const reg_user = res.locals.user;
        const { clothes_id, color, description, status, size, length, shoulder, waist } = req.body;
        // console.log()
        const clothes_item = await CLOTHES_ITEM.create({
            clothes_id,
            color,
            description,
            // status,
            size,
            length,
            shoulder,
            waist
        })
        // USER_AND_CLOTHES.create({
        //     user_email: reg_user.email,
        //     clothes_item_id: clothes_item.id,
        //     in_closet: 1
        // })
        res.send(clothes_item)
    } catch (err) {
        res.send({
            state: "failure",
            desc: "Read clothes info failed",
            err
        });
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
        res.send({
            state: "failure",
            desc: "Read clothes info failed",
            err
        });
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
        res.send({
            state: "failure",
            desc: "Read clothes info failed",
            err
        });
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
        res.send({
            state: "failure",
            desc: "Read clothes info failed",
            err
        });
    }
}



// READ MYCLOSET
export const read_mycloset = async (req, res) => {
    try {
        const reg_user = res.locals.user;
        const { in_closet } = req.body;
        const clothes = await CLOTHES.read_mycloset('swimminglee@gmail.com', in_closet);
        res.send(clothes);
    } catch (err) {
        res.send({
            state: "failure",
            desc: "Read clothes info failed",
            err
        });
    }
}

// READ CLOTHES_ITEM
export const read_clothes_item = async (req, res) => {
    try {
        const { clothes_item_id } = req.body;
        const clothes_info = await CLOTHES.read_clothes_item(String(1));
        const clothes_tags = await CLOTHES.read_clothes_item_tag(String(1));
        res.send({ clothes_info, clothes_tags });
    } catch (err) {
        res.send({
            state: "failure",
            desc: "Read clothes item info failed",
            err
        });
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
        let payload = req.query
        console.log(payload)
        const clothes = await CLOTHES.search_clothes(payload)
        res.send(clothes)
    } catch (err) {
        res.send({
            state: "failure",
            desc: "Read clothes failed",
            err
        });
    }
}
