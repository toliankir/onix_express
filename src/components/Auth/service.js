const UserModel = require('./model');

/**
 * @description Create new system user in Mongo DB
 * @param {object} user
 * @returns {Promise<UserModel>}
 */
function createUser(user) {
    return UserModel.create(user);
}

/**
 * @description Retrun user with email
 * @param {string} email
 * @returns {Promise<UserModel>}
 */
function getUserByEmail(email) {
    return UserModel.findOne({ email }).exec();
}

/**
 * @description Update refresh token for user with setted email
 * @param {String} _id
 * @param {String} refreshToken
 * @returns {Promise<void>}
 */
function updateRefreshToken(_id, refreshToken) {
    return UserModel.updateOne({ _id }, { refreshToken }).exec();
}

/**
 * @description Retrun user with refreshToken
 * @param {string} refreshToken
 * @returns {Promise<UserModel>}
 */

function getUserByRefreshToken(refreshToken) {
    return UserModel.findOne({ refreshToken }).exec();
}

/**
 * @description Remove refreshToken field for user with _id
 * @param {String} _id
 * @returns {Promise<void>}
 */
function logout(_id) {
    return UserModel.updateOne({ _id }, { $unset: { refreshToken: '' } }).exec();
}

module.exports = {
    getUserByEmail,
    updateRefreshToken,
    getUserByRefreshToken,
    createUser,
    logout,
};
