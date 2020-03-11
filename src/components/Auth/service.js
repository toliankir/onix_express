const UserModel = require('../User/model');

function getUserByEmail(email) {
    return UserModel.findOne({ email }).exec();
}

function updateRefreshToken(_id, refreshToken) {
    return UserModel.updateOne({ _id }, { refreshToken }).exec();
}

function getUserByRefreshToken(refreshToken) {
    return UserModel.findOne({ refreshToken }).exec();
}

module.exports = {
    getUserByEmail,
    updateRefreshToken,
    getUserByRefreshToken,
};
