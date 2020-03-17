const jwt = require('jsonwebtoken');

/**
 * @description Auth middleware for api users(uses token in http header)
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} next
 */
function isAuthJWT(req, res, next) {
    const token = req.get('Authorization');
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    } catch (error) {
        return res.status(403).json({
            error: 'Incorrect access token',
            details: error.message,
        });
    }

    const timestampNow = Math.floor(Date.now() / 1000);
    if (decoded.exp > timestampNow && decoded.user) {
        return next();
    }

    return res.status(403).json({
        error: 'Token expired or wrong',
    });
}

/**
 * @description Auth middleware for frontend users(uses sessions)
 * @param {Express.Request} req
 * @param {Express.Response} res
 * @param {Express.NextFunction} next
 */
function isAuthPasport(req, res, next) {
    if (!req.session.user) {
        req.flash('error', 'You don\'t have permission.');
        return res.redirect('/v1/users');
    }
    return next();
}
module.exports = {
    isAuthJWT,
    isAuthPasport,
};
