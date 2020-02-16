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

    async findUser(email) {
        const findedUser = await UserModel.findOne({ email });
        return findedUser;
    },

    async updateUser(user) {
        const { email } = user;
        const updatedUser = await UserModel.findOneAndUpdate({ email }, user);
        return updatedUser;
    },

    async daleteUser(email) {
        const deletedUser = await UserModel.findOneAndRemove({ email });
        return deletedUser;
    },

    async createUser({ fullName, email }) {
        const newUser = await UserModel.create({
            fullName,
            email
        });
        return newUser;
    }
};
