const UserModel = require('./model');

module.exports = {
    /**
     * @exports
     * @method findAll
     * @param {}
     * @summary get list of all users
     * @returns Promise<UserModel[]>
     */
    findAll() {
        return UserModel.find({});
    },

    /**
     * @exports
     * @method findAll
     * @param { string } email valid user email
     * @summary Get user by email.
     * @returns Promise<UserModel>
     */
    findUser(email) {
        return UserModel.findOne({ email });
    },

    /**
     * @exports
     * @method updateUser
     * @param { { fullName: string, email: string} } UserModel User object
     * @summary Update user in DB. Search user by email.
     * @returns Promise<UserModel>
     */
    updateUser(user) {
        const { email } = user;
        return UserModel.findOneAndUpdate({ email }, user);
    },

    /**
     * @exports
     * @method deleteUser
     * @param { string } email valid user email
     * @summary Delete user in DB. Search user by email.
     * @returns Promise<UserModel>
     */
    daleteUser(email) {
        return UserModel.findOneAndRemove({ email });
    },


    /**
     * @exports
     * @method createUser
     * @param { { fullName: string, email: string} } UserModel User object
     * @summary Create new user in DB.
     * @returns Promise<UserModel>
     */
    createUser({ fullName, email }) {
        return UserModel.create({
            fullName,
            email
        });
    }
};
