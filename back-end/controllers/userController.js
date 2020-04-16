import { USER } from "../models"

export const signin = async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await USER.findOne({ where: { email } });
        if (user) {
            const pwd = await USER.verify(password);
            if (pwd) {
                const accessToken = await USER.getToken()
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
        res.send({
            state: "failure",
            desc: "Create user failed",
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
        const user = res.local.user;
        const { email, name, nickname, address, age, gender, phone_num, description } = req.body;

        if (user && (user.email == email)) {
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
                .then(user => {
                    const pwd = await user.verify(password);
                    if (pwd) {
                        const new_pwd = await USER.hash(new_password);
                        const updated_user = USER.update({ password: new_pwd }, { where: { email: user.email } });
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
        const user = await USER.destroy({ where: { email: req.params.email } });
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