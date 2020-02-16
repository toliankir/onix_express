const UserModel = require('./model');

module.exports = {
    /**
     * @exports
     * @method findAll
     * @param {}
     * @summary get list of all users
     * @returns Promise<UserModel[]>
     */
    async findAll() {
        const users = await UserModel.find({});
        return users;
    },

    /**
     * @exports
     * @method findAll
     * @param { string } email valid user email
     * @summary Get user by email.
     * @returns Promise<UserModel>
     */
    async findUser(email) {
        const findedUser = await UserModel.findOne({ email });
        return findedUser;
    },

    /**
     * @exports
     * @method updateUser
     * @param { { fullName: string, email: string} } UserModel User object
     * @summary Update user in DB. Search user by email.
     * @returns Promise<UserModel>
     */
    async updateUser(user) {
        const { email } = user;
        const updatedUser = await UserModel.findOneAndUpdate({ email }, user);
        return updatedUser;
    },

    /**
     * @exports
     * @method deleteUser
     * @param { string } email valid user email
     * @summary Delete user in DB. Search user by email.
     * @returns Promise<UserModel>
     */
    async daleteUser(email) {
        const deletedUser = await UserModel.findOneAndRemove({ email });
        return deletedUser;
    },


    /**
     * @exports
     * @method createUser
     * @param { { fullName: string, email: string} } UserModel User object
     * @summary Create new user in DB.
     * @returns Promise<UserModel>
     */
    async createUser({ fullName, email }) {
        const newUser = await UserModel.create({
            fullName,
            email
        });
        return newUser;
    }
};
