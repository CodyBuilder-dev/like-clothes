
export const errChk = async function (res, err, msg) {
    res.send({
        state: "failure",
        err: err,
        desc: msg
    });
};
