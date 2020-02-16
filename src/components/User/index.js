const UserService = require('./service');

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
    try {
        const users = await UserService.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            status: 'Intenal server error'
        });
        next(error);
    }
}

async function findUser(req, res, next) {
    try {
        const { email } = req.query;
        const user = await UserService.findUser(email);
        res.status(200).json({
            status: 'User finded',
            user
        });
    } catch (error) {
        res.status(500).json({
            status: 'Intenal server error'
        });
        next(error);
    }
}

async function updateUser(req, res, next) {
    try {
        const { email, fullName } = req.body;
        const user = await UserService.updateUser({
            email,
            fullName
        });
        res.status(200).json({
            data: 'User updated',
            user
        });
    } catch (error) {
        res.status(500).json({
            status: 'Intenal server error'
        });
        next(error);
    }
}

async function deleteUser(req, res, next) {
    try {
        const { email } = req.body;
        const user = await UserService.daleteUser(email);
        res.status(200).json({
            data: 'User deleted',
            user
        });
    } catch (error) {
        res.status(500).json({
            status: 'Intenal server error'
        });
        next(error);
    }
}

async function createUser(req, res, next) {
    try {
        const { email, fullName } = req.body;
        const user = await UserService.createUser({
            email,
            fullName
        });
        res.status(200).json({
            status: 'User created',
            user
        });
    } catch (error) {
        res.status(500).json({
            status: 'Intenal server error'
        });
        next(error);
    }
}

module.exports = {
    findAll,
    findUser,
    createUser,
    updateUser,
    deleteUser
};
