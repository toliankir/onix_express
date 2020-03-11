/**
 * @description Return object only with _id, email and fullName fields
 * @function
 * @param {*} user
 * @returns
 */
function leftNeededFileds(user) {
    const { fullName, email, _id } = user;
    return {
        _id,
        email,
        fullName,
    };
}

module.exports = {
    leftNeededFileds,
};
