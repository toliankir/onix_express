const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const UserValidation = require('./validation');
const AuthService = require('./service');
const ValidationError = require('../../error/ValidationError');
const { leftNeededFileds } = require('../../helpers/userHelper');

async function getTokens(user) {
    const accessToken = jwt.sign({ user }, process.env.JWT_PRIVATE_KEY, { expiresIn: '3h' });
    const refreshToken = jwt.sign({ }, process.env.JWT_PRIVATE_KEY, { expiresIn: '1d' });

    /* eslint-disable */
    await AuthService.updateRefreshToken(user, refreshToken);
    /* eslint-enable */
    return {
        accessToken,
        refreshToken,
    };
}

function getCryptedPassword(password) {
    return crypto.createHmac('sha256', process.env.PASSWORD_CRYPTO_SALT)
        .update(password)
        .digest('hex');
}

async function createUser(req, res, next) {
    try {
        const { error } = UserValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        req.body.password = getCryptedPassword(req.body.password);

        const user = await AuthService.createUser(req.body);
        return res.status(400).json(user);
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message,
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns { void }
 */
async function login(req, res, next) {
    try {
        const { error } = UserValidation.login(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await AuthService.getUserByEmail(req.body.email);

        if (!user) {
            return res.status(404).json({
                error: 'User don\'t found',
                details: `User with email '${req.body.email}' don't found in DB.'`,
            });
        }

        const password = crypto.createHmac('sha256', process.env.PASSWORD_CRYPTO_SALT)
            .update(req.body.password)
            .digest('hex');

        if (password !== user.password) {
            return res.status(403).json({
                error: 'Wrong password or email',
                details: 'You send wrong password or wrong email',
            });
        }

        /* eslint-disable */
        const token = await getTokens(user['_id']);
        /* eslint-enable */

        return res.status(200).json({
            data: {
                ...leftNeededFileds(user),
                token,
            },
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }
        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns { void }
 */
async function loginUser(req, res, next) {
    try {
        const { error } = UserValidation.login(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await AuthService.getUserByEmail(req.body.email);

        if (!user) {
            req.flash('error', `User with email '${req.body.email}' don't found in DB.'`);
            return res.redirect('/v1/users');
        }

        const password = crypto.createHmac('sha256', process.env.PASSWORD_CRYPTO_SALT)
            .update(req.body.password)
            .digest('hex');

        if (password !== user.password) {
            req.flash('error', 'Wrong password or email');
            return res.redirect('/v1/users');
        }
        req.session.user = leftNeededFileds(user);
        return res.redirect('/v1/users');
    } catch (error) {
        if (error instanceof ValidationError) {
            req.flash('error', error.name);
            return res.redirect('/v1/users');
        }
        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns { void }
 */
async function logoutUser(req, res, next) {
    try {
        if (req.session.user) {
            delete req.session.user;
        }
        return res.redirect('/v1/users');
    } catch (error) {
        return next(error);
    }
}

async function updateToken(req, res, next) {
    try {
        const { error } = UserValidation.updateToken(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await AuthService.getUserByRefreshToken(req.body.refreshToken);

        if (!user) {
            return res.status(404).json({
                error: 'User don\'t found, may be wrong token',
            });
        }

        /* eslint-disable */
        const token = await getTokens(user['_id']);
        /* eslint-enable */
        return res.status(200).json({
            data: {
                token,
            },
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message,
            });
        }
        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns { void }
 */
async function logout(req, res, next) {
    try {
        const token = req.get('Authorization') || req.body.accessToken;
        const { user: _id } = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        const db = await AuthService.logout(_id);
        return res.status(200).json({
            data: {
                ...db,
            },
        });
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    login,
    updateToken,
    createUser,
    logout,
    loginUser,
    logoutUser,
};
