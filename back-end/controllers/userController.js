import { USER, USER_AND_USER } from "../models"

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
        res.send({
            state: "failure",
            desc: "Login failed",
            err
        });
    }
};

export const social_signin = async function (req, res) {
    try {

    } catch (err) {
        res.send(err);
    }
};

export const create_user = async (req, res) => {
    try {
        const { email, password, name, nickname, address, age, gender, phone_num, description } = req.body;
        const user = await USER.findOne({ where: { email } });
        if (!user) {
            console.log(password)
            const hash = await USER.hash(password);
            console.log("Hash", hash)
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
        res.send({
            state: "failure",
            desc: "Create user failed",
            err
        });
    }
};

export const read_user = async (req, res) => {
    try {
        console.log("Hello")
        const user = await USER.findOne({ where: { email: req.params.email } });
        if (user) {
            res.send({
                state: "success",
                user
            });
        } else { throw new Error("User does not exist") }
    } catch (err) {
        res.send({
            state: "failure",
            desc: "Read all user failed",
            err
        });
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
        res.send({
            state: "failure",
            desc: "Read all user failed",
            err
        });
    }
};

export const update_user = async (req, res) => {
    try {
        console("hello")
        const user = res.local.user;
        console("hello")

        const { email, name, nickname, address, age, gender, phone_num, description } = req.body;

        // if (user && (user.email == email)) {
        if (true) {
            user.update({
                name, nickname, address, age, gender,
                phone_num, description
            }, { where: { email: user.email } }).then(user => {
                res.send({
                    state: "success",
                    user
                });
            });
        } else { throw new Error("User does not exist") }
    } catch (err) {
        res.send({
            state: "failure",
            desc: "Update user failed",
            err
        });
    }
};

export const update_password = async (req, res) => {
    try {
        const user = res.locals.user;
        const { password, new_password } = req.body;

        if (user && (user.email == email)) {
            USER.findOne({ where: { email: user.email } })
                .then(async (user) => {
                    const pwd = await USER.verify(password);
                    if (pwd) {
                        const new_pwd = await USER.hash(new_password);
                        const updated_user = await USER.update({ password: new_pwd }, { where: { email: user.email } });
                        if (updated_user) {
                            res.send({
                                state: "success",
                                updated_user
                            })
                        } else { throw new Error("User update failed") }
                    } else { throw new Error("Incorrect password") }
                })
        } else { throw new Error("User not logged in") }
    } catch (err) {
        res.send({
            state: "failure",
            desc: "Update failed",
            err
        });
    }
};

export const delete_user = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await USER.destroy({ where: { email } });
        res.send({
            state: "success",
            user
        });
    } catch (err) {
        res.send({
            state: "failure",
            desc: "User does not exist",
            err
        });
    }
};

export const follow_user_toggle = async (req, res) => {
    try {
        const fallower_email = req.locals.user.email;
        const { fallowing_email } = req.body;
        if (fallower_email) {
            const isFollow = await USER_AND_USER.findOne({ where: { fallower_email, fallowing_email } });
            if (isFollow) {
                USER_AND_USER.destroy(isFollow)
                    .then(user_and_user => {
                        res.send({
                            state: "success",
                            desc: "unFollow",
                            user_and_user
                        })
                    })
            } else {
                USER_AND_USER.create({ fallower_email, fallowing_email })
                    .then(user_and_user => {
                        res.send({
                            state: "success",
                            desc: "Follow",
                            user_and_user
                        })
                    })
            }
        } else { throw new Error("Not logged in") }
    } catch (err) {
        res.send({
            state: "failure",
            desc: "Failed to follow user",
            err
        });
    }
}