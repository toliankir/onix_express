const passport = require('passport');
const crypto = require('crypto');
const LocalStrategy = require('passport-local').Strategy;
const AuthService = require('../components/Auth/service');

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const user = await AuthService.getUserByEmail(email);
        if (!user) {
            return done(null, false, { message: 'User don\'t found' });
        }

        const cryptoPassword = crypto.createHmac('sha256', process.env.PASSWORD_CRYPTO_SALT)
            .update(password)
            .digest('hex');

        if (cryptoPassword !== user.password) {
            return done(null, false, 'Wrong password');
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => done(null, {
    // eslint-disable-next-line no-underscore-dangle
    id: user._id,
    email: user.email,
}));
passport.deserializeUser((user, done) => done(null, user));
