const UserService = require('./service');
const { userEmailSchema, userSchema, validate } = require('./validation');
/**
 * @summary Find all users in database.
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
        res.status(500).json({ error: 'Intenal server error' });
        next(error);
    }
}

/**
 * @summary Find user by it's email. Get email from request query.
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findUser(req, res, next) {
    const { email } = req.query;
    if (!validate(email, userEmailSchema, res)) {
        return;
    }

    try {
        const user = await UserService.findUser(email);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Intenal server error' });
        next(error);
    }
}

/**
 * @summary Update user in database. Find user by email.
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function updateUser(req, res, next) {
    if (!validate(req.body, userSchema, res)) {
        return;
    }

    const { email, fullName } = req.body;
    try {
        const user = await UserService.updateUser({
            email,
            fullName
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Intenal server error' });
        next(error);
    }
}

/**
 * @summary Delete user in database. Find user by email.
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function deleteUser(req, res, next) {
    const { email } = req.body;
    if (!validate(email, userEmailSchema, res)) {
        return;
    }

    try {
        const user = await UserService.daleteUser(email);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Intenal server error' });
        next(err);
    }
}

/**
 * @summary Create new user in database.
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function createUser(req, res, next) {
    // if (!validate(req.body, userSchema, res)) {
    //     return;
    // }

    const { email, fullName } = req.body;
    try {
        const user = await UserService.createUser({
            email,
            fullName
        });
        res.status(200).json(user);
    } catch (error) {
        switch (error.code) {
        case 11000:
            res.status(500).json({ error: `Duplicate email '${email}' in DB` });
            break;
        default:
            res.status(500).json({ error: 'Internal server error' });
            break;
        }
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
