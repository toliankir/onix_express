const UserModel = require('./model');

function createUser(user) {
    return UserModel.create(user);
}

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
    createUser,
};
