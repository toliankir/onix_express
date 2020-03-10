const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const methodOverride = require('method-override');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');

module.exports = {
    /**
     * @function
     * @description express middleware
     * @param {express.Application} app
     * @returns void
     */
    init(app) {
        app.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        );
        // add session support
        app.use(session({
            secret: 'secret',
            name: 'sessionId',
            resave: true,
            saveUninitialized: true,
            cookie: { maxAge: 3600 * 24 },
        }));
        // add support of PUT, DELETE, etc method in html forms by adding a _medthod field
        // in POST request
        app.use(methodOverride((req) => {
            if (req.body && typeof req.body === 'object' && '_method' in req.body) {
                const { _method } = req.body;
                /* eslint-disable */
                delete req.body._method;
                /* eslint-enable */
                return _method;
            }
            return null;
        }));
        app.use(bodyParser.json());
        // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
        app.use(cookieParser());
        // returns the compression middleware
        app.use(csrf({ cookie: true }));
        app.use(compression());
        app.use((req, res, next) => {
            console.log(req.get('Authorization'));
            next();
        });
        // helps you secure your Express apps by setting various HTTP headers
        app.use(helmet());
        // providing a Connect/Express middleware that
        // can be used to enable CORS with various options
        app.use(cors());
        // cors
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
            res.header('Access-Control-Allow-Credentials', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With,'
                + ' Content-Type, Accept,'
                + ' Authorization,'
                + ' Access-Control-Allow-Credentials',
            );
            next();
        });
        // Add flash messages support
        app.use(flash());
        // handle CSRF token errors here
        app.use((err, req, res, next) => {
            if (req.originalUrl.indexOf('/api') !== -1) return next();
            if (err.code !== 'EBADCSRFTOKEN') return next(err);
            return res.render('403csrf');
        });
        // Remove _csrf token from req.body, accroding validator terms
        app.use((req, res, next) => {
            /* eslint-disable */
            delete req.body._csrf;
            /* eslint-enable */
            return next();
        });
    },
};
