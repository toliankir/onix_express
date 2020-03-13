const jwt = require('jsonwebtoken');

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

    if (decoded.exp > timestampNow) {
        return next();
    }

    return res.status(403).json({
        error: 'Token expired',
    });
}

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
