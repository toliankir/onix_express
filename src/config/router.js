const express = require('express');
const routerUsers = require('../components/User/router');
const routerAuth = require('../components/Auth/router');

module.exports = {
    /**
     * @function
     * @param {express.Application} app
     * @summary init Application router
     * @returns void
     */
    init(app) {
        const router = express.Router();

        /**
         * Forwards any requests to the /v1/users URI to UserRouter.
         * @name /v1/users
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/v1/users', routerUsers);

        /**
         * Forwards any requests to the /v1/auth URI to AuthRouter.
         * @name /v1/users
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/v1/auth', routerAuth);

        app.use('/$', (req, res) => {
            res.redirect('/v1/users');
        });
        /**
         * @description No results returned mean the object is not found
         * @function
         * @inner
         * @param {callback} middleware - Express middleware.
         */
        app.use((req, res) => {
            res.render('404');
        });

        /**
         * @function
         * @inner
         * @param {express.Router}
         */
        app.use(router);
    },
};
