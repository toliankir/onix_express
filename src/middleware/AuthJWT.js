const jwt = require('jsonwebtoken');

function isAuth(req, res, next) {
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

module.exports = {
    isAuth,
};
