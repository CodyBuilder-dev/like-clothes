
export const errChk = async function (res, err, msg) {
    res.send({
        state: "failure",
        desc: msg,
        err: err
    });
};
