const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const AuthService = require('./service');
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

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns { void }
 */
async function signIn(req, res, next) {
    try {
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
        return next(error);
    }
}

async function updateToken(req, res, next) {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(403).json({
                error: 'Wrong refresh token',
            });
        }

        const user = await AuthService.getUserByRefreshToken(refreshToken);

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
        return next(error);
    }
}

module.exports = {
    signIn,
    updateToken,
};
