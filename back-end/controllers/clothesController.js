import { CLOTHES, CLOTHES_ITEM, WISH_LIST } from "../models"
import { errChk } from "./errChk"


// wish list에 옷 등록하기 (USER_AND_CLOTHES 등록)
export const register_wish_list_item = async (req, res) => {
    try {
        const signin_user = res.locals.user;
        const { clothes_item_id } = req.body;

        const wish_list = await WISH_LIST.create({
            user_email: signin_user.email,
            clothes_item_id,
        })
        res.send(wish_list)
    } catch (err) {
        errChk(res, err, "Register wishlist clothes item failed");
    }
}

// MY_CLOSET에 옷 등록 해제하기 (USER_AND_CLOTHES 등록)
export const deregister_wish_list_item = async (req, res) => {
    try {
        const signin_user = res.locals.user;
        const { clothes_item_id } = req.body;

        const wish_list = await WISH_LIST.destroy({
            where: {
                user_email: signin_user.email,
                clothes_item_id: clothes_item_id,
            }
        });
        res.send({state:"success", wish_list});
    } catch (err) {
        errChk(res, err, "Deregister wishlist clothes item failed");
    }
}

// READ wishlist
export const read_wishlist = async (req, res) => {
    try {
        const signin_user = res.locals.user;
        const clothes = await CLOTHES.read_clothes_items_in_wish_list(signin_user.email, 'wish_list');
        res.send(clothes);
    } catch (err) {
        errChk(res, err, "Read mycloset clothes item failed");
    }
}

// CLOTHES_ITEM, USER_AND_CLOTHES 등록
export const register_clothes_item_in_mycloset = async (req, res) => {
    try {
        const signin_user = res.locals.user;
        const { clothes_id, color, description, size, length, shoulder, waist } = req.body;
        const clothes_item = await CLOTHES_ITEM.create({
            clothes_id,
            owner_email: signin_user.email,
            color,
            description,
            size,
            length,
            shoulder,
            waist,
        })
        res.send(clothes_item)
    } catch (err) {
        errChk(res, err, "Register clothes item(in mycloset) failed");
    }
}

// CLOTHES_ITEM, USER_AND_CLOTHES 등록 해제
export const deregister_clothes_item_in_mycloset = async (req, res) => {
    try {
        const signin_user = res.locals.user;
        const { clothes_item_id } = req.body;
        const clothes_item = await CLOTHES_ITEM.destroy({
            where: {
                clothes_item_id
            }
        });
        res.send({state:'success', clothes_item});
        // cascade USER_AND_CLOTHES 는 자동으로 삭제
    } catch (err) {
        errChk(res, err, "Deregister clothes item(in mycloset) failed");
    }
}

// CLOTHES_ITEM, USER_AND_CLOTHES 등록 해제
export const update_clothes_item_in_mycloset = async (req, res) => {
    try {
        const signin_user = res.locals.user;
        const { 
            clothes_item_id, 
            color,
            description,
            size,
            length,
            shoulder,
            waist,
            in_closet } = req.body;

        const clothes_item = await CLOTHES_ITEM.update({
            color,
            description,
            size,
            length,
            shoulder,
            waist,
            in_closet,
            where: {
                clothes_item_id
            }
        });
        res.send({state:'success', clothes_item});
        // cascade USER_AND_CLOTHES 는 자동으로 삭제
    } catch (err) {
        errChk(res, err, "Update clothes item(in mycloset) failed");
    }
}

// READ MYCLOSET
export const read_mycloset = async (req, res) => {
    try {
        const user_email = req.query.user_email;
        const clothes = await CLOTHES.read_clothes_items_in_closet(user_email);
        res.send(clothes);
    } catch (err) {
        errChk(res, err, "Read mycloset clothes item failed");
    }
}

// READ CLOTHES_ITEM
export const read_clothes_item = async (req, res) => {
    try {
        const { clothes_item_id } = req.query;
        const clothes_info = await CLOTHES.read_clothes_item(clothes_item_id);
        const clothes_tags = await CLOTHES.read_clothes_item_tag(clothes_item_id);
        res.send({ clothes_info, clothes_tags });
    } catch (err) {
        errChk(res, err, "Read clothes item failed");
    }
}


// CLOTHES_AND_TAGS(tag) 정보가 일치하는 옷 반환
export const search_clothes_tag = async (req, res) => {
    try {
        let { tags } = req.query
        const clothes = await CLOTHES.search_tags(tags)
        res.send(clothes)
    } catch (err) {
        errChk(res, err, "Search clothes(tag) failed");
    }
}

// CLOTHES_AND_TAGS(tag), CLOTHES(brand, code_name), CLOTHES_AND_CLOTEHS_CLASS(major, middle, minor)  정보가 일치하는 옷 반환
export const search_clothes = async (req, res) => {
    try {
        // { tags, brands, code_names, majors, middles, minors }
        let payload = req.query
        const clothes = await CLOTHES.search_clothes(payload)
        res.send(clothes)
    } catch (err) {
        errChk(res, err, "Search clothes(tag, brand, code_name, category) failed");
    }
}
