
import {USER} from "../models"

export const signin = async function (req, res) {
    try {

    } catch (err) {
    }
};


export const social_signin = async function (req, res) {
    try {
    } catch (err) {
    }

}
export const create_user = async (req, res) => {
    try {
        const user = await users.create(
            {
                email: "abc@naver.com",
                password: "123123",
                name: "lee",
                nickname: "soo",
                address: "address",
                age: "phone",
                gender: "M"
            })

        res.send(user);

    } catch (err) {
    }
}

export const read_all_user = async (req, res) => {
    try {
        const user = await USER.findAll();
        res.send(user);
        
    } catch (err) {
    }
}

export const update_user = async (req, res) => {
    try {
    } catch (err) {
    }
}

export const update_password = async (req, res) => {
    try {
    } catch (err) {
    }
}
