const jwt = require('jsonwebtoken');
const AuthService = require('./service');

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
                details: `User with id '${req.params.id}' don't found in DB.'`,
            });
        }

        const accessToken = jwt.sign(
            /* eslint-disable */
            { user: user['_id'] },
            /* eslint-enable */
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '3h' },
        );

        const refreshToken = jwt.sign(
            /* eslint-disable */
            { },
            /* eslint-enable */
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '1d' },
        );

        /* eslint-disable */
        await AuthService.updateRefreshToken(user['_id'], refreshToken);
        /* eslint-enable */

        return res.status(200).json({
            data: {
                user,
                accessToken,
                refreshToken,
            },
        });
    } catch (error) {
        return next(error);
    }
}

async function updateToken(req, res, next) {
    try {
        return res.send('test');
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    signIn,
    updateToken,
};
