const UserModel = require('../User/model');

async function getUserByEmail(email) {
    return UserModel.findOne({ email }).exec();
}

async function updateRefreshToken(_id, refreshToken) {
    console.log(_id, refreshToken);
    return UserModel.updateOne({ _id }, { refreshToken }).exec();
}

module.exports = {
    getUserByEmail,
    updateRefreshToken,
};
