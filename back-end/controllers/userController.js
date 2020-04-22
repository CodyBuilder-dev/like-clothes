import { USER, USER_AND_USER } from "../models"
import { errChk } from "./errChk"

export const signin = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await USER.findOne({ where: { email } });
        if (user) {
            const pwd = await user.verify(password);
            if (pwd) {
                const accessToken = await user.getToken()
                res.send({
                    state: "success",
                    user: {
                        email: user.dataValues.email,
                        nickname: user.dataValues.nickname,
                        accessToken: accessToken
                    }
                })
            } else { throw new Error("Incorrect password") };
        } else { throw new Error("User does not exist") };

    } catch (err) {
        errChk(res, err, "Login failed");
    }
};

export const social_signin = async function (req, res) {
    try {

    } catch (err) {
        errChk(res, err, "Social Login failed");
    }
};

export const signup = async (req, res) => {
    try {
        const { email, password, name, nickname, address, age, gender, phone_num, description } = req.body;
        const user = await USER.findOne({ where: { email } });
        if (!user) {
            const hash = await USER.hash(password);
            const new_user = await USER.create({
                email, password: hash, name, nickname, address, age, gender,
                phone_num, description
            })
            if (new_user) {
                res.send({
                    state: "success",
                    new_user
                });
            } else { throw new Error() }
        } else { throw new Error("User email already exist") }
    } catch (err) {
        errChk(res, err, "Create User failed");
    }
};

export const read_user = async (req, res) => {
    try {
        const user = await USER.findOne({ where: { email: req.params.email } });
        if (user) {
            res.send({
                state: "success",
                user
            });
        } else { throw new Error("User does not exist") }
    } catch (err) {
        errChk(res, err, "Read User failed");
    }
};

export const read_all_user = async (req, res) => {
    try {
        const user = await USER.findAll();
        if (user) {
            res.send({
                state: "success",
                user
            });
        } else { throw new Error("User does not exist") }
    } catch (err) {
        errChk(res, err, "Read All User Login failed");
    }
};

export const update_user = async (req, res) => {
    try {
        const signin_user = res.locals.user;
        const { 
            name, nickname, address, age, gender,
            phone_num, description, profile_img, rank,
            bank_account, credit_card } = req.body;

        USER.update({
            name, nickname, address, age, gender,
            phone_num, description, profile_img, rank,
            bank_account, credit_card
            }, { where: { email: signin_user.email } })
        .then(() => {
            res.send({ state: "success"});
        });
    } catch (err) {
        errChk(res, err, "Update User Login failed");
    }
};

export const update_password = async (req, res) => {
    try {
        const signin_user = res.locals.user;
        const { password, new_password } = req.body;

        const user  = await USER.findOne({ where: { email: signin_user.email } })
        const pwd = await user.verify(password);
        if (pwd) {
            const new_pwd = await USER.hash(new_password);
            const updated_user = await USER.update({ password: new_pwd }, { where: { email: user.email } });
            if (updated_user) { res.send({ state: "success"}) }
            else { throw new Error("User update failed") }
        } else {
            throw new Error("Incorrect password")
        }
    } catch (err) {
        errChk(res, err, "Modify password failed");
    }
};

export const delete_user = async (req, res) => {
    try {
        const signin_user = res.locals.user;
        const user = await USER.destroy({ where: { email: signin_user.email } });
        res.send({ state: "success", user});
    } catch (err) {
        errChk(res, err, "User does not exist");
    }
};

export const read_following_user = async (req, res) => {
    try {
        const signin_user = res.locals.user;
        const following_users = await USER.read_following_user(signin_user.email);
        res.send(following_users)
    } catch (err) {
        errChk(res, err, "Read follwoing user failed");
    }
}

export const read_follower_user = async (req, res) => {
    try {
        const signin_user = res.locals.user;
        const follower_users = await USER.read_follower_user(signin_user.email);
        res.send(follower_users)
    } catch (err) {
        errChk(res, err, "Read follower user failed");
    }
}

export const follow_user_toggle = async (req, res) => {
    try {
        const follower_email = res.locals.user.email;
        const { following_email } = req.body;

        const isFollow = await USER_AND_USER.findOne({ where: { follower_email, following_email } });
        if (isFollow) {
            isFollow.destroy()
                .then( ()=> {
                    res.send({state: "success", desc: "unFollow",})
                })
        } else {
            USER_AND_USER.create({ follower_email, following_email })
                .then( ()=> {
                    res.send({state: "success",desc: "Follow",})
                })
        }
    } catch (err) {
        errChk(res, err, "follow user toggle failed");
    }
}